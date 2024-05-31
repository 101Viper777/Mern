import { API_URL } from "./config";

export async function deleteAllDecks() {
  await fetch(`${API_URL}/decks`, {
    method: "DELETE",
  });
}
