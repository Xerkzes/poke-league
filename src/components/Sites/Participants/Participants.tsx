import React, { useEffect, useState } from "react";
import TrainerData from "../../../Data/TrainerData.json";
import {
  TrainerExpandedInterface,
  TrainerInterface,
  TrainerPokemonInterface,
} from "../../../Interfaces/interface";
import { Accordion } from "../../Accordion/Accordion";
import { Pokemon } from "./Trainer/Pokemon";

interface ParticipantsProps {}

const pokemonsContent = (trainer: TrainerInterface) => {
  return trainer.pokemons.map((pokemon: TrainerPokemonInterface) => {
    return <Pokemon key={pokemon.name} pokemon={pokemon} />;
  });
};

export const Participants: React.FC<ParticipantsProps> = ({}) => {
  return (
    <div className="participants-container">
      <h1>Participants</h1>

      <div className="participants-participants">
        {TrainerData.map((trainer: TrainerInterface, idx) => {
          return (
            <Accordion
              key={trainer.team}
              header={`${trainer.name} (${trainer.discordName})`}
              content={pokemonsContent(trainer)}
            />
          );
        })}
      </div>
    </div>
  );
};
