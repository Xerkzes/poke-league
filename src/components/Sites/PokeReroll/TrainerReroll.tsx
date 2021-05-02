import React, { useEffect, useState } from "react";
import {
  TrainerInterface,
  PokemonDataInterface,
} from "../../../Interfaces/interface";
import Rerolls from "../../../Data/PokeReroll.json";
import { iReroll } from "./PokeReroll";
import Pokemons from "../../../Data/Pokemons.json";
import TypeColors from "../../../Data/TypeColor";
import {
  getPokemonData,
  createImgUrl,
  capitalizeFirstLetter,
} from "../../../Utilities";

interface TrainerRerollProps {
  trainer: TrainerInterface;
}

interface weekIReroll extends iReroll {
  week: number;
}

export const TrainerReroll: React.FC<TrainerRerollProps> = ({ trainer }) => {
  const [trainerRerolls, setTrainerRerolls] = useState<weekIReroll[]>([]);

  useEffect(() => {
    Rerolls.forEach((data) => {
      data.rerolls.forEach((reroll) => {
        if (trainer.name.toLowerCase() === reroll.trainer.toLowerCase()) {
          const tempData = { ...reroll, week: data.week };
          setTrainerRerolls((previousData) => [...previousData, tempData]);
        }
      });
    });
  }, [trainer]);

  return (
    <>
      {trainerRerolls.map((el, idx) => {
        const oldPokemon: PokemonDataInterface | undefined = getPokemonData(
          el.previousPokemon,
          Pokemons
        );

        const imgUrlOldPokemon: string = oldPokemon
          ? createImgUrl(oldPokemon)
          : "";

        const newPokemon: PokemonDataInterface | undefined = getPokemonData(
          el.newPokemon,
          Pokemons
        );

        const imgUrlNewPokemon: string = newPokemon
          ? createImgUrl(newPokemon)
          : "";

        return (
          <div className="reroll-container" key={idx}>
            <p className="text-xl">{`Week ${el.week}:`}</p>
            <p
              className="trainer-pokemon-type reroll-type"
              style={{ backgroundColor: TypeColors[el.type.toLowerCase()] }}
            >
              {capitalizeFirstLetter(el.type)}
            </p>

            <img
              className="trainer-pokemon-img"
              src={imgUrlOldPokemon}
              alt="img"
            />
            <p className="reroll-arrow">&#8594;</p>
            <img
              className="trainer-pokemon-img"
              src={imgUrlNewPokemon}
              alt="img"
            />
          </div>
        );
      })}
    </>
  );
};
