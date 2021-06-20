import React from "react";

interface DraftLeagueProps {}

export const DraftLeague: React.FC<DraftLeagueProps> = ({}) => {
  return (
    <div>
      <h1>Draft League</h1>

      <iframe
        src="https://challonge.com/ayr4jge7/module"
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="auto"
      ></iframe>
    </div>
  );
};
