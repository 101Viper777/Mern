import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, useParams } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { get } from "http";
import { createDeck } from "./api/createDeck";
import { deleteAllDecks } from "./api/deleteAllDecks";
import { createCard } from "./api/createCard";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [text, setText] = useState("");
  let { deckId } = useParams();
  const [cards, setCards] = useState<string[]>([]);

  async function handleDeleted(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  useEffect(() => {
    (async () => {
      if (!deckId) return;
      const newDeck = await getDeck(deckId!);
      setDeck(newDeck);
      setCards(newDeck.cards);
    })();
    // }, [handleCreateDeck, handleDeleteDeck]);
  }, [deckId]);

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>
            <button
              onClick={() => (console.log("deleting"), handleDeleted(index))}
            >
              x
            </button>
            {card}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text</label>
        <input
          value={text}
          onChange={(e: React.ChangeEvent) => {
            setText((e.target as HTMLInputElement).value);
            //save the value of the input to the mongodb
            console.log((e.target as HTMLInputElement).value);
          }}
          id="card-text"
          type="text"
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
