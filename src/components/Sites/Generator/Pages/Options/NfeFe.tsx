import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";
import { iBtn } from "../../../../../Interfaces/interface";

interface NfeFeProps {
  nfeFe: boolean[];
  setNfeFe: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const NfeFe: React.FC<NfeFeProps> = ({ nfeFe, setNfeFe }) => {
  const updateButton = (index: number) => {
    setNfeFe(
      nfeFe.map((item: boolean, idx: number) => {
        return index === idx ? !item : item;
      })
    );
  };

  return (
    <>
      {GeneratorBtnJson.filter((el) => el.id === "nfe / fe").map((el: any) => {
        return (
          <div key={el.id} className="option-content">
            <h2>{el.header}</h2>

            {el.buttons.map((btn: iBtn, idx: number) => {
              return (
                <button
                  key={btn.name}
                  onClick={() => updateButton(idx)}
                  className={
                    "generator-btn " +
                    (nfeFe[idx]
                      ? "generator-btn-active"
                      : "generator-btn-inactive")
                  }
                >
                  {btn.name}
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
