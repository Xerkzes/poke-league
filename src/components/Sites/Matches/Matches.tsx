import React, { useEffect, useState } from "react";
import MatchesData from "../../../Data/Match.json";
import {
  LeagueInterface,
  LeagueExpandedInterface,
  MatchInterface,
} from "../../../Interfaces/interface";
import { Accordion } from "../../Accordion/Accordion";

interface MatchesProps {}

const matchContent = (matchData: LeagueInterface) => {
  return matchData.matches.map((match: MatchInterface) => {
    return (
      <div key={match.name1 + match.name2} className="match">
        <p
          className={
            "team team-left " +
            (match.winner === ""
              ? ""
              : match.winner === match.name1
              ? "match-won"
              : "match-lost")
          }
        >
          {match.name1}
        </p>
        <p className="vs">-</p>
        <p
          className={
            "team " +
            (match.winner === ""
              ? ""
              : match.winner === match.name2
              ? "match-won"
              : "match-lost")
          }
        >
          {match.name2}
        </p>
      </div>
    );
  });
};

export const Matches: React.FC<MatchesProps> = ({}) => {
  const [matches, setMatches] = useState<LeagueExpandedInterface[]>([]);

  useEffect(() => {
    MatchesData.map((match) => {
      const expandTrainer: LeagueExpandedInterface = {
        ...match,
        expanded: false,
      };

      setMatches((matches) => [...matches, expandTrainer]);
    });
  }, []);

  return (
    <div>
      <h1>Matches</h1>

      <div className="matches-container">
        {MatchesData.map((matchData: LeagueInterface, idx) => {
          return (
            <Accordion
              key={matchData.header}
              array={matches}
              setArray={setMatches}
              header={matchData.header}
              content={matchContent(matchData)}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
