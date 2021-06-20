import React, { useState } from "react";
import classNames from "classnames";
import MatchesData from "../../../Data/Match.json";
import TrainerData from "../../../Data/TrainerData.json";
import { LeagueInterface, MatchInterface, TrainerInterface } from "../../../Interfaces/interface";
import { Accordion } from "../../Accordion/Accordion";
import { getTrainerDataFromTeamNr, getTrainerData } from "../../../Utilities";
import { DraftLeague } from "../DraftLeague/DraftLeague";

interface MatchesProps {}

const addConditionalCss = (match: MatchInterface, trainer: TrainerInterface | undefined) => {
  if (typeof match.winner === "number") {
    if (match.winner === 0) return "";

    return match.winner === trainer?.team ? "match-won" : "match-lost";
  } else if (typeof match.winner === "string") {
    if (match.winner === "") return "";

    return match.winner.toLowerCase() === trainer?.name.toLowerCase() ? "match-won" : "match-lost";
  }
};

const matchContent = (matchData: LeagueInterface) => {
  return (
    <div className="matches-trainer-container">
      {matchData.matches.map((match: MatchInterface, idx: number) => {
        const trainer1: TrainerInterface | undefined =
          typeof match.trainer1 === "string"
            ? getTrainerData(match.trainer1, TrainerData)
            : getTrainerDataFromTeamNr(match.trainer1, TrainerData);

        const trainer2: TrainerInterface | undefined =
          typeof match.trainer2 === "string"
            ? getTrainerData(match.trainer2, TrainerData)
            : getTrainerDataFromTeamNr(match.trainer2, TrainerData);

        return (
          <div key={idx} className="match">
            <p className={"team team-left " + addConditionalCss(match, trainer1)}>
              {trainer1?.name}
            </p>
            <p className="vs">-</p>
            <p className={"team " + addConditionalCss(match, trainer2)}>{trainer2?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

interface Tab {
  name: string;
  filter: string;
}
const tabs: Tab[] = [
  { name: "Weeks", filter: "week" },
  { name: "Draft League", filter: "draftLeague" },
];

const renderTab = (tabName: string) => {
  switch (tabName) {
    case "week": {
      return (
        <div className="matches-container">
          {MatchesData.map((matchData: any, idx) => {
            return (
              <Accordion
                key={matchData.header}
                header={matchData.header}
                content={matchContent(matchData)}
              />
            );
          })}
        </div>
      );
    }
    case "draftLeague": {
      return <DraftLeague />;
    }
  }
};

export const Matches: React.FC<MatchesProps> = ({}) => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);

  const updateActiveComponent = (tab: Tab) => {
    setActiveComponent(tab);
  };

  return (
    <div>
      <h1>Matches</h1>

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
                    tab.name === activeComponent.name ? "bg-red-500" : "bg-transparent",
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
