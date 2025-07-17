# 🌐 Frontend API Calls — MoviesYouDidntWatch.com

This document explains how the frontend communicates with the backend using Axios, including token-based authentication and language-aware headers.

All calls are centralized using a configured `axiosInstance` in `utils/api.js`.

---

## 1. 🔧 Axios Instance Setup (`api.js`)

### Core Behavior:

- Injects JWT into `Authorization` header
- Injects current language into `Accept-Language` header
- Handles error redirection for expired/invalid tokens

```js
// utils/api.js
import axios from "axios";
import { getToken } from "../lib/utils"; // helper to retrieve token
import { getLanguage } from "../context/LanguageContext"; // OR from localStorage

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  const lang = getLanguage(); // returns "en" or "fr"

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (lang) config.headers["Accept-Language"] = lang;

  return config;
});

export default axiosInstance;
```

---

## 2. 🔐 Auth Endpoints

### `POST /auth/signup`

Registers a new user.

**Called from:** `AuthForm.jsx` → `Signup.jsx`

**Request:**
```json
{
  "first_name": "Amine",
  "last_name": "Benkirane",
  "email": "amine@example.com",
  "password": "securepassword123"
}
```

**Response:**
- JWT token
- User object

---

### `POST /auth/login`

Authenticates user.

**Request:**
```json
{
  "email": "amine@example.com",
  "password": "securepassword123"
}
```

**Response:**
- JWT token
- User object

---

## 3. 👤 `GET /users/me`

Used to get user profile after login (or on page reload).

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: en
```

**Response:**
```json
{
  "first_name": "Amine",
  "last_name": "Benkirane",
  "email": "amine@example.com"
}
```

---

## 4. 🎬 Movie Discovery

### `POST /movies/search`

**Used in:** `FiltersBar.jsx`

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: fr
```

**Request Body:**
```json
{
  "genre_id": 35,
  "min_rating": 7.0,
  "min_votes": 5000,
  "start_year": 1990,
  "end_year": 2023,
  "sort_by": "popularity.desc"
}
```

**Response:**
- List of enriched movie objects
- Minimum 25 valid results

---

## 5. 💬 Chat Assistant

### `POST /chat`

**Used in:** `ChatWindow.jsx`

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: fr
```

**Request Body:**
```json
{
  "session_id": "uuid-abc123",
  "query": "Show me underrated sci-fi from the 90s"
}
```

**Response:**
- Assistant message
- Filtered movie list
- Parsed filter suggestions

---
## 6. ✅ Movie Actions

### `POST /user-movies`

Sets or updates the relationship between the current user and a movie.

**Used in:**  
- `MovieCard.jsx`  
- `MovieDetails.jsx`  
- Potentially any place where a user interacts with a movie

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: en
```

**Request Body:**
```json
{
  "tmdb_id": 12345,
  "status": "seen" // or "later", "not_interested", or "none"
}
```

### 💡 Notes:

- `status` accepts **one of** the following:
  - `"seen"` — movie marked as watched
  - `"later"` — saved to the watch later list
  - `"not_interested"` — excluded from future suggestions
  - `"none"` — removes the movie from all user lists

- Submitting a new status **overwrites any previous status** for that movie

**Response:**
```json
{ "success": true }
```

---


## 7. 📁 Movie Lists

Used to fetch movies by status: `seen`, `later`, `not_interested`.

### Endpoints:
- `GET /users/me/movies/seen`
- `GET /users/me/movies/later`
- `GET /users/me/movies/not-interested`

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: fr
```

**Response:**
- Array of enriched `MovieCard` data

---

## 8. 📊 User Stats

### `GET /users/me/stats`

**Used in:** `UserStats.jsx` (planned)

**Headers:**
```
Authorization: Bearer <JWT>
Accept-Language: en
```

**Response:**
```json
{
  "total_seen": 78,
  "top_genres": ["Thriller", "Drama"],
  "average_rating_seen": 7.6,
  "most_watched_years": [2014, 2019],
  "watch_later_count": 21
}
```

---

## 9. 🌍 Language Handling (Headers Only)

### Language is **always sent via header**:

```
Accept-Language: en
```

- Automatically injected via Axios interceptor
- Not passed as query param
- The backend uses this to:
  - Return localized titles, overviews, genres, trailers
  - Format assistant responses (chat)

---

## 10. 🚨 Error Handling

- 401/403 responses:
  - Triggers logout in `AuthContext`
  - Redirects to `/login`
- 500+ errors:
  - Show toast via `ToasterProvider`
- Validation errors:
  - Localized via `LanguageContext`
  - Displayed in `AuthForm` or inline

---

## 📌 Summary Table

| Endpoint                          | Method | Auth | Lang Header | Used In               |
|-----------------------------------|--------|------|-------------|------------------------|
| `/auth/signup`                   | POST   | ❌   | ❌          | `Signup.jsx`           |
| `/auth/login`                    | POST   | ❌   | ❌          | `Login.jsx`            |
| `/users/me`
