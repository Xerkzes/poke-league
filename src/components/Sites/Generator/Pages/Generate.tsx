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
import { isAlive, createImgUrl, createTypeArray } from "../../../../Utilities";

interface GeneratorProps {
  generations: iGeneration[];
  typeCriteria: string;
  types: iType[];
  nfeFe: boolean[];
  forms: iForm[];
  amount: number;
  customAmount: iCustomOptions[];
}

const notEnoughPokemons = (
  availablePokemons: iCard[],
  amount: number,
  customAmount: iCustomOptions[]
) => {
  // not enought pokemons to generate
  if (availablePokemons.length < amount) {
    return false;
  }

  let possible = false;

  // not enough pokemons for custom pokemon
  let customAmountTotal = 0;
  customAmount.forEach((amount: iCustomOptions) => {
    if (amount.active) {
      customAmountTotal += amount.amount;
    }
  });

  if (
    availablePokemons.length > customAmountTotal ||
    amount > customAmountTotal
  ) {
    possible = true;
  }

  return !possible;
};

const notEnoughForEachType = (availablePokemons: iCard[]) => {
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

  console.log(pokemonsInTypes);

  let notPossible: boolean = false;

  // todo
  pokemonsInTypes.forEach((pokeType: pokeType) => {
    if (pokeType.pokemons.length === 0) notPossible = true;
  });

  return notPossible;
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
  if (notEnoughPokemons(availablePokemons, amount, customAmount)) {
    console.log("not enough pokemons");
    return false;
  }

  if (
    typeCriteria.toLowerCase() === "one type each" &&
    notEnoughForEachType(availablePokemons)
  ) {
    console.log("one type each");
    return false;
  }

  // todo -> check for custom option

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
        {/* <button className=" bg-red-200 p-1" onClick={() => generatePokemons()}>
          Happy Accidents
        </button> */}
      </div>
    </div>
  );
};
