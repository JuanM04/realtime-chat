import { useSnapshot } from "valtio";

import { useUser } from "../../lib/user";
import { MessageType, yMessages, yUsers } from "../../lib/yjs";

export function Messages() {
  const { user } = useUser();
  const messagesSnap = useSnapshot(yMessages);

  return (
    <div className="h-full flex flex-col overflow-auto">
      {messagesSnap.map((message, i) =>
        message.userId === user.id ? (
          <MyMessage key={i} message={message} />
        ) : (
          <OtherMessage key={i} message={message} />
        )
      )}
    </div>
  );
}

function MyMessage({ message }: { message: MessageType }) {
  return (
    <div className="pl-[30%] py-2">
      <div className="flex justify-end items-end">
        <p className="text-lg text-right leading-tight text-black rounded-xl rounded-br-none bg-gray-300 px-4 py-2">
          {message.content}
        </p>
        <svg
          className="size-[12px] -ml-[1px]"
          viewBox="0 0 3 3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0 3 H 3 C 2 3 0 1 0 0" className="fill-gray-300" />
        </svg>
      </div>
      <p className="text-xs text-gray-600 text-right mr-7">
        {formatTime(message.createdAt)}
      </p>
    </div>
  );
}

function OtherMessage({ message }: { message: MessageType }) {
  const usersSnap = useSnapshot(yUsers);
  const user = usersSnap[message.userId] ?? { name: "Unknown" };

  return (
    <div className="pr-[30%] py-2">
      <div className="flex justify-start items-end">
        <svg
          className="size-[12px] -mr-[1px]"
          viewBox="0 0 3 3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 3 3 V 0 C 3 1 1 3 0 3" className="fill-blue-500" />
        </svg>
        <p className="text-lg text-left leading-tight text-white rounded-xl rounded-bl-none bg-blue-500 px-4 py-2">
          {message.content}
        </p>
      </div>
      <p className="text-xs text-gray-600 text-left ml-7">
        {user.name}, {formatTime(message.createdAt)}
      </p>
    </div>
  );
}

function formatTime(time: number): string {
  const now = new Date();
  const date = new Date(time);

  if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    if (date.getDate() === now.getDate()) {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    if (date.getDate() === now.getDate() - 1) {
      return "Yesterday";
    }
  }

  return [
    date.getDate().toString().padStart(2, "0"),
    date.getMonth().toString().padStart(2, "0"),
    date.getFullYear(),
  ].join("/");
}
