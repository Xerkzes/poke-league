import React from "react";
import {
  iGeneration,
  iType,
  iForm,
  PokemonDataInterface,
  iCustomOptions,
  pokeType,
  PokemonTypeCardDataInterface,
} from "../../../../Interfaces/interface";
import { Card } from "./Generate/Card";
import { TypeCard } from "./Generate/TypeCard";
import {
  findAvailablePokemons,
  isPossibleToGeneratePokemons,
  generatePokemonCards,
  generatePokemonTypeCards,
} from "./Generate/generate";

interface GeneratorProps {
  generations: iGeneration[];
  typeCriteria: string;
  types: iType[];
  nfeFe: boolean[];
  forms: iForm[];
  amount: number;
  customAmount: iCustomOptions[];
  pokemons: PokemonDataInterface[];
  pokemonsTypeCard: PokemonTypeCardDataInterface[];
  errorOccured: boolean;
  errors: string[];
  setPokemons: React.Dispatch<React.SetStateAction<PokemonDataInterface[]>>;
  setPokemonsTypeCard: React.Dispatch<
    React.SetStateAction<PokemonTypeCardDataInterface[]>
  >;
  setErrorOccured: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Generate: React.FC<GeneratorProps> = ({
  generations,
  typeCriteria,
  types,
  nfeFe,
  forms,
  amount,
  customAmount,
  pokemons,
  pokemonsTypeCard,
  errorOccured,
  errors,
  setPokemons,
  setPokemonsTypeCard,
  setErrorOccured,
  setErrors,
}) => {
  const generatePokemons = () => {
    setErrorOccured(false);

    // if (typeCriteria.toLowerCase() === "one type each") {
    //   setErrorOccured(true);
    //   setErrors(["One Type Each is in developing."]);
    //   return;
    // }

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

    const [possibleToGeneratePokemons, errors] = isPossibleToGeneratePokemons(
      availablePokemons,
      typeCriteria,
      amount,
      customAmount,
      arrCriteriaPokemons
    );

    if (!possibleToGeneratePokemons) {
      setErrorOccured(true);
      setErrors(errors);
      return;
    }

    switch (typeCriteria.toLowerCase()) {
      case "one type each": {
        setPokemonsTypeCard(
          generatePokemonTypeCards(
            availablePokemons,
            customAmount,
            arrCriteriaPokemons
          )
        );
        break;
      }
      case "custom": {
        setPokemons(
          generatePokemonCards(
            availablePokemons,
            amount,
            customAmount,
            arrCriteriaPokemons
          )
        );
        break;
      }
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
            {errors.map((error: string, idx: number) => {
              return (
                <p key={idx} className="text-center bg-red-400 py-1 my-2">
                  {error}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {typeCriteria.toLowerCase() === "custom" &&
              pokemons.map((pokemon: PokemonDataInterface) => {
                return <Card key={pokemon.name} cardData={pokemon} />;
              })}

            {typeCriteria.toLowerCase() === "one type each" &&
              pokemonsTypeCard.map((typeCard: PokemonTypeCardDataInterface) => {
                return (
                  <TypeCard key={typeCard.pokemon.name} cardData={typeCard} />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
