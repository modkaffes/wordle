import { useEffect } from "react";
import clsx from "clsx";
import type { State } from "@/types/State";
import useGameStore from "@/stores/useGameStore";

type Key = {
  /* The value to be sent to the handler */
  value: string;
  /* Override what is displayed on the key, eg. "Back" instead of "Backspace" */
  label?: string;
  className?: string;
};

function Key({ value, label, className }: Key) {
  const { handleKeyUp, getPresentKeys, getCorrectKeys, getAllTypedKeys } =
    useGameStore();

  const state: State = getCorrectKeys().includes(value)
    ? "correct"
    : getPresentKeys().includes(value)
    ? "present"
    : getAllTypedKeys().includes(value)
    ? "absent"
    : "initial";

  return (
    <button
      type="button"
      data-key={value}
      className={clsx(
        "m-0 h-[58px] flex-1 cursor-pointer items-center justify-center rounded border-0 p-0 font-bold uppercase ",
        {
          "bg-initial text-black dark:bg-initial-dark dark:text-white":
            state === "initial",
          "bg-correct text-white dark:bg-correct-dark": state === "correct",
          "bg-present text-white dark:bg-present-dark": state === "present",
          "bg-absent text-white dark:bg-absent-dark": state === "absent",
        },
        className
      )}
      onClick={() => handleKeyUp({ key: value } as KeyboardEvent)}
    >
      {label ?? value}
    </button>
  );
}

export default function Keyboard() {
  const { handleKeyUp } = useGameStore();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col gap-y-2 p-2 text-sm"
        role="group"
        aria-label="Keyboard"
      >
        <div className="flex touch-manipulation justify-center gap-x-1.5">
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
            <Key key={key} value={key} />
          ))}
        </div>
        <div className="flex touch-manipulation justify-center">
          <div data-testid="spacer" className="flex-[0.5]" />
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key, i) => (
            <Key
              key={key}
              value={key}
              // Can’t use row-gap to set spacing between mid row keys, because of flex-0.5 spacers
              className={clsx({ "ml-1.5": i !== 0 })}
            />
          ))}
          <div data-testid="spacer" className="flex-[0.5]" />
        </div>
        <div className="flex touch-manipulation justify-center gap-x-1.5">
          <Key value="Enter" className="flex-[1.5]" />
          {["z", "x", "c", "v", "b", "n", "m"].map((key) => (
            <Key key={key} value={key} />
          ))}
          <Key value="Backspace" label="Back" className="flex-[1.5]" />
        </div>
      </div>
    </>
  );
}
