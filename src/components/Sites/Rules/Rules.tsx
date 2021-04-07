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
            <li key={idx} className="list-decimal text-xl mb-3 p-2 bg-gray-200">
              <p>
                <span className="font-bold">{rule.clause}:</span> {rule.rule}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
