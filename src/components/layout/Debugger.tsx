import useGameStore from "@/stores/useGameStore";

export default function Debugger() {
  const { currentGuess, guesses, words, selectedWord } = useGameStore();

  return (
    <code className="absolute left-0 bottom-0 w-full  p-4">
      <strong>selectedWord: </strong>
      {selectedWord}
      <br />
      <strong>currentGuess: </strong>
      {currentGuess}
      <br />
      <strong>guesses: </strong>
      {JSON.stringify(guesses)}
      <br />
      <strong>words: </strong>
      <div className="overflow-x-auto">{JSON.stringify(words)}</div>
    </code>
  );
}
