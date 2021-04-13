import classNames from "classnames";
import React, { useState } from "react";
import { Options } from "./Pages/Options";
import { Cards } from "./Pages/Cards";
import { Generate } from "./Pages/Generate";
import GeneratorBtnJson from "../../../Data/GeneratorBtn.json";
import {
  iGeneration,
  iType,
  iForm,
  iCustomOptions,
  PokemonDataInterface,
  PokemonTypeCardDataInterface,
} from "../../../Interfaces/interface";
import {
  generateGenerationsFromJson,
  generateTypeCriteriaFromJson,
  generateTypesFromJson,
  generateNfeFeFromJson,
  generateFormsFromJson,
  generateCustomAmountFromJson,
} from "../../../Utilities";

interface GeneratorProps {}
interface Tab {
  name: string;
}

export const Generator: React.FC<GeneratorProps> = ({}) => {
  // Options for random generating of the pokemons
  const [generations, setGenerations] = useState<iGeneration[]>(() =>
    generateGenerationsFromJson(GeneratorBtnJson)
  );
  const [typeCriteria, setTypeCriteria] = useState<string>(() =>
    generateTypeCriteriaFromJson(GeneratorBtnJson)
  );
  const [types, setTypes] = useState<iType[]>(() =>
    generateTypesFromJson(GeneratorBtnJson)
  );
  const [nfeFe, setNfeFe] = useState<boolean[]>(() =>
    generateNfeFeFromJson(GeneratorBtnJson)
  );
  const [forms, setForms] = useState<iForm[]>(() =>
    generateFormsFromJson(GeneratorBtnJson)
  );
  const [amount, setAmount] = useState<number>(6);
  const [customAmount, setCustomAmount] = useState<iCustomOptions[]>(() =>
    generateCustomAmountFromJson(GeneratorBtnJson)
  );

  // active card generation
  const [cardGen, setCardGen] = useState<number>(1);

  // generator cards and errors
  const [pokemons, setPokemons] = useState<PokemonDataInterface[]>([]);
  const [pokemonsTypeCard, setPokemonsTypeCard] = useState<
    PokemonTypeCardDataInterface[]
  >([]);
  const [errorOccured, setErrorOccured] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Tabs
  const tabs: Tab[] = [
    { name: "Options" },
    { name: "Cards" },
    { name: "Generate" },
  ];
  const [activeComponent, setActiveComponent] = useState<Tab>(tabs[0]);

  const updateActiveComponent = (tab: Tab) => {
    setActiveComponent(tab);
  };

  const renderTab = (tabName: string) => {
    switch (tabName) {
      case "Options": {
        return (
          <Options
            generations={generations}
            setGenerations={setGenerations}
            typeCriteria={typeCriteria}
            setTypeCriteria={setTypeCriteria}
            types={types}
            setTypes={setTypes}
            nfeFe={nfeFe}
            setNfeFe={setNfeFe}
            forms={forms}
            setForms={setForms}
            amount={amount}
            setAmount={setAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
          />
        );
      }
      case "Cards": {
        return (
          <Cards
            generations={generations}
            typeCriteria={typeCriteria}
            types={types}
            nfeFe={nfeFe}
            forms={forms}
            cardGen={cardGen}
            setCardGen={setCardGen}
          />
        );
      }
      case "Generate": {
        return (
          <Generate
            generations={generations}
            typeCriteria={typeCriteria}
            types={types}
            nfeFe={nfeFe}
            forms={forms}
            amount={amount}
            customAmount={customAmount}
            pokemons={pokemons}
            pokemonsTypeCard={pokemonsTypeCard}
            errorOccured={errorOccured}
            errors={errors}
            setPokemons={setPokemons}
            setPokemonsTypeCard={setPokemonsTypeCard}
            setErrorOccured={setErrorOccured}
            setErrors={setErrors}
          />
        );
      }
    }
  };

  return (
    <div>
      <h1>Rando-Poké-Generator</h1>

      {/* navigation */}
      <div className="my-4 ">
        <nav
          className="relative z-0 rounded-lg overflow-hidden 
          shadow flex divide-x divide-gray-800 border-2 border-gray"
        >
          {tabs.map((tab, tabIdx) => {
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
      <div>{renderTab(activeComponent.name)}</div>
    </div>
  );
};
