import api from "../../utils/api"; // Your configured axios instance

export async function postChatQuery(session_id, query) {
  const payload = {
    session_id,
    query,
  };

  const response = await api.post("/chat", payload);

  return {
    message: response.data.message,
    filters: response.data.filters || null,
    movies: response.data.movies || null,
  };
}
