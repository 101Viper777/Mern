import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const Port = 3500;
const app = express();

app.use(express.json());
//express middleware function to tell express that packets are in json format
// ---//
app.post("/decks", async (req: Request, res: Response) => {
  console.log(req.body);
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

mongoose
  .connect(
    "mongodb+srv://abdulazizelsabbagh79:z1j8wnP35TwSQYbO@cluster0.ytq6uck.mongodb.net/"
  )
  .then(() => {
    app.listen(Port);
    console.log(`Mongo is up & Server is running on port ${Port}`);
  });
