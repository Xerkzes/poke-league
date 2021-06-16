import React, { useEffect, useState } from "react";
import { TrainerInterface, PokemonDataInterface } from "../../../Interfaces/interface";
import Rerolls from "../../../Data/PokeReroll.json";
import { iReroll } from "./PokeReroll";
import { Trainer } from "./Trainer";

interface TrainerRerollProps {
  trainer: TrainerInterface;
}

export interface weekIReroll extends iReroll {
  week: string;
}

export const TrainerReroll: React.FC<TrainerRerollProps> = ({ trainer }) => {
  const [trainerRerolls, setTrainerRerolls] = useState<weekIReroll[]>([]);

  useEffect(() => {
    Rerolls.forEach((data) => {
      data.rerolls.forEach((reroll) => {
        if (trainer.name.toLowerCase() === reroll.trainer.toLowerCase()) {
          const tempData = { ...reroll, week: data.header };
          setTrainerRerolls((previousData) => [...previousData, tempData]);
        }
      });
    });
  }, [trainer]);

  return (
    <>
      {trainerRerolls.map((el: weekIReroll, idx: number) => {
        return <Trainer key={el.trainer + el.newPokemon} el={el} idx={idx} />;
      })}
    </>
  );
};
