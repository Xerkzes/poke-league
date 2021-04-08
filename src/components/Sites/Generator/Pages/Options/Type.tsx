import React from "react";
import GeneratorBtnJson from "../../../../../Data/GeneratorBtn.json";
import TypeColor from "../../../../../Data/TypeColor";
import { iType, iBtn, iHeaderBtn } from "../../../../../Interfaces/interface";
import { capitalizeFirstLetter } from "../../../../../Utilities";

interface TypeProps {
  typeCriteria: string;
  setTypeCriteria: React.Dispatch<React.SetStateAction<string>>;
  types: iType[];
  setTypes: React.Dispatch<React.SetStateAction<iType[]>>;
}

// interface Type {
//   id: string;
//   header: string;
//   buttons: {
//     choices: Btn[];
//     types: {
//       headerBtn: HeaderBtn[];
//       typeBtn: Btn[];
//     };
//   };
// }

export const Type: React.FC<TypeProps> = ({
  typeCriteria,
  setTypeCriteria,
  types,
  setTypes,
}) => {
  const updateHeaderTypes = (btn: iHeaderBtn) => {
    setTypeCriteria(btn.name);
  };

  const updateType = (btn: iBtn) => {
    setTypes(
      types.map((item: iType) => {
        return item.type.toLocaleLowerCase() === btn.name.toLocaleLowerCase()
          ? { ...item, active: !item.active }
          : item;
      })
    );
  };

  const allOrNothing = (btn: iHeaderBtn) => {
    switch (btn.name.toLocaleLowerCase()) {
      case "all": {
        setTypes(
          types.map((item: iType) => {
            return { ...item, active: true };
          })
        );
        break;
      }
      case "none": {
        setTypes(
          types.map((item: iType) => {
            return { ...item, active: false };
          })
        );
        break;
      }
    }
  };

  return (
    <>
      {GeneratorBtnJson.filter((el) => el.id === "type").map((el: any) => {
        return (
          <div key={el.id} className="option-content">
            <h2>{el.header}</h2>

            {/* Choice between all from one type or custom */}
            {el.buttons.choices.map((btn: iBtn) => {
              return (
                <button
                  key={btn.name}
                  onClick={() => updateHeaderTypes(btn)}
                  className={
                    "generator-btn " +
                    (typeCriteria.toLocaleLowerCase() ===
                    btn.name.toLocaleLowerCase()
                      ? "generator-btn-active"
                      : "generator-btn-inactive")
                  }
                >
                  {btn.name}
                </button>
              );
            })}

            {/* show types when custom-btn is active */}
            {typeCriteria.toLocaleLowerCase() === "custom" && (
              <div>
                <div className="mt-5 mb-2">
                  {/* all / none */}
                  {el.buttons.types.headerBtn.map((btn: iHeaderBtn) => {
                    return (
                      <button
                        key={btn.name}
                        onClick={() => allOrNothing(btn)}
                        className="generator-btn btn-click-down-up"
                        style={{
                          background: "rgb(100, 100, 100)",
                        }}
                      >
                        {btn.name}
                      </button>
                    );
                  })}
                </div>

                <div>
                  {/* types */}
                  {el.buttons.types.typeBtn.map((btn: iBtn, idx: number) => {
                    return (
                      <button
                        key={btn.name}
                        onClick={() => updateType(btn)}
                        className={
                          "generator-btn " +
                          (types[idx].active
                            ? "generator-btn-active"
                            : "generator-btn-inactive")
                        }
                        style={{
                          background: TypeColor[btn.name],
                        }}
                      >
                        {capitalizeFirstLetter(btn.name)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
