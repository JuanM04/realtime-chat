import { useUser } from "../lib/user";

export function Login() {
  const { login } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Realtime chat</h1>
      <p className="text-sm mt-2">Welcome! Start by telling us your name.</p>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const name = form.get("name")?.toString();
          if (name) login(name);
        }}
      >
        <input
          name="name"
          type="text"
          className="border border-gray-400 focus:outline-blue-500 rounded-lg mt-8 px-2 py-1"
          placeholder="Your name"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg font-semibold px-2 py-1 mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}
