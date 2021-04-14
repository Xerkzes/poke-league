import React, { useState } from "react";
import { PokemonTypeCardDataInterface } from "../../../../../Interfaces/interface";
import { createImgUrl, capitalizeFirstLetter } from "../../../../../Utilities";
import TypeColor from "../../../../../Data/TypeColor";

interface TypeCardProps {
  cardData: PokemonTypeCardDataInterface;
}

export const TypeCard: React.FC<TypeCardProps> = ({ cardData }) => {
  // const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  return (
    <div className="pokemon-card" style={{ backgroundColor: "rgb(50, 50, 50" }}>
      <div>
        <img
          className="pokemon-generator-sprite"
          src={createImgUrl(cardData.pokemon)}
          // onLoad={imagesAreLoaded}
        />

        <p className="pokemon-generator-pokeName">{cardData.pokemon.name}</p>
      </div>
      <p
        className="text-center text-white mb-2 self-center"
        style={{
          backgroundColor: TypeColor[cardData.type.toLowerCase()],
          borderRadius: "50px",
          width: "90%",
        }}
      >
        {capitalizeFirstLetter(cardData.type)}
      </p>
    </div>
  );
};
