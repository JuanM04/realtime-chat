import { useRef } from "react";
import { useUser } from "../../lib/user";
import { yMessages } from "../../lib/yjs";

export function Settings() {
  const { user, updateSettings, logout } = useUser();
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button title="Settings" onClick={() => dialogRef.current?.showModal()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      <dialog
        className="bg-white rounded-xl max-w-72 backdrop:bg-black/50"
        ref={dialogRef}
        onClick={(ev) => {
          const dialog = ev.currentTarget;
          const rect = dialog.getBoundingClientRect();
          const isInDialog =
            rect.top <= ev.clientY &&
            ev.clientY <= rect.top + rect.height &&
            rect.left <= ev.clientX &&
            ev.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            dialog.close();
          }
        }}
      >
        <div className="flex items-center justify-between border-b border-slate-400 px-4 py-2">
          <h2 className="font-bold text-xl">Settings</h2>

          <button onClick={() => dialogRef.current?.close()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <form
          className="p-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const name = form.get("name")!.toString();
            updateSettings({ name });
            dialogRef.current?.close();
          }}
        >
          <label htmlFor="name" className="pl-1 text-sm font-medium">
            Username
          </label>
          <input
            name="name"
            type="text"
            className="border border-gray-400 focus:outline-blue-500 rounded-lg px-2 py-1 w-full"
            required
            defaultValue={user.name}
          />

          <div className="flex items-center justify-between mt-2">
            <button
              className="text-red-500 font-semibold mx-2"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg font-semibold px-2 py-1"
            >
              Save settings
            </button>
          </div>

          <button
            className="bg-black text-white rounded-lg font-semibold px-2 py-1 mt-8"
            onClick={(e) => {
              e.preventDefault();
              while (yMessages.length > 0) {
                yMessages.pop();
              }
            }}
          >
            Clear chat
          </button>
        </form>
      </dialog>
    </>
  );
}
