import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import type { State } from "@/types/State";
import useGameStore from "@/stores/useGameStore";

function Row({
  isValidated,
  guess,
  word,
}: {
  isValidated: boolean;
  guess: string;
  word: string;
}) {
  return (
    <div className="flex gap-x-1.5">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          const state: State = !isValidated
            ? "initial"
            : word[i]?.length && guess[i] === word[i]
            ? "correct"
            : word.includes(guess[i])
            ? "present"
            : "absent";

          return (
            <div
              key={i}
              style={{ animationDelay: i * 0.1 + "s" }}
              className={clsx(
                "inline-flex h-[52px] w-[52px] items-center justify-center text-3xl font-bold uppercase text-white transition",
                {
                  // "animate-flip": state !== "initial",
                  "border-2 border-initial dark:border-absent-dark":
                    state === "initial",
                  "bg-correct dark:bg-correct-dark": state === "correct",
                  "bg-present dark:bg-present-dark": state === "present",
                  "bg-absent dark:bg-absent-dark": state === "absent",
                }
              )}
            >
              {guess[i]}
            </div>
          );
        })}
    </div>
  );
}

export default function Board() {
  const {
    setWords,
    selectWord,
    guesses,
    selectedWord,
    currentGuess,
    getWin,
    getLose,
  } = useGameStore();

  const query = useQuery({
    queryKey: ["words"],
    queryFn: () =>
      fetch(import.meta.env.VITE_API_URL).then((res) => res.json()),
    onSuccess: (data) => {
      setWords(data);
      selectWord();
    },
  });

  // TODO: Use loading and error states from react-query

  return (
    <div className="mx-auto flex max-w-[300px] flex-col gap-y-1.5 p-2.5">
      {/* TODO: Add toasts  */}
      {getWin() && <div className="absolute top-24 text-center">You won!</div>}
      {getLose() && (
        <div className="absolute top-24 text-center">You lost!</div>
      )}
      {guesses?.map((_, i) => (
        <Row
          key={i}
          guess={guesses[i]}
          word={selectedWord}
          isValidated={i < currentGuess}
        />
      ))}
    </div>
  );
}
