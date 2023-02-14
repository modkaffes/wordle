import useGameStore from "@/stores/useGameStore";

export default function Header() {
  const { resetGame } = useGameStore();
  return (
    <header className="space-between flex h-16 items-center justify-between px-4">
      <button onClick={resetGame}>Reset</button>
      <h1>
        <a className="py-3 text-3xl font-bold" href="/">
          Wordle
        </a>
      </h1>
      <a href="https://github.com/modkaffes/wordle" target="_blank">
        GitHub
      </a>
    </header>
  );
}
