import express from "express";
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


const model =  new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GOOGLE_API_KEY,
})

app.post("/chat", async (req, res) => {
    const {message} = req.body;
    const reply = await model.invoke(message);
    console.log(reply);//testing model reply that sit 
    res.json({reply:reply.content});
});

app.listen(5000, () => {
    console.log("App listening successfully on port 5000");
});