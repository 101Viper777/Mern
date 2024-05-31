import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteCard(
  deckId: string,
  index: number
): Promise<TDeck> {
  const resp = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: "DELETE",
  });
  return resp.json();
}
