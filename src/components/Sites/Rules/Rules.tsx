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
              className="text-xl mb-5 p-2 text-black border-l-8 shadow-md"
              style={{
                backgroundColor: "rgb(243, 195, 195)",
                borderColor: "rgb(239, 68, 68)",
              }}
            >
              <p>
                {rule?.clause != "" && (
                  <span className="font-bold underline">{rule.clause}:</span>
                )}{" "}
                {rule.rule}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
