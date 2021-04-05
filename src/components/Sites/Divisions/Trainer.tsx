import React, { useEffect, useState } from "react";
import MatchData from "../../../Data/Match.json";
import { TrainerInterface } from "../../../Interfaces/interface";

interface TrainerProp {
  trainer: TrainerInterface;
  index: number;
}

export const Trainer: React.FC<TrainerProp> = ({ trainer, index }) => {
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  useEffect(() => {
    let _wins = 0;
    let _loses = 0;

    MatchData.forEach((match) => {
      match.matches.forEach((fight) => {
        if (fight.name1 === trainer.name || fight.name2 === trainer.name) {
          if (fight.winner === "") return;
          else if (fight.winner === trainer.name) _wins++;
          else _loses++;
        }
      });
    });

    setWins(_wins);
    setLoses(_loses);
  }, []);

  return (
    <div>
      <div
        className={
          "rooster-team " + (index > 0 ? "rooster-border-top-name" : "")
        }
      >
        <p className="rooster-team-name">
          {trainer.team}: {trainer.name}
        </p>
        <div className="rooster-team-scores ">
          <p className="rooster-team-games-won">{wins}</p>
          <p className="rooster-team-games-lost">{loses}</p>
        </div>
      </div>
    </div>
  );
};
