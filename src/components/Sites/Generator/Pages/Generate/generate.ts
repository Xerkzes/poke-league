import {
  iGeneration,
  iType,
  iForm,
  PokemonDataInterface,
  PokemonTypeCardDataInterface,
  iCustomOptions,
  pokeType,
} from "../../../../../Interfaces/interface";
import PokemonData from "../../../../../Data/Pokemons.json";
import { isAlive, sortByValue } from "../../../../../Utilities";

interface iAF {
  criteria: string;
  active: boolean;
}

const enoughPokemons = (
  availablePokemons: PokemonDataInterface[],
  amount: number,
  customAmount: iCustomOptions[]
) => {
  // not enought pokemons to generate
  if (availablePokemons.length < amount) {
    return false;
  }

  // not enough pokemons for custom pokemon
  let possible = true;
  let customAmountTotal = 0;
  customAmount.forEach((amount: iCustomOptions) => {
    if (amount.active) {
      customAmountTotal += amount.amount;
    }
  });

  if (
    availablePokemons.length < customAmountTotal ||
    amount < customAmountTotal
  ) {
    possible = false;
  }

  // it's possible
  return possible;
};

// todo -> overdo the entire thing
const enoughForEachType = (availablePokemons: PokemonDataInterface[]) => {
  interface pokeType {
    type: string;
    pokemons: PokemonDataInterface[];
  }

  const types: string[] = [
    "bug",
    "dragon",
    "fairy",
    "fire",
    "ghost",
    "ground",
    "normal",
    "psychic",
    "steel",
    "dark",
    "electric",
    "fighting",
    "flying",
    "grass",
    "ice",
    "poison",
    "rock",
    "water",
  ];

  const pokemonsInTypes: pokeType[] = [];

  types.forEach((type: string) => {
    pokemonsInTypes.push({ type: type, pokemons: [] });
  });

  // fill type array depending on pokemon type
  availablePokemons.forEach((pokemon: PokemonDataInterface) => {
    pokemon.types.forEach((pokeType: string) => {
      pokemonsInTypes.forEach((arrType: pokeType) => {
        if (pokeType.toLowerCase() === arrType.type.toLowerCase()) {
          arrType.pokemons.push(pokemon);
        }
      });
    });
  });

  let possible: boolean = true;

  pokemonsInTypes.forEach((pokeType: pokeType) => {
    if (pokeType.pokemons.length === 0) possible = false;
  });

  // sort array by the amount of pokemons per type
  pokemonsInTypes.sort(sortByValue("pokemons"));

  // removes the pokemon in type containers with the length of 1 in all the other types
  pokemonsInTypes.forEach((pokeType: pokeType) => {
    // not possible since therer is a type with no pokemons in it.
    if (pokeType.pokemons.length === 0) {
      possible = false;
      return;
    }

    // goes through the type with only 1 pokemon and the removes it from all the other types
    if (pokeType.pokemons.length === 1) {
      pokemonsInTypes.forEach((pokeType2: pokeType) => {
        if (pokeType.type != pokeType2.type) {
          let index = 0;
          pokeType2.pokemons.forEach((pokemon: PokemonDataInterface) => {
            if (
              pokemon.name.toLocaleLowerCase() ===
              pokeType.pokemons[0].name.toLocaleLowerCase()
            ) {
              pokeType2.pokemons.splice(index, 1);
            }
            index++;
          });
        }
      });
    }
  });

  return possible;
};

const enoughCustomPokemons = (
  availablePokemons: PokemonDataInterface[],
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
) => {
  // generate arrays with megas, alolan, galar and gigantamax
  availablePokemons.forEach((pokemon: PokemonDataInterface) => {
    arrCriteriaPokemons.forEach((el: pokeType) => {
      if (pokemon.name.toLowerCase().includes(el.criteria.toLowerCase())) {
        el.pokemons.push(pokemon);
        return;
      }
    });
  });

  let possible = true;

  arrCriteriaPokemons.forEach((el: pokeType) => {
    customAmount.forEach((amount: iCustomOptions) => {
      if (
        el.criteria.toLowerCase() === amount.criteria.toLowerCase() &&
        amount.active &&
        el.pokemons.length < amount.amount
      ) {
        possible = false;
      }
    });
  });

  return possible;
};

