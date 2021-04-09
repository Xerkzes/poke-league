import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";

interface AmountProps {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  typeCriteria: string;
}

export const Amount: React.FC<AmountProps> = ({
  amount,
  setAmount,
  typeCriteria,
}) => {
  const updateAmount = (increase: number) => {
    if (amount + increase <= 12 && amount + increase >= 1)
      setAmount(amount + increase);
  };

  return (
    <>
      {typeCriteria.toLocaleLowerCase() === "custom" &&
        GeneratorBtnJson.filter((el: any) => el.id === "amount").map(
          (el: any) => {
            return (
              <div key={el.id} className="option-content">
                <h2>{el.header}</h2>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => updateAmount(-1)}
                    className="generator-btn btn-click-down-up"
                    style={{ minWidth: "100px" }}
                  >
                    {el.buttons[0].name}
                  </button>

                  <p
                    className="text-5xl w-24 text-red-600"
                    style={{ fontFamily: "Roboto, arial" }}
                  >
                    {amount}
                  </p>

                  <button
                    onClick={() => updateAmount(1)}
                    className="generator-btn btn-click-down-up"
                    style={{ minWidth: "100px" }}
                  >
                    {el.buttons[1].name}
                  </button>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
