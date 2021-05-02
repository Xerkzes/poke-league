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
  return (
    <div className="matches-trainer-container">
      {matchData.matches.map((match: MatchInterface) => {
        return (
          <div key={match.name1 + match.name2} className="match">
            <p
              className={
                "team team-left " +
                (match.winner === ""
                  ? ""
                  : match.winner.toLowerCase() === match.name1.toLowerCase()
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
                  : match.winner.toLowerCase() === match.name2.toLowerCase()
                  ? "match-won"
                  : "match-lost")
              }
            >
              {match.name2}
            </p>
          </div>
        );
      })}
    </div>
  );
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
      <h1>Matches (test data)</h1>

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
