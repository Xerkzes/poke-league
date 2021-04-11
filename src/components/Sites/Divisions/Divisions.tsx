import React, { useEffect, useState } from "react";
import DivsionData from "../../../Data/Division.json";
import { Division, TrainerInterface } from "../../../Interfaces/interface";
import { Trainer } from "../Divisions/Trainer";
import TrainerData from "../../../Data/TrainerData.json";
import { sortByValue } from "../../../Utilities";

interface DivisionsProps {}

interface Divisions {
  division: Division;
  participants: TrainerInterface[];
}

const findTrainersInDivisions = (division: string, data: any) => {
  const trainers: TrainerInterface[] = [];

  data.forEach((trainer: TrainerInterface) => {
    if (trainer.division.toLocaleLowerCase() === division.toLocaleLowerCase()) {
      trainers.push(trainer);
    }
  });

  return trainers;
};

const createDivisions = (data: any) => {
  const tempDivisions: Divisions[] = [];

  DivsionData.forEach((el) => {
    tempDivisions.push({
      division: el,
      participants: findTrainersInDivisions(el.division, data),
    });
  });

  return tempDivisions;
};

export const Divisions: React.FC<DivisionsProps> = () => {
  const [division, setDivisions] = useState<Divisions[]>([]);

  useEffect(() => {
    let data = JSON.parse(JSON.stringify(TrainerData));
    data.sort(sortByValue("team"));

    setDivisions(createDivisions(data));
  }, []);

  return (
    <div>
      <h1>Divisons</h1>

      <div className="rooster-divisions-container">
        {division.map((divi) => {
          return (
            <div
              key={divi.division.header}
              className="rooster-division"
              style={{
                background: divi.division.background,
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: divi.division["border-color"],
              }}
            >
              <h2>{divi.division.header}</h2>
              <div className="rooster-teams">
                {divi.participants.map(
                  (trainer: TrainerInterface, idx: number) => {
                    return <Trainer key={idx} trainer={trainer} index={idx} />;
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
