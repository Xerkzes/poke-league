import TrainerData from "../../../../Data/TrainerData.json";
import TypeColor from "../../../../Data/TypeColor";

export interface Match {
  trainer1: string;
  trainer2: string;
  winner: string;
}

export interface Schedule {
  header: string;
  matches: Match[];
}

interface Pokemon {
  name: string;
}

interface Trainer {
  name: string;
  pokemons: Pokemon[];
}

interface DataTrainer {
  name: string;
  pokemons: TrainerPokemon[];
}

interface TrainerPokemon {
  type: string;
  name: string;
}

interface DifferentsInPokemon {
  type: string;
  oldPokemon: string;
  newPokemon: string;
}

interface Differents {
  trainer: string;
  pokemons?: DifferentsInPokemon[];
  message?: string;
}

// ===========================================
// Week
// ===========================================
export const convertWeekText = (
  initialText: string,
  setConvertedText: React.Dispatch<React.SetStateAction<string>>,
  useTrainerName: boolean = true
) => {
  // transform text into an array with values
  const textInOneLine: string = initialText.replace(/\s/g, " ");
  let textArray: string[] = textInOneLine.split(" ");
  textArray = removeSpaceFromArray(textArray);

  // create Schedule with all the data
  const scheduleContent: Schedule = createSchedule(textArray, useTrainerName);

  // create Json Text for copy paste
  const JsonText: string = createMatchJsonText(scheduleContent);

  setConvertedText(JsonText);
};

const createSchedule = (textContent: string[], useTrainerName: boolean): Schedule => {
  // header
  const header: string = getMatchHeader(textContent);

  // matches
  const matches: Match[] = getMatchMatches(textContent, useTrainerName);

  // debug
  //   console.log(header);
  //   console.log(matches);

  return {
    header: header,
    matches: matches,
  } as Schedule;
};

const removeSpaceFromArray = (array: string[]) => {
  const newArray: string[] = [];

  array.forEach((text: string) => {
    if (text != "") newArray.push(text);
  });

  return newArray;
};

const getMatchHeader = (array: string[]): string => {
  let header: string = "";

  for (let i = 0; i < array.length; i++) {
    // we hit the the next step
    if (array[i] === "Team") break;

    // check if text is a number -> no space
    const isNum = /^\d+$/.test(array[i]);
    header += array[i] + (isNum ? "" : " ");
  }

  return header;
};

const getMatchMatches = (array: string[], useTrainerName: boolean): Match[] => {
  let matches: Match[] = [];

  for (let i = 0; i < array.length; i += 1) {
    // get team
    if (array[i].toLowerCase() === "team") {
      let team1: string = "";
      let team2: string = "";

      // use trainer name
      if (useTrainerName) {
        team1 = `"trainer1": "${getTrainerNameFromNumber(array[i + 1])}"`;
        team2 = `"trainer2": "${getTrainerNameFromNumber(array[i + 4])}"`;
      } else {
        // use trainer number
        team1 = `"trainer1": "${array[i + 1]}"`;
        team2 = `"trainer2": "${array[i + 4]}"`;
      }

      matches.push({ trainer1: team1, trainer2: team2, winner: "" });

      // go to the next match pair
      i += 4;
    }
  }

  return matches;
};

const getTrainerNameFromNumber = (teamNr: string): string => {
  return TrainerData.find((trainer: any) => trainer.team === +teamNr).name;
};

const createMatchJsonText = (scheduleContent: Schedule): string => {
  let matchString = "";

  for (let i = 0; i < scheduleContent.matches.length; i++) {
    const match: Match = scheduleContent.matches[i];

    let tempText = `{ ${makeTrainerNameSameLength(match.trainer1)} ${makeTrainerNameSameLength(
      match.trainer2
    )} "winner": "" }`;

    // add space infront
    if (i != 0) {
      tempText = "        " + tempText;
    }

    // add new line
    if (i != scheduleContent.matches.length - 1) {
      tempText += ",\n";
    }

    matchString += tempText;
  }

  const text = `{
    "header":"${scheduleContent.header}",
    "matches": [
        ${matchString}
    ]
}`;

  return text;
};

const makeTrainerNameSameLength = (trainerName: string) => {
  let newName = trainerName + ",";

  if (trainerName.length <= 10) {
    newName += "\t\t\t\t\t\t\t\t\t";
  } else if (trainerName.length <= 17) {
    newName += "\t\t\t\t\t\t\t\t";
  } else if (trainerName.length <= 20) {
    newName += "\t\t\t\t\t\t";
  } else if (trainerName.length === 25) {
    newName += "\t\t\t\t";
  } else if (trainerName.length <= 26) {
    newName += "\t\t\t\t\t";
  } else if (trainerName.length <= 30) {
    newName += "\t\t\t\t";
  } else if (trainerName.length <= 35) {
    newName += "\t\t\t";
  }

  return newName;
};

// ===========================================
// Trainer
// ===========================================
export const convertTrainerText = (initialText: string): [string, JSX.Element] => {
  // transform text into an array with values
  const textArray: string[] = initialText.split(/\r?\n/);
  // get all trainers from input text
  const trainers: Trainer[] = createTrainer(textArray);
  // find pokemons that don't match with input
  const differents: Differents[] = findDifferentsOfTrainers(trainers);
  // create a readable text
  const resultText: string = createTrainerResultText(differents);
  // create JSX Element
  const jsxElement: JSX.Element = createTrainerJsx(differents);

  return [resultText, jsxElement];
};