// find the pokemons that are alive
export const findAvailablePokemons = (
  generations: iGeneration[],
  typeCriteria: string,
  types: iType[],
  nfeFe: boolean[],
  forms: iForm[]
) => {
  const tempArray: PokemonDataInterface[] = [];

  PokemonData.forEach((pokemon: PokemonDataInterface) => {
    if (isAlive(pokemon, generations, typeCriteria, types, nfeFe, forms)) {
      tempArray.push({
        dexNr: pokemon.dexNr,
        generation: pokemon.generation,
        name: pokemon.name,
        color: pokemon.color,
        isNfe: pokemon.isNfe,
        isUber: pokemon.isUber,
        isForm: pokemon.isForm,
        types: pokemon.types,
        spriteSuffix: pokemon?.spriteSuffix,
      });
    }
  });

  return tempArray;
};

// checks if generating pokemons is possible
export const isPossibleToGeneratePokemons = (
  availablePokemons: PokemonDataInterface[],
  typeCriteria: string,
  amount: number,
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
): [boolean, string[]] => {
  let errorOccured = true;
  let errors: string[] = [];

  // generate more pokemons that are available
  if (!enoughPokemons(availablePokemons, amount, customAmount)) {
    errors.push("Not Enough Pokemons");
    errorOccured = false;
  }

  if (
    typeCriteria.toLowerCase() === "one type each" &&
    !enoughForEachType(availablePokemons)
  ) {
    errors.push("Not Enough Pokemons for Each Type");
    errorOccured = false;
  }

  // todo -> check for custom option
  if (
    !enoughCustomPokemons(availablePokemons, customAmount, arrCriteriaPokemons)
  ) {
    errors.push(
      "Not Enough Pokemons for Custom Options or the Amount is to High"
    );
    errorOccured = false;
  }

  return [errorOccured, errors];
};

const pokemonIsNotUsable = (
  arrPoke: PokemonDataInterface[],
  pokemon: PokemonDataInterface,
  allowedForms: iCustomOptions[]
) => {
  let notPossible = false;

  // not allowed form
  allowedForms.forEach((aF: iCustomOptions) => {
    if (
      aF.active &&
      pokemon.name.toLowerCase().includes(aF.criteria.toLowerCase())
    ) {
      notPossible = true;
    }
  });

  // pokemon already got drafted
  arrPoke.forEach((poke: PokemonDataInterface) => {
    if (poke.dexNr === pokemon.dexNr) {
      notPossible = true;
    }
  });

  return notPossible;
};

const pokeIsNotUsable = (
  arrPoke: PokemonTypeCardDataInterface[],
  pokemon: PokemonDataInterface,
  allowedForms: iCustomOptions[]
) => {
  let notPossible = false;

  // not allowed form
  allowedForms.forEach((aF: iAF) => {
    if (
      aF.active &&
      pokemon.name.toLowerCase().includes(aF.criteria.toLowerCase())
    ) {
      notPossible = true;
    }
  });

  // pokemon already got drafted
  arrPoke.forEach((poke: PokemonTypeCardDataInterface) => {
    if (poke.pokemon.dexNr === pokemon.dexNr) {
      notPossible = true;
    }
  });

  return notPossible;
};

export const generatePokemonCards = (
  availablePokemons: PokemonDataInterface[],
  amount: number,
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
) => {
  const arrPoke: PokemonDataInterface[] = [];

  // get custom Pokemons
  customAmount.map((cA: iCustomOptions) => {
    if (cA.active) {
      for (let i = 0; i < cA.amount; i++) {
        // reduce the amount of overall random pokemons
        amount -= 1;
        // find random pokemon with search criteria
        arrCriteriaPokemons.forEach((criteriaPokemon: pokeType) => {
          if (
            criteriaPokemon.criteria.toLowerCase() === cA.criteria.toLowerCase()
          ) {
            // random number from 0 - length of array
            const randoPokeIndex = Math.floor(
              Math.random() * criteriaPokemon.pokemons.length
            );
            // add rando Pokemon to array of picked pokemons
            arrPoke.push(criteriaPokemon.pokemons[randoPokeIndex]);
            // remove pokemon from the pool, so it will not be picked again
            criteriaPokemon.pokemons.splice(randoPokeIndex, 1);
          }
        });
      }
    }
  });

  // get the rest of the Pokemons
  for (let i = 0; i < amount; i++) {
    let randoPokeIndex = 0;
    // random number from 0 - length of array
    do {
      randoPokeIndex = Math.floor(Math.random() * availablePokemons.length);
    } while (
      pokemonIsNotUsable(
        arrPoke,
        availablePokemons[randoPokeIndex],
        customAmount
      )
    );
    // add rando Pokemon to array of picked pokemons
    arrPoke.push(availablePokemons[randoPokeIndex]);
    // remove pokemon from the pool, so it will not be picked again
    availablePokemons.splice(randoPokeIndex, 1);
  }

  // sort Aray by Pokemon name
  arrPoke.sort(sortByValue("name"));

  return arrPoke;
};

