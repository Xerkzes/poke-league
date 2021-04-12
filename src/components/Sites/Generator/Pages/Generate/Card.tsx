import React, { useState } from "react";
import { PokemonDataInterface } from "../../../../../Interfaces/interface";
import { createImgUrl } from "../../../../../Utilities";

interface CardProps {
  cardData: PokemonDataInterface;
}

export const Card: React.FC<CardProps> = ({ cardData }) => {
  // const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  return (
    <div className="pokemon-card" style={{ backgroundColor: "rgb(50, 50, 50" }}>
      <img
        className="pokemon-generator-sprite"
        src={createImgUrl(cardData)}
        // onLoad={imagesAreLoaded}
      />

      <p className="text-gray-50 text-center">{cardData.name}</p>
    </div>
  );
};
