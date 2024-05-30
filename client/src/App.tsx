import React, { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:3500/decks", {
      method: "POST",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3500/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    })();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
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
  );
}

export default App;
