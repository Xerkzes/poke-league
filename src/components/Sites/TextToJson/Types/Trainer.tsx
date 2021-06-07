import React, { useRef, useState } from "react";
import { convertTrainerText } from "../Convert/ConvertText";

interface TrainerProps {}

export const Trainer: React.FC<TrainerProps> = () => {
  const [convertedText, setConvertedText] = useState<string>("");
  const initialText = useRef(null);
  const [trainerDiff, setTrainerDiff] = useState<JSX.Element>();

  return (
    <div>
      <div>
        <div className="flex flex-row items-start justify-between w-11/12 mx-auto">
          <textarea
            className="border-black border w-9/12 min-h-300"
            ref={initialText}
            onChange={() => null}
            placeholder="input..."
          />

          <button
            className="bg-green-200 mx-3.5 p-2 mt-28"
            onClick={() => {
              const [newText, jsx] = convertTrainerText(initialText.current.value);
              setConvertedText(newText);
              setTrainerDiff(jsx);
            }}
          >
            Find
          </button>

          <textarea
            className="border-black border w-9/12 min-h-300"
            value={convertedText}
            onChange={(text) => setConvertedText(text.target.value)}
            placeholder="result..."
          />
        </div>
      </div>

      <div className="mt-4 mx-5">{trainerDiff}</div>
    </div>
  );
};
