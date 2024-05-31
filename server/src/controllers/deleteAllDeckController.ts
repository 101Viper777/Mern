import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function deleteAllDeckController(req: Request, res: Response) {
  console.log("deleing all decks");

  const decks = await Deck.deleteMany({});
  res.json(decks);
}
