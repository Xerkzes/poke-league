import React from "react";
import { useState } from "react";

interface DraftLeagueProps {}

export const DraftLeague: React.FC<DraftLeagueProps> = ({}) => {
  const [loadIframe, setLoadIfram] = useState<boolean>(true);

  return (
    <div>
      <h1>Draft League</h1>

      {loadIframe && (
        <div
          className="pokemon-cards-loader"
          style={{ display: loadIframe ? "block" : "none" }}
        ></div>
      )}

      <iframe
        src="https://challonge.com/ayr4jge7/module"
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="auto"
        style={{ display: loadIframe ? "none" : "block" }}
        onLoad={() => setLoadIfram(false)}
      ></iframe>
    </div>
  );
};
