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
      <div>
        <img
          className="pokemon-generator-sprite"
          src={createImgUrl(cardData)}
          // onLoad={imagesAreLoaded}
        />

        <p className="pokemon-generator-pokeName">{cardData.name}</p>
      </div>
    </div>
  );
};
