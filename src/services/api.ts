import axios from "axios";

export async function sendMessageToAi(message: string, apiKey: string): Promise<string> {
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    return axios
        .post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-r1-0528:free",
                messages: [{ role: "user", content: message }],
            },
            { headers }
        )
        .then((response) => {
            return response.data.choices[0].message.content;
        })
        .catch((error) => {
            console.error("API Error:", error);
            throw error; // Re-throw to let component handle it (or return default message here)
        });
}
