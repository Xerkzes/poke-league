import classNames from "classnames";
import React, { useState } from "react";

interface GeneratorProps {}
interface Tab {
  name: string;
  component: JSX.Element;
}

const optionComponent = () => {
  return (
    <div className="text-center">
      <h2>Options</h2>
    </div>
  );
};

const cardsComponent = () => {
  return (
    <div className="text-center">
      <h2>Cards</h2>
    </div>
  );
};

const generatorComponent = () => {
  return (
    <div className="text-center">
      <h2>Generator</h2>
      <div></div>
    </div>
  );
};

export const Generator: React.FC<GeneratorProps> = () => {
  const tabs: Tab[] = [
    { name: "Options", component: optionComponent() },
    { name: "Cards", component: cardsComponent() },
    { name: "Generate", component: generatorComponent() },
  ];

  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);

  const updateActiveComponent = (tab: Tab) => {
    setActiveComponent(tab);
  };

  return (
    <div>
      <h1>Rando-Poké-Generator</h1>

      {/* navigation */}
      <div className="max-w-7xl mx-auto my-4 px-2 sm:px-6 lg:px-8">
        <nav
          className="relative z-0 rounded-lg overflow-hidden 
          shadow flex divide-x divide-gray-800 border-2 border-gray"
        >
          {tabs.map((tab, tabIdx, list) => {
            return (
              <div
                onClick={() => updateActiveComponent(tab)}
                key={tab.name}
                style={{
                  fontFamily: '"Roboto", sans-serif',
                }}
                className={classNames(
                  tab.name === activeComponent.name
                    ? "text-gray-100"
                    : "text-gray-400 hover:text-gray-300",
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
                    tab.name === activeComponent.name
                      ? "bg-red-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-1.5"
                  )}
                />
              </div>
            );
          })}
        </nav>
      </div>

      {/* display of settings */}
      <div>{activeComponent.component}</div>
    </div>
  );
};
