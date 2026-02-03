import express from "express";
import axios from "axios";
import cors from "cors";
import { convert } from "@kreuzberg/html-to-markdown";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/convert", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    // ✅ Convert HTML → Markdown (backend-safe)
    const markdown = convert(html);

    res.json({ markdown });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch or convert page" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
