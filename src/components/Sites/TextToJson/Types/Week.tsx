import React, { useRef, useState } from "react";
import { convertWeekText } from "../Convert/ConvertText";

interface WeekProps {}

export const Week: React.FC<WeekProps> = () => {
  const [convertedText, setConvertedText] = useState<string>("");
  const initialText = useRef(null);

  return (
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
          onClick={() => convertWeekText(initialText.current.value, setConvertedText)}
        >
          Convert
        </button>

        <textarea
          className="border-black border w-9/12 min-h-300"
          value={convertedText}
          onChange={(text) => setConvertedText(text.target.value)}
          placeholder="result..."
        />
      </div>
    </div>
  );
};
