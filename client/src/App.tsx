/**
 * @fileoverview
 * The main entry point of the application.
 *
 * It has a very simple switch: if the user is logged in, it shows the chat window,
 * otherwise it shows the login screen.
 *
 * It can be replaced with a router if the application grows.
 */

import { Chat } from "./components/Chat/Chat";
import { Login } from "./components/Login";
import { useUser } from "./lib/user";

// For expanding the chat window to the full height of the viewport,
// it uses the brand-new CSS length unit `dvh` (device viewport height).
// https://caniuse.com/mdn-css_types_length_viewport_percentage_units_dynamic
//
// Also, inside the meta tag <meta name="viewport" />, there's a new
// property `interactive-widget=resizes-content` that allows the chat window
// to resize when the virtual keyboard is shown on mobile devices.
// https://developer.chrome.com/blog/viewport-resize-behavior/

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
