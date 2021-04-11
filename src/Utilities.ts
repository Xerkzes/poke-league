import {
  iBtn,
  iGeneration,
  iType,
  iForm,
  iCustomOptions,
  PokemonDataInterface,
} from "./Interfaces/interface"


// capitalize the first letter
export const capitalizeFirstLetter = (name: string) => {
  return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
};

// create the path to the pokemon-image
export const createImgUrl = (pokeData: PokemonDataInterface) => {
  const suffix =
  pokeData.spriteSuffix === undefined ? "" : pokeData.spriteSuffix;
return "sprites/normal/" + pokeData.dexNr + suffix + ".png";
}

// return array of types from a pokemon
export const createTypeArray = (pokeData: PokemonDataInterface) => {
  const typeArray: string[] = [];

  pokeData.types.forEach((type: string) => {
    typeArray.push(type);
  })

  return typeArray;
}

// sort array by value
export const sortByValue = (prop: any) => {
  return function (a: any, b: any) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
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
  const array: boolean[] = [];

  temp[0].buttons.forEach((btn: iBtn) => {
    array.push(btn.active)
  })

  return array;
}

export const generateFormsFromJson = (JsonFile: any) => {
  const forms: iForm[] = [];
  
  JsonFile.filter((el: any) => el.id === "form").forEach((el: any) => {
    el.buttons.forEach((btn: any) => {
      forms.push({ form: btn.name, active: btn.active, searchCriteria: btn.searchCriteria });
    });
  });

  return forms;
}

export const generateCustomAmountFromJson = (JsonFile: any) => {
  const customOptions: iCustomOptions[] = [];

  JsonFile.filter((el: any) => el.id === "custom option").forEach((el: any) => {
    el.buttons.forEach((btn: any) => {
      customOptions.push({
        btnName: btn.name,
        active: btn.active,
        amount: 1,
        criteria: btn.criteria
      });
    });
  });

  return customOptions;
}


// Function that checks if the pokemon is qualified 
export const isAlive = (
  pokemon: PokemonDataInterface,
  generation: iGeneration[],
  typeCriteria: string,
  types: iType[],
  nfeFe: boolean[],
  forms: iForm[]
) => {
  return (
    inGeneration(pokemon, generation) &&
    inType(pokemon, types, typeCriteria) &&
    inNfeFe(pokemon, nfeFe) &&
    inUber(pokemon, nfeFe[2]) &&
    inForms(pokemon, forms)
  );
};

const inGeneration = (
  pokemon: PokemonDataInterface,
  generation: iGeneration[]
) => {
  let isIn = false;

  generation.forEach((gen: iGeneration) => {
    if (gen.active && gen.generation === pokemon.generation) {
      isIn = true;
      return;
    }
  });

  return isIn;
};

const inType = (pokemon: PokemonDataInterface, types: iType[], typeCriteria: string) => {
  if (typeCriteria.toLocaleLowerCase() === "One Type Each".toLocaleLowerCase()) return true;

  let isIn = false;

  types.forEach((type: iType) => {
    pokemon.types.forEach((pokeType: string) => {
      if (type.active && type.type.toLocaleLowerCase() === pokeType.toLowerCase()) {
        isIn = true;
        return;
      }
    });
  });

  return isIn;
};

const inNfeFe = (pokemon: PokemonDataInterface, nfeFe: boolean[]) => {
  return ((pokemon.isNfe && nfeFe[0]) || (!pokemon.isNfe && nfeFe[1]));
};

const inUber = (pokemon: PokemonDataInterface, uber: boolean) => {
  if (pokemon.isUber && !uber) return false;
  return true;
};

const inForms = (pokemon: PokemonDataInterface, forms: iForm[]) => {
  let isIn = true;

  forms.forEach((form: iForm) => {
    if (
      !form.active &&
      pokemon.name.toLowerCase().includes(form.searchCriteria.toLocaleLowerCase())
    ) {
      isIn = false;
      return;
    }
  });

  return isIn;
};