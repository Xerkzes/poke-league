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


export interface TrainerExpandedInterface extends TrainerInterface {
  expanded: boolean;
}

export interface LeagueExpandedInterface extends LeagueInterface {
  expanded: boolean;
}