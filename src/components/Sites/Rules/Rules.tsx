import React from "react";
import RuleSet from "../../../Data/RuleSets.json";

interface RulesProps {}

export const Rules: React.FC<RulesProps> = ({}) => {
  return (
    <div>
      <h1>{RuleSet.header}</h1>

      <ol>
        {RuleSet.rules.map((rule, idx: number) => {
          return (
            <li
              key={idx}
              className="md:list-decimal text-xl mb-3 p-2 text-black"
              style={{ backgroundColor: "rgb(243, 195, 195)" }}
            >
              <p>
                <span className="font-bold underline">{rule.clause}:</span>{" "}
                {rule.rule}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
