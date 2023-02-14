import { create } from "zustand";
import { persist } from "zustand/middleware";

type Word = string;

type State = {
  words: Word[];
  selectedWord: Word;
  guesses: string[];
  currentGuess: number;
};

type Actions = {
  resetGame: () => void;
  setWords: (words: Word[]) => void;
  selectWord: () => void;
  handleKeyUp: (e: KeyboardEvent) => void;
  getAllTypedKeys: () => string[];
  getPresentKeys: () => string[];
  getCorrectKeys: () => string[];
  getWin: () => boolean;
  getLose: () => boolean;
};

const initialState: State = {
  words: [],
  selectedWord: "",
  guesses: Array(6).fill(""),
  currentGuess: 0,
};

const useGameStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  resetGame: () => set(initialState),
  setWords: (words: Word[]) => set({ words }),
  selectWord: () => {
    set((state) => ({
      selectedWord:
        get().selectedWord ||
        state.words[Math.floor(Math.random() * state.words.length)],
    }));
  },
  handleKeyUp: (e: KeyboardEvent) => {
    const { guesses, currentGuess } = get();
    const guess = guesses[currentGuess];

    if (e.key === "Enter") {
      // Can’t submit word shorter than 5 letters
      if (guess.length < 5) {
        alert("Not enough letters!");
        return;
      }

      // Can’t submit if word doesn’t exist in array
      // Disabled for now because of very limited word set hindering gameplay
      // if (!get().words.includes(guess)) {
      //   alert("Not in word list!");
      //   return;
      // }

      // If not last guess, go to next guess
      set((state) => ({ currentGuess: state.currentGuess + 1 }));
      // If found word, end game
    } else if (e.key === "Backspace") {
      // Delete last letter from current guess
      if (guess.length > 0) {
        set((state) => ({
          guesses: state.guesses.map((guess, i) =>
            state.currentGuess === i ? guess.slice(0, -1) : guess
          ),
        }));
      }
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      // Add letter to current guess
      if (guess.length < 5) {
        set((state) => ({
          guesses: state.guesses.map((guess, i) =>
            state.currentGuess === i ? guess.concat(e.key) : guess
          ),
        }));
      }
    }
  },
  getAllTypedKeys: () => {
    const { guesses, currentGuess } = get();

    return guesses.slice(0, currentGuess).join("").split("");
  },
  getPresentKeys: () => {
    const { selectedWord, getAllTypedKeys } = get();

    return selectedWord
      .split("")
      .filter((letter) => getAllTypedKeys().includes(letter));
  },
  getCorrectKeys: () => {
    const { selectedWord, guesses, currentGuess } = get();

    return selectedWord.split("").filter((letter, i) =>
      guesses
        .slice(0, currentGuess)
        .map((selectedWord) => selectedWord[i])
        .includes(letter)
    );
  },
  getWin: () => {
    const { selectedWord, guesses, currentGuess } = get();

    return selectedWord === guesses[currentGuess - 1];
  },
  getLose: () => {
    const { currentGuess } = get();

    return currentGuess > 5;
  },
}));

export default useGameStore;
