import React from "react";
import MatchesData from "../../../Data/Match.json";
import TrainerData from "../../../Data/TrainerData.json";
import { LeagueInterface, MatchInterface, TrainerInterface } from "../../../Interfaces/interface";
import { Accordion } from "../../Accordion/Accordion";
import { getTrainerDataFromTeamNr, getTrainerData } from "../../../Utilities";

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

export const Matches: React.FC<MatchesProps> = ({}) => {
  return (
    <div>
      <h1>Matches</h1>

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
    </div>
  );
};
