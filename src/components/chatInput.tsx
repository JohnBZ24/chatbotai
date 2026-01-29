import { useState, type ChangeEvent } from "react";
import axios from "axios";

type chatInput = {
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
}: chatInput) {
  const [inputText, setinputText] = useState<string>("");
  async function handleButton() {
    const headers = {
      Authorization: apiKey,
      "content-Type": "application/json",
    };
    const post = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [{ role: "user", content: inputText }],
      },
      { headers },
    );
    const response = post.data.choices[0].message.content;
    console.log(typeof response, response);

    return response;
  }
  function SaveInputText(event: ChangeEvent<HTMLInputElement>) {
    setinputText(event.target.value);
  }
  async function sendMessage() {
    setinputText("");
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
    const response = await handleButton();
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
      },
    ]);
  }

  return (
    <form className="flex  justify-center items-center mt-5">
      <input
        className="rounded-md w-96 mx-10 "
        placeholder="what's on your mind ?"
        onChange={SaveInputText}
        value={inputText}
      />
      <button
        type="button"
        onClick={sendMessage}
        className="bg-black px-3 rounded-md text-white"
      >
        ...
      </button>
    </form>
  );
}
