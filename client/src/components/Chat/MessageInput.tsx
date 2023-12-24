import type { MessageQuery } from "@realtime-chat/shared";
import { sendApi } from "../../lib/api";
import { useUser } from "../../lib/user";

export function MessageInput() {
  const user = useUser()!;

  return (
    <form
      className="flex items-center border-t border-gray-400 px-4 py-2 gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const message = form.get("message")?.toString();
        if (message && user.id) {
          e.currentTarget.reset();
          await sendApi<MessageQuery>("send-message", {
            userId: user.id,
            content: message,
          });
        }
      }}
    >
      <input
        name="message"
        className="border border-gray-400 focus:outline-blue-500 rounded-lg px-2 py-1 grow"
        placeholder="Your message"
        required
      />
      <button className="bg-blue-500 text-white rounded-lg font-semibold px-2 py-1">
        Send
      </button>
    </form>
  );
}
