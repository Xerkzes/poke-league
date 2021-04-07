import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";
import { iGeneration } from "../../../../../Interfaces/interface";

interface GenerationProps {
  generations: iGeneration[];
  setGenerations: React.Dispatch<React.SetStateAction<iGeneration[]>>;
}

interface GenBtn extends iGeneration {
  name: string;
  backgroundStyle: string;
}

export const Generation: React.FC<GenerationProps> = ({
  generations,
  setGenerations,
}) => {
  const updateButton = (btn: iGeneration) => {
    setGenerations(
      generations.map((item: iGeneration) => {
        return item.generation === btn.generation
          ? { ...item, active: !item.active }
          : item;
      })
    );
  };

  return (
    <>
      {GeneratorBtnJson.filter((el) => el.id === "generation").map(
        (el: any) => {
          return (
            <div key={el.id} className="option-content">
              <h2>{el.header}</h2>

              {el.buttons.map((btn: GenBtn, idx: number) => {
                return (
                  <button
                    key={btn.name}
                    onClick={() => updateButton(btn)}
                    className={
                      "generator-btn " +
                      (generations[idx].active
                        ? "generator-btn-active"
                        : "generator-btn-inactive")
                    }
                    style={{
                      background: btn.backgroundStyle,
                      color: "black",
                    }}
                  >
                    {btn.name}
                  </button>
                );
              })}
            </div>
          );
        }
      )}
    </>
  );
};
