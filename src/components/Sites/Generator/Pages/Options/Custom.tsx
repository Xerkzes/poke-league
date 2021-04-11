import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";
import { iBtn, iCustomOptions } from "../../../../../Interfaces/interface";

interface CustomProps {
  customAmount: iCustomOptions[];
  setCustomAmount: React.Dispatch<React.SetStateAction<iCustomOptions[]>>;
}

export const Custom: React.FC<CustomProps> = ({
  customAmount,
  setCustomAmount,
}) => {
  const updateButton = (btn: iBtn) => {
    setCustomAmount(
      customAmount.map((item: iCustomOptions) => {
        return item.btnName === btn.name
          ? { ...item, active: !item.active }
          : item;
      })
    );
  };

  const updateAmount = (btn: iBtn, value: number) => {
    setCustomAmount(
      customAmount.map((item: iCustomOptions) => {
        return item.btnName === btn.name ? { ...item, amount: value } : item;
      })
    );
  };

  return (
    <>
      {GeneratorBtnJson.filter((el) => el.id === "custom option").map(
        (el: any) => {
          return (
            <div key={el.id} className="option-content">
              <h2>{el.header}</h2>

              {el.buttons.map((btn: iBtn, idx: number) => {
                return (
                  <div key={btn.name}>
                    <button
                      onClick={() => updateButton(btn)}
                      className={
                        "generator-btn " +
                        (customAmount[idx].active
                          ? "generator-btn-active"
                          : "generator-btn-inactive")
                      }
                    >
                      {btn.name}
                    </button>
                    <select
                      className="text-2xl ml-4"
                      style={{ width: "3.5rem", transform: "translateY(5px)" }}
                      name="amount"
                      id="amount"
                      disabled={!customAmount[idx].active}
                      value={customAmount[idx].amount}
                      onChange={(selectedValue) =>
                        updateAmount(btn, +selectedValue.target.value)
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>
                );
              })}
            </div>
          );
        }
      )}
    </>
  );
};