const createTrainer = (textArray: string[]): Trainer[] => {
  const trainers: Trainer[] = [];
  let isTrainerOrPokemon: boolean = false;

  let tempTrainerName: string = "";
  let tempTrainerPokemons: Pokemon[] = [];

  const pushTrainer = () => {
    trainers.push({ name: tempTrainerName, pokemons: tempTrainerPokemons });
    // set to default
    tempTrainerName = "";
    tempTrainerPokemons = [];
  };

  for (let i = 0; i < textArray.length; i++) {
    const text = textArray[i];
    // new Trainer
    if (text.includes("Team")) {
      // push old trainer to array before starting the new one
      if (isTrainerOrPokemon) {
        pushTrainer();
      }

      isTrainerOrPokemon = true;
      tempTrainerName = text.split(" ")[0];
    }
    // it is a pokemon
    else if (isTrainerOrPokemon && text != "") {
      tempTrainerPokemons.push({ name: text });
    }

    // end of the file => push last trainer to array
    if (i === textArray.length - 1) {
      pushTrainer();
    }
  }

  return trainers;
};

const findDifferentsOfTrainers = (trainers: Trainer[]): Differents[] => {
  let differents: Differents[] = [];

  trainers.forEach((inputTrainer: Trainer) => {
    // get trainer-data from json
    const dataTrainer: DataTrainer | undefined = TrainerData.find(
      (trainer: any) => trainer.name.toLowerCase() === inputTrainer.name.toLowerCase()
    );

    // no trainer was found
    if (!dataTrainer) {
      return differents.push({ trainer: inputTrainer.name, message: "Trainer was not found!" });
    }

    // loop over and find if a pokemon has changed
    let newPokemons: DifferentsInPokemon[] = [];
    for (let i = 0; i < inputTrainer.pokemons.length; i++) {
      const inputTrainerPokemon: Pokemon = inputTrainer.pokemons[i];
      const dataPokemon: TrainerPokemon = dataTrainer.pokemons[i];

      // has new pokemon
      if (inputTrainerPokemon.name.trim() != dataPokemon.name.trim()) {
        newPokemons.push({
          type: dataPokemon.type,
          oldPokemon: dataPokemon.name,
          newPokemon: inputTrainerPokemon.name,
        });
      }
    }

    // update differents
    if (newPokemons.length === 0)
      differents.push({ trainer: inputTrainer.name, message: "no different was found." });
    else differents.push({ trainer: inputTrainer.name, pokemons: newPokemons });
  });

  return differents;
};

const createTrainerResultText = (differents: Differents[]): string => {
  let resultText: string = "";

  differents.forEach((dif: Differents) => {
    resultText += `Trainer: ${dif.trainer}\n`;

    // add message
    resultText += dif?.message ? `${dif.message} \n` : "";
    // show pokemons
    resultText += dif?.pokemons ? `${createPokemonText(dif.trainer, dif.pokemons)}` : "";

    // seperate trainers
    resultText += "\n";
  });

  return resultText;
};

const createPokemonText = (trainer: string, pokemons: DifferentsInPokemon[]): string => {
  let text = "";

  pokemons.forEach((pokemon) => {
    text += `${pokemon.type}: ${pokemon.oldPokemon} -> ${pokemon.newPokemon} \n`;
    // json format
    text += `{ "trainer": "${trainer}",            "type": "${pokemon.type}",           "previousPokemon": "${pokemon.oldPokemon}",          "newPokemon": "${pokemon.newPokemon}" }\n`;
  });

  return text;
};

const createTrainerJsx = (differents: Differents[]): JSX.Element => {
  const jsx: JSX.Element = (
    <div>
      {differents.map((dif: Differents, idx: number) => {
        return (
          <div key={idx} className="text-center">
            <h2 className="bg-green-200 text-xl">{dif.trainer}</h2>

            {dif?.message && <p>{dif.message}</p>}

            {dif?.pokemons && (
              <div className="grid mt-1">
                {dif.pokemons.map((pokemon: DifferentsInPokemon) => {
                  return (
                    <div
                      key={pokemon.oldPokemon + pokemon.newPokemon}
                      className="mb-1 flex relative justify-center items-center hover:bg-indigo-100"
                    >
                      <div className="flex relative">
                        <div
                          style={{
                            width: "100px",
                            fontFamily: "Roboto, arial",
                            color: "white",
                            backgroundColor: `${TypeColor[pokemon.type.toLowerCase()]}`,
                          }}
                        >
                          {pokemon.type}
                        </div>

                        <div className="ml-2" style={{ width: "150px" }}>
                          {pokemon.oldPokemon}
                        </div>

                        <div className="mx-1.5">{"->"}</div>

                        <div style={{ width: "150px" }}>{pokemon.newPokemon}</div>
                      </div>

                      <div>
                        <span
                          className="material-icons icon-copy"
                          onClick={() =>
                            copyTextToClipBoard(
                              `{ "trainer": "${dif.trainer}",            "type": "${pokemon.type}",           "previousPokemon": "${pokemon.oldPokemon}",          "newPokemon": "${pokemon.newPokemon}" }`
                            )
                          }
                        >
                          content_copy
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return jsx;
};

const copyTextToClipBoard = (text: string) => {
  navigator.clipboard.writeText(text);
};
