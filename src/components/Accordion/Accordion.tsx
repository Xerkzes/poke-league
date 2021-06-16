import React, { useState } from "react";

interface AccordionProps {
  header: string;
  content: JSX.Element[] | JSX.Element;
}

export const Accordion: React.FC<AccordionProps> = ({ header, content }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const headerWasClicked = () => {
    setExpanded(!expanded);
    setContentLoaded(true);
  };

  return (
    // header
    <div
      className={"trainer-container" + (expanded ? " trainer-container-expanded" : "")}
      style={
        expanded
          ? {}
          : {
              borderBottom: "0.3px solid rgba(0, 0, 0, 0.4)",
            }
      }
    >
      <div className="trainer-header cursor-pointer" onClick={() => headerWasClicked()}>
        <p className="trainer-title">{header}</p>
        <p className={expanded ? "trainer-carrot-up" : "trainer-carrot-down"}>&#9660;</p>
      </div>

      {/* content */}
      <div
        className={"trainer-content" + (expanded ? " trainer-content-expanded" : "")}
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
        <div className={"trainer-pokemons" + (expanded ? " trainer-pokemons-expanded" : "")}>
          {contentLoaded && <>{content}</>}
        </div>
      </div>
    </div>
  );
};
