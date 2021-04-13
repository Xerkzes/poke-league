export interface PokemonDataInterface {
  dexNr: number;
  generation: number;
  name: string;
  color: string;
  isNfe: boolean;
  isUber: boolean;
  isForm: boolean;
  types: string[];
  spriteSuffix?: string | undefined;
}

export interface PokemonTypeCardDataInterface {
  type: string;
  pokemon: PokemonDataInterface;
}

export interface TrainerPokemonInterface {
  type: string;
  name: string;
}

export interface TrainerInterface {
  name: string;
  imgUrl: string;
  team: number;
  division: string;
  pokemons: TrainerPokemonInterface[];
}

export interface MatchInterface {
  name1: string;
  name2: string;
  winner: string;
}

export interface LeagueInterface {
  header: string;
  matches: MatchInterface[];
}

export interface PokemonCardAllTypes {
  pokemon: PokemonDataInterface;
  type: string;
}

export interface Division {
  division: string;
  header: string;
  background: string;
  "border-color": string;
}


export interface TrainerExpandedInterface extends TrainerInterface {
  expanded: boolean;
}

export interface LeagueExpandedInterface extends LeagueInterface {
  expanded: boolean;
}

// Generator-Options
export interface iBtn {
  name: string;
  active: boolean
}

export interface iHeaderBtn {
  name: string;
}

export interface iGeneration {
  generation: number;
  active: boolean;
}

export interface iType {
  type: string;
  active: boolean;
}

export interface iForm {
  form: string;
  active: boolean;
  searchCriteria: string;
}

export interface iCustomOptions {
  btnName: string;
  active: boolean;
  amount: number;
  criteria: string
}

// card
export interface iCard {
  imageUrl: string;
  name: string;
  type: string[];
  active: boolean;
}

// Generator
export interface pokeType {
  criteria: string;
  pokemons: PokemonDataInterface[];
}