import React, { useEffect, useState } from "react";
import MatchesData from "../../../Data/Match.json";
import { Card } from "./Card";
import {
  LeagueInterface,
  LeagueExpandedInterface,
} from "../../../Interfaces/interface";

interface MatchesProps {}

export const Matches: React.FC<MatchesProps> = () => {
  const [matches, setMatches] = useState<LeagueExpandedInterface[]>([]);

  useEffect(() => {
    MatchesData.forEach((match) => {
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
            <Card
              key={matchData.header}
              matchData={matchData}
              matchesData={matches}
              setMatches={setMatches}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
