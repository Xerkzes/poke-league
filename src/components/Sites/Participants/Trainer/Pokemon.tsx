import React, { useEffect, useState } from "react";
import { PokemonDataInterface } from "../../../../Interfaces/interface";
import TypeColors from "../../../../Data/TypeColor";
import AllPokemonData from "../../../../Data/Pokemons.json";

interface PokemonProps {
  pokemon: {
    type: string;
    name: string;
    zMove?: boolean | undefined;
  };
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadPokemons() {
      // get Data from the specific Pokemon
      const pokemonData = AllPokemonData.filter((data: PokemonDataInterface) => {
        if (data.name === pokemon.name) {
          return data;
        }
      });

      // set Sprite Url
      const suffix = pokemonData[0]?.spriteSuffix === undefined ? "" : pokemonData[0].spriteSuffix;
      setImgUrl("sprites/normal/" + pokemonData[0]?.dexNr + suffix + ".png");
    }
    loadPokemons();
  }, []);

  return (
    <div className="trainer-pokemon">
      <div
        style={{ backgroundColor: TypeColors[pokemon.type.toLowerCase()] }}
        className="trainer-pokemon-type"
      >
        {pokemon.type}
      </div>
      <img
        className="trainer-pokemon-img"
        style={imgLoaded ? {} : { visibility: "hidden" }}
        src={imgUrl}
        onLoad={() => setImgLoaded(true)}
        alt="img"
      />
      <div className="trainer-pokemon-name">
        {pokemon.name}
        {pokemon.zMove ? " (z-move)" : null}
      </div>
    </div>
  );
};
