import React, { useEffect, useState } from "react";
import { PokemonDataInterface } from "../../../Interfaces/interface";
import { weekIReroll } from "./TrainerReroll";
import Pokemons from "../../../Data/Pokemons.json";
import { capitalizeFirstLetter, createImgUrl, getPokemonData } from "../../../Utilities";
import typeColors from "../../../Data/TypeColor";

interface TrainerProps {
  el: weekIReroll;
  idx: number;
}

export const Trainer: React.FC<TrainerProps> = ({ el, idx }) => {
  const [imgOldLoaded, setImgOldLoaded] = useState<boolean>(false);
  const [imgNewLoaded, setImgNewLoaded] = useState<boolean>(false);

  const oldPokemon: PokemonDataInterface | undefined = getPokemonData(el.previousPokemon, Pokemons);
  const imgUrlOldPokemon: string = oldPokemon ? createImgUrl(oldPokemon) : "";
  const newPokemon: PokemonDataInterface | undefined = getPokemonData(el.newPokemon, Pokemons);
  const imgUrlNewPokemon: string = newPokemon ? createImgUrl(newPokemon) : "";

  return (
    <div className="reroll-container" key={idx}>
      <p className="text-xl">{`Week ${el.week}:`}</p>
      <p
        className="trainer-pokemon-type reroll-type"
        style={{ backgroundColor: typeColors[el.type.toLowerCase()] }}
      >
        {capitalizeFirstLetter(el.type)}
      </p>

      <img
        className="trainer-pokemon-img"
        style={imgOldLoaded ? {} : { visibility: "hidden" }}
        onLoad={() => setImgOldLoaded(true)}
        src={imgUrlOldPokemon}
        alt="img"
      />
      <p className="reroll-arrow">&#8594;</p>
      <img
        className="trainer-pokemon-img"
        style={imgNewLoaded ? {} : { visibility: "hidden" }}
        onLoad={() => setImgNewLoaded(true)}
        src={imgUrlNewPokemon}
        alt="img"
      />
    </div>
  );
};
