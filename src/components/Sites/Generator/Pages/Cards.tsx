import React, { useEffect, useRef, useState } from "react";
import {
  iGeneration,
  iType,
  iForm,
  iCard,
  PokemonDataInterface,
} from "../../../../Interfaces/interface";
import PokemonData from "../../../../Data/Pokemons.json";
import { isAlive, createImgUrl, createTypeArray } from "../../../../Utilities";
import { Card } from "./Cards/Card";

interface CardsProps {
  generations: iGeneration[];
  typeCriteria: string;
  types: iType[];
  nfeFe: boolean[];
  forms: iForm[];
  cardGen: number;
  setCardGen: React.Dispatch<React.SetStateAction<number>>;
}

const styleBtn = {
  backgroundColor: "rgb(38, 38, 38)",
  fontSize: "1.5rem",
  height: "3rem",
  padding: "1rem",
  lineHeight: "0px",
};

export const Cards: React.FC<CardsProps> = ({
  generations,
  typeCriteria,
  types,
  nfeFe,
  forms,
  cardGen,
  setCardGen,
}) => {
  const [cards, setCards] = useState<iCard[]>([]);
  // show cards when fully loaded
  const [showPokeCards, setShowPokeCards] = useState<boolean>(false);
  const cardsThatAreLoaded = useRef<number>(0);

  // generate Cards
  useEffect(() => {
    setShowPokeCards(false);
    // debouncing
    const timeout = setTimeout(() => {
      const tempCards: iCard[] = [];

      PokemonData.forEach((pokemon: PokemonDataInterface) => {
        if (pokemon.generation != cardGen) return;

        tempCards.push({
          imageUrl: createImgUrl(pokemon),
          name: pokemon.name,
          type: createTypeArray(pokemon),
          active: isAlive(
            pokemon,
            generations,
            typeCriteria,
            types,
            nfeFe,
            forms
          ),
        });
      });

      setCards(tempCards);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [cardGen]);

  const updateGeneration = (increaseAmount: number) => {
    if (cardGen + increaseAmount >= 1 && cardGen + increaseAmount <= 8) {
      setCardGen(cardGen + increaseAmount);
      cardsThatAreLoaded.current = 0;
    }
  };

  const imagesAreLoaded = () => {
    cardsThatAreLoaded.current += 1;
    if (cardsThatAreLoaded.current == cards.length) {
      setShowPokeCards(true);
    }
  };

  return (
    <div>
      {/* header */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => updateGeneration(-1)}
          className={
            "text-white rounded-lg" + (cardGen === 1 ? " invisible" : "")
          }
          style={styleBtn}
        >
          &#60;
        </button>
        <h2 className="text-4xl mx-6 self-center text-center">
          Generation {cardGen}
        </h2>
        <button
          onClick={() => updateGeneration(1)}
          className={
            "text-white rounded-lg" + (cardGen === 8 ? " invisible" : "")
          }
          style={styleBtn}
        >
          &#62;
        </button>
      </div>

      {/* cards */}
      <div>
        <div
          className="pokemon-cards-loader"
          style={{ display: showPokeCards ? "none" : "block" }}
        ></div>

        <div
          style={{ display: showPokeCards ? "" : "none" }}
          className="flex flex-wrap justify-center mb-12 text-center mt-10"
        >
          {cards.map((cardData: iCard) => {
            return (
              <Card
                key={cardData.name}
                cardData={cardData}
                imagesAreLoaded={imagesAreLoaded}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
