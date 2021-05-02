import React, { useEffect, useState } from "react";
import Rerolls from "../../../Data/PokeReroll.json";
import { Accordion } from "../../Accordion/Accordion";
import { Reroll } from "./Reroll";

interface PokeRerollProps {}

export interface iReroll {
  trainer: string;
  type: string;
  previousPokemon: string;
  newPokemon: string;
}

export interface iPokemonReroll {
  week: number;
  rerolls: iReroll[];
}

interface PokemonRerollExpanded extends iPokemonReroll {
  expanded: boolean;
}

const rerollConent = (reroll: iPokemonReroll) => {
  return (
    <div className="poke-reroll-container">
      {reroll.rerolls.map((re: iReroll) => {
        return <Reroll key={re.trainer} reroll={re} />;
      })}
    </div>
  );
};

export const PokeReroll: React.FC<PokeRerollProps> = ({}) => {
  const [pokemonRerolls, setPokemonRerolls] = useState<PokemonRerollExpanded[]>(
    []
  );

  useEffect(() => {
    Rerolls.forEach((reroll: iPokemonReroll) => {
      const expandedReroll: PokemonRerollExpanded = {
        ...reroll,
        expanded: false,
      };

      setPokemonRerolls((rerolls) => [...rerolls, expandedReroll]);
    });
  }, []);

  return (
    <div>
      <h1>Pokemon Rerolls (test data)</h1>

      {Rerolls.map((reroll: iPokemonReroll, idx: number) => {
        return (
          <Accordion
            key={reroll.week}
            array={pokemonRerolls}
            setArray={setPokemonRerolls}
            header={`week ${reroll.week}`}
            content={rerollConent(reroll)}
            index={idx}
          />
        );
      })}
    </div>
  );
};
