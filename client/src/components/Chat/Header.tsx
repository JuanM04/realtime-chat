import { Settings } from "./Settings";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b border-slate-400 px-4 py-2">
      <h1 className="font-bold text-2xl">Group chat</h1>
      <Settings />
    </div>
  );
}
