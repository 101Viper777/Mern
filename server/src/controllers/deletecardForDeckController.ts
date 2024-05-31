import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function deletecardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck found with this Id");

  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