export const generatePokemonTypeCards = (
  availablePokemons: PokemonDataInterface[],
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
) => {
  const arrPoke: PokemonTypeCardDataInterface[] = [];
  // get custom pokemons and replace the other pokemon
  // get all the pokemons from the least amount of types and go upwards
  interface pokeType {
    type: string;
    pokemons: PokemonDataInterface[];
    rolled: boolean;
  }

  const types: string[] = [
    "bug",
    "dragon",
    "fairy",
    "fire",
    "ghost",
    "ground",
    "normal",
    "psychic",
    "steel",
    "dark",
    "electric",
    "fighting",
    "flying",
    "grass",
    "ice",
    "poison",
    "rock",
    "water",
  ];

  const pokemonsInTypes: pokeType[] = [];

  types.forEach((type: string) => {
    pokemonsInTypes.push({ type: type, pokemons: [], rolled: false });
  });

  // fill type array depending on pokemon type
  availablePokemons.forEach((pokemon: PokemonDataInterface) => {
    pokemon.types.forEach((pokeType: string) => {
      pokemonsInTypes.forEach((arrType: pokeType) => {
        // add pokemon to type array if the pokemon has this type
        if (pokeType.toLowerCase() === arrType.type.toLowerCase()) {
          arrType.pokemons.push(pokemon);
        }
      });
    });
  });

  // sort array by the amount of pokemons per type
  pokemonsInTypes.sort(sortByValue("pokemons"));

  // fill array with random pokemons
  // custom options
  customAmount.forEach((cA: iCustomOptions) => {
    if (!cA.active) return

    const availableTypes = [...types];
    let pokemonArray: PokemonDataInterface[] = [];
    let typeIndex: number = 0;
    let type: string = "";

    for (let i = 0; i < cA.amount; i++) {
      // find type that has pokemons with certain criteries in it
      do {
        pokemonArray = [];
        // choose type
        typeIndex = Math.floor(Math.random() * availableTypes.length);
        type = availableTypes[typeIndex];

        arrCriteriaPokemons.forEach(critPoke => {
          if (critPoke.criteria.toLowerCase() != cA.criteria.toLowerCase()) return;        

          critPoke.pokemons.forEach((pokemon: PokemonDataInterface) => {
            pokemon.types.forEach((pokemonType: string) => {
              if (pokemonType.toLowerCase() === type.toLowerCase()) {
                pokemonArray.push(pokemon);
                return;
              }
            })
          })
        })
      } while (pokemonArray.length === 0)

      // generate pokemon
      const pokemonIndex: number = Math.floor(Math.random() * pokemonArray.length);
      arrPoke.push({type: type, pokemon: pokemonArray[pokemonIndex]})
      
      // removes type
      availableTypes.splice(typeIndex, 1);
      // check that type is allready rolled
      pokemonsInTypes.forEach((poketype: pokeType) => {
        if (poketype.type.toLowerCase() === type.toLowerCase()) {
          poketype.rolled = true;
          return;
        }
      })
    }
  })

  // rando pokemons
  pokemonsInTypes.forEach((pokeInType: pokeType) => {
    // do nothing if we already got an pokemon for that type
    if (pokeInType.rolled) return;

    let randoPokeIndex = 0;
    // random number from 0 - length of array
    do {
      randoPokeIndex = Math.floor(Math.random() * pokeInType.pokemons.length);
    } while (
      pokeIsNotUsable(
        arrPoke,
        pokeInType.pokemons[randoPokeIndex],
        customAmount
      )
    );

    arrPoke.push({
      type: pokeInType.type,
      pokemon: pokeInType.pokemons[randoPokeIndex],
    });
  });

  // sort array by types
  arrPoke.sort(sortByValue("type"))

  return arrPoke;
};
