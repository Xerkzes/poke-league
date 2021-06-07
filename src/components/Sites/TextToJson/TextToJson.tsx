import React, { useState } from "react";
import { Week } from "./Types/Week";
import { Trainer } from "./Types/Trainer";
import classNames from "classnames";

interface TextToJsonProps {}

// Tab
interface Tab {
  name: string;
  filter: string;
}
const tabs: Tab[] = [
  { name: "Week", filter: "week" },
  { name: "Trainer", filter: "trainer" },
];

export const TextToJson: React.FC<TextToJsonProps> = () => {
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);

  return (
    <div>
      <h1 className="text-3xl text-center my-4">Text to JSON</h1>

      <div className="my-4 mx-5 ">
        <nav
          className="relative z-0 rounded-lg overflow-hidden 
          shadow flex divide-x divide-gray-800 border-2 border-gray"
        >
          {tabs.map((tab) => {
            return (
              <div
                onClick={() => setActiveComponent(tab)}
                key={tab.name}
                style={{
                  fontFamily: '"Roboto", sans-serif',
                }}
                className={classNames(
                  tab.name === activeComponent.name
                    ? "text-gray-100"
                    : "text-gray-300 hover:text-gray-100",
                  "cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-gray-800 py-4 px-4 text-sm font-medium hover:bg-gray-700 focus:z-10"
                )}
              >
                <div className="flex items-center justify-center space-x-4">
                  {/* <tab.icon className="block h-6 w-6" aria-hidden="true" /> */}
                  <div className="">{tab.name}</div>
                </div>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.name === activeComponent.name ? "bg-red-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-1.5"
                  )}
                />
              </div>
            );
          })}
        </nav>
      </div>

      {activeComponent.filter === "week" && <Week />}
      {activeComponent.filter === "trainer" && <Trainer />}
    </div>
  );
};
