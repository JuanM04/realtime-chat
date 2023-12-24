import { useEffect, useState } from "react";
import { useUsers, yProvider } from "../../lib/yjs";
import type { onAwarenessUpdateParameters } from "@hocuspocus/provider";
import { useUser } from "../../lib/user";

type TypingIndicator = {
  userId: string;
  typing: string;
};

export function TypingIndicator() {
  const currentUser = useUser()!;
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>(
    []
  );

  useEffect(() => {
    const onAwarenessUpdate = ({ states }: onAwarenessUpdateParameters) => {
      const typingIndicators: TypingIndicator[] = [];
      for (const state of states) {
        if (
          typeof state.userId !== "string" ||
          typeof state.typing !== "string"
        )
          continue;
        if (state.userId === currentUser.id) continue;
        if (state.typing.length === 0) continue;
        typingIndicators.push({ userId: state.userId, typing: state.typing });
      }
      setTypingIndicators(typingIndicators);
    };

    yProvider.on("awarenessUpdate", onAwarenessUpdate);
    return () => void yProvider.off("awarenessUpdate", onAwarenessUpdate);
  }, [currentUser.id]);

  return typingIndicators.map((indicator) => (
    <Indicator {...indicator} key={indicator.userId} />
  ));
}

function Indicator({ userId, typing }: TypingIndicator) {
  const users = useUsers();
  const user = users[userId] ?? { name: "Unknown" };

  return (
    <div className="pr-[30%] py-2">
      <div className="flex justify-start items-end">
        <svg
          className="size-[12px] -mr-[1px]"
          viewBox="0 0 3 3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 3 3 V 0 C 3 1 1 3 0 3" className="fill-gray-200" />
        </svg>
        <p className="max-w-[calc(100%-12px)] break-words text-lg text-left leading-tight text-gray-500 rounded-xl rounded-bl-none bg-gray-200 px-4 py-2">
          {typing}
        </p>
      </div>
      <p className="text-xs text-gray-600 text-left ml-7">{user.name}</p>
    </div>
  );
}
