import { useMessages } from "./lib/yjs";

export default function App() {
  const [messages, sendMessage] = useMessages();

  return (
    <>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>{message.content}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage(Math.random().toString())}>
        Send message
      </button>
    </>
  );
}
