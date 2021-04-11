import React, { useState } from "react";
import {
  iGeneration,
  iType,
  iForm,
  iCard,
  PokemonDataInterface,
  iCustomOptions,
} from "../../../../Interfaces/interface";
import PokemonData from "../../../../Data/Pokemons.json";
import {
  isAlive,
  createImgUrl,
  createTypeArray,
  sortByValue,
} from "../../../../Utilities";

interface GeneratorProps {
  generations: iGeneration[];
  typeCriteria: string;
  types: iType[];
  nfeFe: boolean[];
  forms: iForm[];
  amount: number;
  customAmount: iCustomOptions[];
}

const enoughPokemons = (
  availablePokemons: iCard[],
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

const enoughForEachType = (availablePokemons: iCard[]) => {
  interface pokeType {
    type: string;
    pokemons: iCard[];
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
  availablePokemons.forEach((pokemon: iCard) => {
    pokemon.type.forEach((pokeType: string) => {
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
          pokeType2.pokemons.forEach((pokemon: iCard) => {
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
  availablePokemons: iCard[],
  customAmount: iCustomOptions[]
) => {
  // generate arrays with megas, alolan, galar and gigantamax
  interface pokeType {
    criteria: string;
    pokemons: iCard[];
  }

  const criterias = ["-mega", "-alola", "-galar", "-gigantamax"];

  const arrPoke: pokeType[] = [];

  criterias.forEach((criteria: string) => {
    arrPoke.push({ criteria: criteria, pokemons: [] });
  });

  availablePokemons.forEach((pokemon: iCard) => {
    arrPoke.forEach((el: pokeType) => {
      if (pokemon.name.toLowerCase().includes(el.criteria.toLowerCase())) {
        el.pokemons.push(pokemon);
        return;
      }
    });
  });

  let possible = true;

  arrPoke.forEach((el: pokeType) => {
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
  const tempArray: iCard[] = [];

  PokemonData.forEach((pokemon: PokemonDataInterface) => {
    if (isAlive(pokemon, generations, typeCriteria, types, nfeFe, forms)) {
      tempArray.push({
        imageUrl: createImgUrl(pokemon),
        name: pokemon.name,
        type: createTypeArray(pokemon),
        active: true,
      });
    }
  });

  return tempArray;
};

// checks if generating pokemons is possible
const isPossibleToGeneratePokemons = (
  availablePokemons: iCard[],
  typeCriteria: string,
  amount: number,
  customAmount: iCustomOptions[]
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
  if (!enoughCustomPokemons(availablePokemons, customAmount)) {
    return false;
  }

  return true;
};

export const Generate: React.FC<GeneratorProps> = ({
  generations,
  typeCriteria,
  types,
  nfeFe,
  forms,
  amount,
  customAmount,
}) => {
  const [pokemons, setPokemons] = useState<iCard>();

  const generatePokemons = () => {
    // console.log("start generating...");
    const availablePokemons: iCard[] = findAvailablePokemons(
      generations,
      typeCriteria,
      types,
      nfeFe,
      forms
    );

    // console.log("finished finding available pokemons.");
    const possibleToGeneratePokemons: boolean = isPossibleToGeneratePokemons(
      availablePokemons,
      typeCriteria,
      amount,
      customAmount
    );

    console.log(
      "possible to generate: " + possibleToGeneratePokemons.toString()
    );
  };

  return (
    <div>
      <h2 className="text-center text-4xl">Generate</h2>

      <div className="flex itemss-center justify-center mt-5">
        <button className=" bg-red-200 p-1" onClick={() => generatePokemons()}>
          Happy Accidents
        </button>
      </div>
    </div>
  );
};
