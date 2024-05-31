import { config } from "dotenv";
config(); // to read the .env file
import express, { Request, Response } from "express";
import mongoose, { get } from "mongoose";
import cors from "cors";

import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteAllDeckController } from "./controllers/deleteAllDeckController";
import { deletecardForDeckController } from "./controllers/deletecardForDeckController";
const Port = 3500;
const app = express();
app.use(cors());
app.use(express.json()); //express middleware function to tell express that packets are in json format

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.delete("/decks", deleteAllDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deletecardForDeckController);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  // exclamation mark to tell typescript that it is not null
  app.listen(Port);
  console.log(`Mongo is up & Server is running on port ${Port}`);
});
