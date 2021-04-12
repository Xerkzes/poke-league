import React, { useState } from "react";
import {
  iGeneration,
  iType,
  iForm,
  PokemonDataInterface,
  iCustomOptions,
} from "../../../../Interfaces/interface";
import PokemonData from "../../../../Data/Pokemons.json";
import { isAlive, sortByValue } from "../../../../Utilities";
import { Card } from "./Generate/Card";

interface GeneratorProps {
  generations: iGeneration[];
  typeCriteria: string;
  types: iType[];
  nfeFe: boolean[];
  forms: iForm[];
  amount: number;
  customAmount: iCustomOptions[];
  pokemons: PokemonDataInterface[];
  errorOccured: boolean;
  errors: string[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonDataInterface[]>>;
  setErrorOccured: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

interface pokeType {
  criteria: string;
  pokemons: PokemonDataInterface[];
}

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

  // remove pokemons where there are only 1 of them in types and check if it's still possible
  pokemonsInTypes.sort(sortByValue("pokemons"));
  pokemonsInTypes.forEach((pokeType: pokeType) => {
    if (pokeType.pokemons.length === 0) {
      possible = false;
      return;
    }

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
const findAvailablePokemons = (
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
const isPossibleToGeneratePokemons = (
  availablePokemons: PokemonDataInterface[],
  typeCriteria: string,
  amount: number,
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
) => {
  // generate more pokemons that are available
  if (!enoughPokemons(availablePokemons, amount, customAmount)) {
    console.log("not enough pokemons");
    return false;
  }

  if (
    typeCriteria.toLowerCase() === "one type each" &&
    !enoughForEachType(availablePokemons)
  ) {
    return false;
  }

  // todo -> check for custom option
  if (
    !enoughCustomPokemons(availablePokemons, customAmount, arrCriteriaPokemons)
  ) {
    return false;
  }

  return true;
};

const pokemonIsNotUsable = (
  arrPoke: PokemonDataInterface[],
  availablePokemons: PokemonDataInterface[],
  randoPokeIndex: number,
  allowedForms: iAF[]
) => {
  let notPossible = false;

  // not allowed form
  allowedForms.forEach((aF: iAF) => {
    if (
      aF.active &&
      availablePokemons[randoPokeIndex].name
        .toLowerCase()
        .includes(aF.criteria.toLowerCase())
    ) {
      notPossible = true;
    }
  });

  // pokemon already got drafted
  arrPoke.forEach((poke: PokemonDataInterface) => {
    if (poke.dexNr === availablePokemons[randoPokeIndex].dexNr) {
      notPossible = true;
    }
  });

  return notPossible;
};

const generatePokemonCards = (
  availablePokemons: PokemonDataInterface[],
  typeCriteria: string,
  amount: number,
  customAmount: iCustomOptions[],
  arrCriteriaPokemons: pokeType[]
) => {
  const arrPoke: PokemonDataInterface[] = [];
  // todo -> make array that stores which pokemons forms are allowed to get picked -> custom Option active aren't allowed to get picked
  const allowedForms: iAF[] = [];
  customAmount.forEach((el: iCustomOptions) => {
    allowedForms.push({ criteria: el.criteria, active: el.active });
  });

  switch (typeCriteria.toLowerCase()) {
    case "custom": {
      // get custom Pokemons
      customAmount.map((cA: iCustomOptions) => {
        if (cA.active) {
          for (let i = 0; i < cA.amount; i++) {
            // reduce the amount of overall random pokemons
            amount -= 1;
            // find random pokemon with search criteria
            arrCriteriaPokemons.forEach((criteriaPokemon: pokeType) => {
              if (
                criteriaPokemon.criteria.toLowerCase() ===
                cA.criteria.toLowerCase()
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
            availablePokemons,
            randoPokeIndex,
            allowedForms
          )
        );
        // add rando Pokemon to array of picked pokemons
        arrPoke.push(availablePokemons[randoPokeIndex]);
        // remove pokemon from the pool, so it will not be picked again
        availablePokemons.splice(randoPokeIndex, 1);
      }

      // sort Aray by Pokemon name
      arrPoke.sort(sortByValue("name"));
      break;
    }
    case "one type each": {
      break;
    }
  }

  // return array with random pokemons

  return arrPoke;
};

export const Generate: React.FC<GeneratorProps> = ({
  generations,
  typeCriteria,
  types,
  nfeFe,
  forms,
  amount,
  customAmount,
  pokemons,
  errorOccured,
  errors,
  setPokemons,
  setErrorOccured,
  setErrors,
}) => {
  const generatePokemons = () => {
    setErrorOccured(false);

    if (typeCriteria.toLowerCase() === "one type each") {
      setErrorOccured(true);
      setErrors(["One Type Each is in developing."]);
      return;
    }

    // console.log("start generating...");
    const availablePokemons: PokemonDataInterface[] = findAvailablePokemons(
      generations,
      typeCriteria,
      types,
      nfeFe,
      forms
    );

    // filter pokemons with search criteria and put them into an array
    const criterias = ["-mega", "-alola", "-galar", "-gigantamax"];
    const arrCriteriaPokemons: pokeType[] = [];
    criterias.forEach((criteria: string) => {
      arrCriteriaPokemons.push({ criteria: criteria, pokemons: [] });
    });

    // console.log("finished finding available pokemons.");
    const possibleToGeneratePokemons: boolean = isPossibleToGeneratePokemons(
      availablePokemons,
      typeCriteria,
      amount,
      customAmount,
      arrCriteriaPokemons
    );

    // console.log(
    //   "possible to generate: " + possibleToGeneratePokemons.toString()
    // );

    if (possibleToGeneratePokemons) {
      setPokemons(
        generatePokemonCards(
          availablePokemons,
          typeCriteria,
          amount,
          customAmount,
          arrCriteriaPokemons
        )
      );
    }
  };

  return (
    <div>
      <h2 className="text-center text-4xl">Generate</h2>

      <div className="flex itemss-center justify-center mt-5">
        <button className=" bg-red-200 p-1" onClick={() => generatePokemons()}>
          Happy Accidents
        </button>
      </div>

      <div className="mt-10 text">
        {errorOccured ? (
          <div>
            <h2 className="text-xl text-center">Error occured:</h2>
            {errors.map((error: string) => {
              return (
                <p className="text-center bg-red-400 py-1 my-2">{error}</p>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {pokemons.map((pokemon: PokemonDataInterface) => {
              return <Card key={pokemon.name} cardData={pokemon} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
