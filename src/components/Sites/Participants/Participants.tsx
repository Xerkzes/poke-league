import React, { useEffect, useState } from "react";
import TrainerData from "../../../Data/TrainerData.json";
import { Trainer } from "./Trainer/Trainer";
import { TrainerExpandedInterface } from "../../../Interfaces/interface";

interface ParticipantsProps {}

export const Participants: React.FC<ParticipantsProps> = () => {
  const [trainers, setTrainers] = useState<TrainerExpandedInterface[]>([]);

  useEffect(() => {
    TrainerData.forEach((trainer) => {
      const expandTrainer: TrainerExpandedInterface = {
        ...trainer,
        expanded: false,
      };

      setTrainers((trainers) => [...trainers, expandTrainer]);
    });
  }, []);

  return (
    <div className="participants-container">
      <h1>Participants</h1>

      <div className="participants-participants">
        {TrainerData.map((trainer, idx) => {
          return (
            <Trainer
              key={trainer.name}
              trainer={trainer}
              trainers={trainers}
              setTrainers={setTrainers}
              idx={idx}
            />
          );
        })}
      </div>
    </div>
  );
};
