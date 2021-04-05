import React, { useEffect, useState } from "react";
import TrainerData from "../../../Data/TrainerData.json";
import { TrainerInterface } from "../../../Interfaces/interface";
import { Trainer } from "./Trainer";

function sortByValue(prop: any) {
  return function (a: any, b: any) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

interface DivisionsProps {}

interface Division {
  array: TrainerInterface[];
  name: string;
  pushArray: React.Dispatch<React.SetStateAction<TrainerInterface[]>>;
}

export const Divisions: React.FC<DivisionsProps> = () => {
  const [red, setRed] = useState<TrainerInterface[]>([]);
  const [blue, setBlue] = useState<TrainerInterface[]>([]);
  const [green, setGreen] = useState<TrainerInterface[]>([]);
  const [yellow, setYellow] = useState<TrainerInterface[]>([]);

  const divisions: Array<Division> = [
    { array: red, name: "Red", pushArray: setRed },
    { array: blue, name: "Blue", pushArray: setBlue },
    { array: green, name: "Green", pushArray: setGreen },
    { array: yellow, name: "Yellow", pushArray: setYellow },
  ];

  useEffect(() => {
    // sort Array by ASC of the team-number
    let data = JSON.parse(JSON.stringify(TrainerData));
    data.sort(sortByValue("team"));
    // TrainerData.sort(sortByValue("team"));

    // puts the trainer into the their rooster
    data.forEach((trainer: TrainerInterface) => {
      divisions.forEach((obj) => {
        if (obj.name.toLocaleLowerCase() === trainer.division)
          obj.pushArray((oldArray) => [...oldArray, trainer]);
      });
    });
  }, []);

  return (
    <div>
      <h1>Divisions</h1>

      <div className="rooster-divisions-container">
        {divisions.map((obj, idx) => {
          return (
            <div
              key={idx}
              className={
                "rooster-division rooster-divison-" + obj.name.toLowerCase()
              }
            >
              <h2>{obj.name} Division</h2>
              <div className="rooster-teams">
                {obj.array.map((trainer, idx) => {
                  return <Trainer key={idx} trainer={trainer} index={idx} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
