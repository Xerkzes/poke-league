import React, { useEffect, useState } from "react";
import MatchData from "../../../Data/Match.json";
import TrainerData from "../../../Data/TrainerData.json";
import { TrainerInterface, MatchInterface } from "../../../Interfaces/interface";
import { getTrainerDataFromTeamNr, getTrainerData } from "../../../Utilities";

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

    MatchData.forEach((match: any) => {
      match.matches.forEach((fight: MatchInterface) => {
        const trainer1 =
          typeof fight.trainer1 === "string"
            ? getTrainerData(fight.trainer1, TrainerData)
            : getTrainerDataFromTeamNr(fight.trainer1, TrainerData);

        const trainer2 =
          typeof fight.trainer2 === "string"
            ? getTrainerData(fight.trainer2, TrainerData)
            : getTrainerDataFromTeamNr(fight.trainer2, TrainerData);

        if (
          trainer1?.name.toLowerCase() === trainer.name.toLowerCase() ||
          trainer2?.name.toLowerCase() === trainer.name.toLowerCase()
        ) {
          if (fight.winner === "" || fight.winner === 0) return;
          else if (
            typeof fight.winner === "string"
              ? fight.winner.toLowerCase() === trainer.name.toLowerCase()
              : fight.winner === trainer.team
          )
            _wins++;
          else _loses++;
        }
      });
    });

    setWins(_wins);
    setLoses(_loses);
  }, []);

  return (
    <div>
      <div className={"rooster-team " + (index > 0 ? "rooster-border-top-name" : "")}>
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
