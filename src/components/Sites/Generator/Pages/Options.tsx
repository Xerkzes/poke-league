import React, { useState } from "react";
import { Generation } from "./Options/Generation";
import { Type } from "./Options/Type";
import { NfeFe } from "./Options/NfeFe";
import { Form } from "./Options/Form";
import { Amount } from "./Options/Amount";
import { Custom } from "./Options/Custom";
import GeneratorBtnJson from "../../../../Data/GeneratorBtn.json";

import {
  iGeneration,
  iType,
  iForm,
  iCustomOptions,
} from "../../../../Interfaces/interface";
import {
  generateGenerationsFromJson,
  generateTypeCriteriaFromJson,
  generateTypesFromJson,
  generateNfeFeFromJson,
  generateFormsFromJson,
  generateCustomAmountFromJson,
} from "../../../../Utilities";

interface OptionsProps {
  generations: iGeneration[];
  setGenerations: React.Dispatch<React.SetStateAction<iGeneration[]>>;
  typeCriteria: string;
  setTypeCriteria: React.Dispatch<React.SetStateAction<string>>;
  types: iType[];
  setTypes: React.Dispatch<React.SetStateAction<iType[]>>;
  nfeFe: boolean[];
  setNfeFe: React.Dispatch<React.SetStateAction<boolean[]>>;
  forms: iForm[];
  setForms: React.Dispatch<React.SetStateAction<iForm[]>>;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  customAmount: iCustomOptions[];
  setCustomAmount: React.Dispatch<React.SetStateAction<iCustomOptions[]>>;
}

export const Options: React.FC<OptionsProps> = ({
  generations,
  setGenerations,
  typeCriteria,
  setTypeCriteria,
  types,
  setTypes,
  nfeFe,
  setNfeFe,
  forms,
  setForms,
  amount,
  setAmount,
  customAmount,
  setCustomAmount,
}) => {
  return (
    <div className="text-center option-container">
      <Generation generations={generations} setGenerations={setGenerations} />
      <Type
        typeCriteria={typeCriteria}
        setTypeCriteria={setTypeCriteria}
        types={types}
        setTypes={setTypes}
      />
      <NfeFe nfeFe={nfeFe} setNfeFe={setNfeFe} />
      <Form forms={forms} setForms={setForms} />
      <Amount
        amount={amount}
        setAmount={setAmount}
        typeCriteria={typeCriteria}
      />
      <Custom customAmount={customAmount} setCustomAmount={setCustomAmount} />
    </div>
  );
};
