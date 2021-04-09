import React from "react";
import { iCard } from "../../../../../Interfaces/interface";

interface CardProps {
  cardData: iCard;
  imagesAreLoaded: () => void;
}

export const Card: React.FC<CardProps> = ({ cardData, imagesAreLoaded }) => {
  return (
    <div
      className="pokemon-card"
      style={
        cardData.active
          ? { backgroundColor: "#add8e6" }
          : { backgroundColor: "#ffa07a" }
      }
    >
      <img
        className="pokemon-generator-sprite"
        src={cardData.imageUrl}
        onLoad={imagesAreLoaded}
      />

      <p className="pokemon-generator-pokeName">{cardData.name}</p>
    </div>
  );
};
