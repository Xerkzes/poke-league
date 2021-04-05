import React, { useState } from "react";
import {
  LeagueInterface,
  LeagueExpandedInterface,
  MatchInterface,
} from "../../../Interfaces/interface";

interface CardProps {
  matchData: LeagueInterface;
  matchesData: LeagueExpandedInterface[];
  setMatches: React.Dispatch<React.SetStateAction<LeagueExpandedInterface[]>>;
  index: number;
}

export const Card: React.FC<CardProps> = ({
  matchData,
  matchesData,
  setMatches,
  index,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const headerWasClicked = () => {
    setExpanded(!expanded);
    setContentLoaded(true);

    const newArray = [...matchesData];
    newArray[index].expanded = !expanded;
    setMatches(newArray);
  };

  return (
    // header
    <div
      className={
        "trainer-container" + (expanded ? " trainer-container-expanded" : "")
      }
      style={
        matchesData[index]?.expanded
          ? {}
          : matchesData[index + 1]?.expanded || index + 1 === matchesData.length
          ? { borderBottom: "none" }
          : {
              borderBottom: "0.3px solid rgba(0, 0, 0, 0.4)",
            }
      }
    >
      <div className="trainer-header" onClick={() => headerWasClicked()}>
        <p>{matchData.header}</p>
        <p className={expanded ? "trainer-carrot-up" : "trainer-carrot-down"}>
          v
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
          {contentLoaded &&
            matchData.matches.map((match: MatchInterface) => {
              return (
                <div key={match.name1 + match.name2} className="match">
                  <p
                    className={
                      "team team-left " +
                      (match.winner === ""
                        ? ""
                        : match.winner === match.name1
                        ? "match-won"
                        : "match-lost")
                    }
                  >
                    {match.name1}
                  </p>
                  <p className="vs">-</p>
                  <p
                    className={
                      "team " +
                      (match.winner === ""
                        ? ""
                        : match.winner === match.name2
                        ? "match-won"
                        : "match-lost")
                    }
                  >
                    {match.name2}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
