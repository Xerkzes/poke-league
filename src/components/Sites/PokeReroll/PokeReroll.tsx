import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Rerolls from "../../../Data/PokeReroll.json";
import TrainerData from "../../../Data/TrainerData.json";
import { Accordion } from "../../Accordion/Accordion";
import { WeekReroll } from "./WeekReroll";
import { TrainerReroll } from "./TrainerReroll";
import { TrainerInterface } from "../../../Interfaces/interface";

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

interface TrainerInterfaceExpanded extends TrainerInterface {
  expanded: boolean;
}

const rerollWeekConent = (reroll: iPokemonReroll) => {
  return (
    <div className="poke-reroll-week-container">
      {reroll.rerolls.map((re: iReroll) => {
        return <WeekReroll key={re.trainer} reroll={re} />;
      })}
    </div>
  );
};

const rerollTrainerContent = (trainer: TrainerInterface) => {
  return (
    <div className="poke-reroll-trainer-container">
      <TrainerReroll trainer={trainer} />
    </div>
  );
};

// Tab
interface Tab {
  name: string;
  filter: string;
}
const tabs: Tab[] = [
  { name: "Week", filter: "week" },
  { name: "Trainer", filter: "trainer" },
];

export const PokeReroll: React.FC<PokeRerollProps> = ({}) => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);
  const [pokemonRerolls, setPokemonRerolls] = useState<PokemonRerollExpanded[]>(
    []
  );
  const [trainerRerolls, setTrainerRerolls] = useState<
    TrainerInterfaceExpanded[]
  >([]);

  useEffect(() => {
    // weeks
    Rerolls.forEach((reroll: iPokemonReroll) => {
      const expandedReroll: PokemonRerollExpanded = {
        ...reroll,
        expanded: false,
      };

      setPokemonRerolls((rerolls) => [...rerolls, expandedReroll]);
    });

    // trainer
    TrainerData.forEach((trainer: TrainerInterface) => {
      const expandedTrainer: TrainerInterfaceExpanded = {
        ...trainer,
        expanded: false,
      };

      setTrainerRerolls((trainers) => [...trainers, expandedTrainer]);
    });
  }, []);

  const updateActiveComponent = (tab: Tab) => {
    setActiveComponent(tab);
  };

  const renderTab = (tabName: string) => {
    switch (tabName) {
      case "week": {
        return Rerolls.map((reroll: iPokemonReroll, idx: number) => {
          return (
            <Accordion
              key={reroll.week}
              array={pokemonRerolls}
              setArray={setPokemonRerolls}
              header={`Week ${reroll.week}`}
              content={rerollWeekConent(reroll)}
              index={idx}
            />
          );
        });
      }
      case "trainer": {
        return TrainerData.map((trainer: TrainerInterface, idx: number) => {
          return (
            <Accordion
              key={trainer.name}
              array={trainerRerolls}
              setArray={setPokemonRerolls}
              header={`${trainer.name}`}
              content={rerollTrainerContent(trainer)}
              index={idx}
            />
          );
        });
      }
    }
  };

  return (
    <div>
      <h1>Pokemon Rerolls (test data)</h1>

      {/* tabs */}
      <div className="my-4 ">
        <nav
          className="relative z-0 rounded-lg overflow-hidden 
          shadow flex divide-x divide-gray-800 border-2 border-gray"
        >
          {tabs.map((tab) => {
            return (
              <div
                onClick={() => updateActiveComponent(tab)}
                key={tab.name}
                style={{
                  fontFamily: '"Roboto", sans-serif',
                }}
                className={classNames(
                  tab.name === activeComponent.name
                    ? "text-gray-100"
                    : "text-gray-300 hover:text-gray-100",
                  "cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-gray-800 py-4 px-4 text-sm font-medium hover:bg-gray-700 focus:z-10"
                )}
              >
                <div className="flex items-center justify-center space-x-4">
                  {/* <tab.icon className="block h-6 w-6" aria-hidden="true" /> */}
                  <div className="">{tab.name}</div>
                </div>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.name === activeComponent.name
                      ? "bg-red-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-1.5"
                  )}
                />
              </div>
            );
          })}
        </nav>
      </div>

      {/* display of settings */}
      <div>{renderTab(activeComponent.filter)}</div>
    </div>
  );
};
