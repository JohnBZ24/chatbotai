import axios from "axios";
import { useState, type ChangeEvent } from "react";

export function MdInput() {
  const [inputText, setInputText] = useState<string>("");

  function saveInput(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  async function apiCall(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/convert", {
        url: inputText,
      });

      const markdown = response.data.markdown;
      console.log(markdown);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <form>
        <label htmlFor="md">parse from html to markdown</label>
        <input
          id="md"
          placeholder="enter a url"
          onChange={saveInput}
        />
        <button type="button" onClick={apiCall}>
          parse
        </button>
      </form>
    </>
  );
}
