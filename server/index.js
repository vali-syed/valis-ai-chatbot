import express from "express";
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req,res) => {
    console.log("Server running successfully on port " + PORT);
});