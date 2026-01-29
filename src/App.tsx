import { useState } from "react";
import { ChatInput } from "./components/chatInput";
import { ChatMessages } from "./components/ChatMessage";
function App() {
  const [chatmessages, setChatMessages] = useState<
    { message: string; sender: string }[]
  >([]);
  const [key, setKey] = useState<string>("");
  function handleKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  function saveInput(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <>
      <form onSubmit={handleKey} className="mt-2">
        <label htmlFor="key" className=" ml-2 mr-2 font-sans ">
          Enter your open-router key
        </label>
        <input
          id="key"
          onChange={saveInput}
          className="rounded-md border border-black p-2"
        />
        <button
          type="submit"
          className="ml-2 px-3 py-2 bg-black text-white rounded-md"
        >
          submit{" "}
        </button>
      </form>
      <ChatMessages chatmessages={chatmessages} />
      <ChatInput
        apiKey={key}
        chatmessages={chatmessages}
        setChatMessages={setChatMessages}
      />
    </>
  );
}

export default App;
