import React, { useState } from "react";
import {
  TrainerInterface,
  TrainerExpandedInterface,
  TrainerPokemonInterface,
} from "../../../../Interfaces/interface";
import { Pokemon } from "./Pokemon";

interface TrainerProps {
  trainer: TrainerInterface;
  trainers: TrainerExpandedInterface[];
  setTrainers: React.Dispatch<React.SetStateAction<TrainerExpandedInterface[]>>;
  idx: number;
}

export const Trainer: React.FC<TrainerProps> = ({
  trainer,
  trainers,
  setTrainers,
  idx,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const headerWasClicked = () => {
    setExpanded(!expanded);

    const newArray = [...trainers];
    newArray[idx].expanded = !expanded;
    setTrainers(newArray);
  };

  return (
    <div
      className={
        "trainer-container" + (expanded ? " trainer-container-expanded" : "")
      }
      style={
        trainers[idx]?.expanded || idx + 1 === trainers.length
          ? {}
          : trainers[idx + 1]?.expanded
          ? { borderBottom: "none" }
          : {
              borderBottom: "0.3px solid rgba(0, 0, 0, 0.4)",
            }
      }
    >
      <div className="trainer-header" onClick={() => headerWasClicked()}>
        <p>{trainer.name}</p>
        <p className={expanded ? "trainer-carrot-up" : "trainer-carrot-down"}>
          v
        </p>
      </div>

      <div
        className={
          "trainer-content" + (expanded ? " trainer-content-expanded" : "")
        }
        style={
          expanded
            ? {
                maxHeight: "100rem",
              }
            : {
                maxHeight: "0rem",
              }
        }
      >
        <div
          className={
            "trainer-pokemons" + (expanded ? " trainer-pokemons-expanded" : "")
          }
        >
          {expanded &&
            trainer.pokemons.map((pokemon: TrainerPokemonInterface) => {
              return <Pokemon key={pokemon.name} pokemon={pokemon} />;
            })}
        </div>
      </div>
    </div>
  );
};
