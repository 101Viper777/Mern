import { config } from "dotenv";
config(); // to read the .env file
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
import cors from "cors";
const Port = 3500;
const app = express();
app.use(cors());
app.use(express.json());
//express middleware function to tell express that packets are in json format

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  console.log(decks);
  res.json(decks);
});

// ---//
app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body.title);
  const newDeck = new Deck({
    title: req.body.title,
  });

  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

// ---//
app.get("/", (req: Request, res: Response) => {
  res.send("yooo wassup ");
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  // exclamation mark to tell typescript that it is not null
  app.listen(Port);
  console.log(`Mongo is up & Server is running on port ${Port}`);
});
