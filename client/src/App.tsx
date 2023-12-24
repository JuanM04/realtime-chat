import { Chat } from "./components/Chat/Chat";
import { Login } from "./components/Login";
import { useUser } from "./lib/user";

export default function App() {
  const user = useUser();

  return (
    <div className="w-full bg-gray-200">
      <main className="h-dvh bg-white max-w-96 mx-auto">
        {!user ? <Login /> : <Chat />}
      </main>
    </div>
  );
}
