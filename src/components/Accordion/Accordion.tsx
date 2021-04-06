import React, { useState } from "react";

interface AccordionProps {
  array: any[];
  setArray: React.Dispatch<React.SetStateAction<any[]>>;
  header: string;
  content: JSX.Element[];
  index: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  array,
  setArray,
  header,
  content,
  index,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const headerWasClicked = () => {
    setExpanded(!expanded);
    setContentLoaded(true);

    const newArray = [...array];
    newArray[index].expanded = !expanded;
    setArray(newArray);
  };

  return (
    // header
    <div
      className={
        "trainer-container" + (expanded ? " trainer-container-expanded" : "")
      }
      style={
        array[index]?.expanded
          ? {}
          : array[index + 1]?.expanded || index + 1 === array.length
          ? { borderBottom: "none" }
          : {
              borderBottom: "0.3px solid rgba(0, 0, 0, 0.4)",
            }
      }
    >
      <div className="trainer-header" onClick={() => headerWasClicked()}>
        <p>{header}</p>
        <p className={expanded ? "trainer-carrot-up" : "trainer-carrot-down"}>
          &#9660;
        </p>
      </div>

      {/* content */}
      <div
        className={
          "trainer-content" + (expanded ? " trainer-content-expanded" : "")
        }
        style={
          expanded
            ? {
                maxHeight: "100rem",
              }
            : {
                maxHeight: "0rem",
              }
        }
      >
        <div
          className={
            "trainer-pokemons" + (expanded ? " trainer-pokemons-expanded" : "")
          }
        >
          {contentLoaded && <>{content}</>}
        </div>
      </div>
    </div>
  );
};
