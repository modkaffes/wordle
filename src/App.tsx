import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Debugger from "./components/layout/Debugger";
import Header from "./components/layout/Header";
import Board from "./components/game/Board";
import Keyboard from "./components/game/Keyboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mx-auto flex h-[calc(100vh-64px)] max-w-[500px] flex-col justify-between sm:mt-24 sm:h-auto sm:gap-y-24">
        <Board />
        <Keyboard />
      </div>
      {/* <Debugger /> */}
    </QueryClientProvider>
  );
}
