import React, { useEffect, useState } from "react";
import { iReroll } from "./PokeReroll";
import TypeColors from "../../../Data/TypeColor";
import Pokemons from "../../../Data/Pokemons.json";
import Division from "../../../Data/Division.json";
import TrainerList from "../../../Data/TrainerData.json";
import {
  getPokemonData,
  createImgUrl,
  capitalizeFirstLetter,
  getTrainerData,
} from "../../../Utilities";
import {
  PokemonDataInterface,
  Division as iDivision,
  TrainerInterface,
} from "../../../Interfaces/interface";

interface WeekRerollProps {
  reroll: iReroll;
}

export const WeekReroll: React.FC<WeekRerollProps> = ({ reroll }) => {
  const [imgUrlOldPokemon, setImgUrlOldPokemon] = useState<string>("");
  const [imgUrlNewPokemon, setImgUrlNewPokemon] = useState<string>("");
  const [borderColor, setBorderColor] = useState<string>("");
  const [imgOldLoaded, setImgOldLoaded] = useState<boolean>(false);
  const [imgNewLoaded, setImgNewLoaded] = useState<boolean>(false);

  useEffect(() => {
    const oldPokemon: PokemonDataInterface | undefined = getPokemonData(
      reroll.previousPokemon,
      Pokemons
    );

    const newPokemon: PokemonDataInterface | undefined = getPokemonData(
      reroll.newPokemon,
      Pokemons
    );

    if (oldPokemon) {
      setImgUrlOldPokemon(createImgUrl(oldPokemon));
    }

    if (newPokemon) {
      setImgUrlNewPokemon(createImgUrl(newPokemon));
    }

    // border depending on the division
    const trainer: TrainerInterface | undefined = getTrainerData(reroll.trainer, TrainerList);
    if (trainer) {
      const color = Division.find(
        (division: iDivision) => division.division.toLowerCase() === trainer.division.toLowerCase()
      )?.background;
      if (color) setBorderColor(color);
    }
  }, [reroll]);

  return (
    <div className="reroll-container">
      <p className="reroll-trainer" style={{ borderLeft: `5px solid ${borderColor}` }}>
        {reroll.trainer}
      </p>
      <p
        className="trainer-pokemon-type reroll-type"
        style={{ backgroundColor: TypeColors[reroll.type.toLowerCase()] }}
      >
        {capitalizeFirstLetter(reroll.type)}
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
