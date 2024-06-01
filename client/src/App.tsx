import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { TDeck, getDecks } from "./api/getDecks";
import { get } from "http";
import { createDeck } from "./api/createDeck";
import { deleteAllDecks } from "./api/deleteAllDecks";
import { Demo } from "./Demo";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleDeleteDeck() {
    {
      await deleteAllDecks();
      setDecks([]);
    }
  }
  async function handleDelete1Deck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  useEffect(() => {
    (async () => {
      const newDecks = getDecks();
      setDecks(await newDecks);
    })();
    // }, [handleCreateDeck, handleDeleteDeck]);
  }, []);

  return (
    <>
      <div className="App">
        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              <button
                onClick={() => (
                  console.log("deleting"), handleDelete1Deck(deck._id)
                )}
              >
                x
              </button>
              <Link to={`decks/${deck._id}`} color="white">
                {deck.title}
              </Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            value={title}
            onChange={(e: React.ChangeEvent) => {
              setTitle((e.target as HTMLInputElement).value);
              //save the value of the input to the mongodb
              console.log((e.target as HTMLInputElement).value);
            }}
            id="deck-title"
            type="text"
          />
          <button>Submit Deck</button>
        </form>
      </div>
      <Demo />
    </>
  );
}

export default App;
