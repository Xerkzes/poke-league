import {
  iGeneration,
  iType,
  iForm,
  iCustomOptions,
} from "./Interfaces/interface"

// capitalize the first letter
export const capitalizeFirstLetter = (name: string) => {
  return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};

/* =========
  Generat Options for Random Pokemon Generator
  =========*/
export const generateGenerationsFromJson = (JsonFile: any) => {
  const gen: iGeneration[] = [];

  JsonFile.filter((el: any) => el.id === "generation").forEach((el: any) => {
    el.buttons.forEach((btn: any) => {
      gen.push({ generation: btn.generation, active: btn.active });
    });
  });

  return gen;
}

export const generateTypeCriteriaFromJson = (JsonFile: any) => {
  let temp: any = JsonFile.filter((el: any) => el.id === "type");

  const typeCriteria: string = temp[0].buttons.choices[0].active
    ? "one type each"
    : "custom";

    return typeCriteria;
}

export const generateTypesFromJson = (JsonFile: any) => {
  const type: iType[] = [];

  JsonFile.filter((el: any) => el.id === "type").forEach((el: any) => {
    el.buttons.types.typeBtn.forEach((btn: any) => {
      type.push({ type: btn.name, active: btn.active });
    });
  });

  return type;
}

export const generateNfeFeFromJson = (JsonFile: any) => {
  const temp = JsonFile.filter((el: any) => el.id === "nfe / fe");
  const nfe = temp[0].buttons[0].active;
  const fe = temp[0].buttons[1].active;

  return [nfe, fe];
}

export const generateFormsFromJson = (JsonFile: any) => {
  const forms: iForm[] = [];
  
  JsonFile.filter((el: any) => el.id === "form").forEach((el: any) => {
    el.buttons.forEach((btn: any) => {
      forms.push({ form: btn.name, active: btn.active });
    });
  });

  return forms;
}

export const generateCustomAmountFromJson = (JsonFile: any) => {
  const customOptions: iCustomOptions[] = [];

  JsonFile.filter((el: any) => el.id === "custom option").forEach((el: any) => {
    el.buttons.forEach((btn: any) => {
      customOptions.push({
        criteria: btn.name,
        active: btn.active,
        amount: 0,
      });
    });
  });

  return customOptions;
}