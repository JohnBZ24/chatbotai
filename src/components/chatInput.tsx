import { useState, type ChangeEvent } from "react";
import { sendMessageToAi } from "../services/api";

type ChatInputProps = {
  chatmessages: { message: string; sender: string }[];
  setChatMessages: React.Dispatch<
    React.SetStateAction<{ message: string; sender: string }[]>
  >;
  apiKey: string;
};

export function ChatInput({
  chatmessages,
  setChatMessages,
  apiKey,
}: ChatInputProps) {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSendMessage() {
    setInputText("");
    const newChatMessages = [
      ...chatmessages,
      {
        message: inputText,
        sender: "user",
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: "loading",
        sender: "robot",
      },
    ]);

    setLoading(true);

    try {
      const response = await sendMessageToAi(inputText, apiKey);
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: "robot",
        },
      ]);
    } catch (error) {
      // API service logs the error
      setChatMessages([
        ...newChatMessages,
        {
          message: `Something went wrong please try again ${error}`,
          sender: "robot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  return (
    <form
      className="flex justify-center items-center mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendMessage();
      }}
    >
      <input
        className="rounded-md w-96 mx-10 border border-gray-300 p-2"
        placeholder="What's on your mind?"
        onChange={handleInputChange}
        value={inputText}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-black px-4 py-2 rounded-md text-white font-medium transition-opacity ${loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-80"
          }`}
      >
        Send
      </button>
    </form>
  );
}
