import type { MessageQuery } from "@realtime-chat/shared";
import { sendApi } from "../../lib/api";
import { useUser } from "../../lib/user";
import { useRef } from "react";
import { yProvider } from "../../lib/yjs";

export function MessageInput() {
  const user = useUser()!;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "1px";
    textarea.style.height = textarea.scrollHeight + 1 + "px";
  };

  return (
    <form
      className="flex items-center border-t border-gray-400 px-4 py-2 gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (user.id) {
          const textarea = textareaRef.current!;
          await sendApi<MessageQuery>("send-message", {
            userId: user.id,
            content: textarea.value,
          });
          textarea.value = "";
          resizeTextarea();
          yProvider.setAwarenessField("typing", "");
        }
      }}
    >
      <textarea
        name="message"
        className="border border-gray-400 focus:outline-blue-500 rounded-lg px-2 py-1 grow overflow-hidden resize-none"
        placeholder="Your message"
        required
        rows={1}
        ref={textareaRef}
        onChange={(e) => {
          resizeTextarea();
          yProvider.setAwarenessField("typing", e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form!.requestSubmit();
          }
        }}
      />
      <button className="bg-blue-500 text-white rounded-lg font-semibold px-2 py-1">
        Send
      </button>
    </form>
  );
}
