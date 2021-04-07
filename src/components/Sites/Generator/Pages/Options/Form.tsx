import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";
import { iForm, iBtn } from "../../../../../Interfaces/interface";

interface FormProps {
  forms: iForm[];
  setForms: React.Dispatch<React.SetStateAction<iForm[]>>;
}

export const Form: React.FC<FormProps> = ({ forms, setForms }) => {
  const updateButton = (btn: iBtn) => {
    setForms(
      forms.map((item: iForm) => {
        return item.form === btn.name
          ? { ...item, active: !item.active }
          : item;
      })
    );
  };

  return (
    <>
      {GeneratorBtnJson.filter((el) => el.id === "form").map((el: any) => {
        return (
          <div key={el.id} className="option-content">
            <h2>{el.header}</h2>

            {el.buttons.map((btn: iBtn, idx: number) => {
              return (
                <button
                  key={btn.name}
                  onClick={() => updateButton(btn)}
                  className={
                    "generator-btn " +
                    (forms[idx].active
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
