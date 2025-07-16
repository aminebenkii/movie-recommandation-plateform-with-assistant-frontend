# 🎨 DevNotes.md – Frontend (MVP)  
**MoviesYouDidntWatch.com – React Frontend**

---

## ⚙️ Tech Stack

- **Framework**: React (Vite)
- **Language**: JavaScript
- **Styling**: TailwindCSS
- **UI Kit**: Shadcn UI
- **Routing**: React Router DOM
- **HTTP**: Axios
- **State Management**: React Context (`AuthContext`)
- **Token Handling**: LocalStorage (JWT)
- **UUID**: `uuid` package
- **Components**: Shadcn-generated + custom components

---

## 🗂 Folder Structure

```
src/
├── components/
│   ├── AuthForm.jsx
│   ├── ChatBox.jsx
│   ├── ChatInput.jsx
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   ├── SiteHeader.jsx
│   ├── SiteFooter.jsx
│   ├── FloatingChatToggle.jsx
│   ├── ChatWindow.jsx
│   ├── ui/                         # Shadcn UI components (Button, Badge, etc.)
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Hero.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ChatPage.jsx
├── utils/
│   └── api.js
├── App.jsx
├── main.jsx
```

---

## 📃 Pages Summary

### 🔹 `Hero.jsx`
- Landing page
- Text: “Welcome to MoviesYouDidntWatch.com – Find your next favorite film.”
- Buttons:
  - 📝 Register → `/register`
  - 🔐 Login → `/login`

---

### 🔹 `Register.jsx`
- Uses `AuthForm`
- Fields: `First Name`, `Last Name`, `Email`, `Password`
- On submit: `POST /auth/register`
- Redirects to login on success
- Link: "Already have an account? Login"

---

### 🔹 `Login.jsx`
- Uses `AuthForm`
- Fields: `Email`, `Password`
- On submit: `POST /auth/login`
- Stores JWT in localStorage
- Calls `login()` from AuthContext
- Redirects to `/app`
- Link: "Don't have an account? Register"

---

### 🔹 `ChatPage.jsx`
- Protected route via `PrivateRoute`
- Displays full-page **movie grid**
- Floating 💬 chat icon (bottom-right)
- On click → opens floating `ChatWindow`
- Sends `POST /chat` with `session_id` + `message`
- Receives:
  - Assistant reply
  - List of recommended movies
- Updates movie grid and chat history

---

## 💬 Chat Components

### 🔹 `FloatingChatToggle.jsx`
- Bottom-right floating icon
- Toggles `ChatWindow`

### 🔹 `ChatWindow.jsx`
- Floating pop-up over movie grid
- Contains:
  - Header with assistant title and close button
  - `ChatBox` for messages
  - `ChatInput` for user input

### 🔹 `ChatBox.jsx`
- Displays assistant + user messages
- Scrollable area

### 🔹 `ChatInput.jsx`
- Sends user message to backend
- Updates messages and movie results

---

## 🎬 Movie Display

### 🔹 `MovieGrid.jsx`
- Renders a responsive 3x4 grid of `MovieCard`s

### 🔹 `MovieCard.jsx`
Displays:
- 🖼 Poster image
- 📅 Year
- ⭐ IMDb rating
- ▶️ Watch trailer (opens in new tab)
- ✅ Mark as seen (upcoming feature)

---

## 🧠 Auth Context

### 🔹 `AuthContext.jsx`
Handles:
```js
{
  token, user, isAuthenticated,
  login(jwt), logout()
}
```

- Token stored in `localStorage`
- Automatically includes JWT in all Axios requests via `utils/api.js`

---

## 🔐 `utils/api.js`
Sets up Axios instance:

```js
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // or env var
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## ✅ Features Completed

| Feature | Status |
|--------|--------|
| Register (`/auth/register`) | ✅ |
| Login (`/auth/login`) | ✅ |
| JWT persistence | ✅ |
| AuthContext with login/logout | ✅ |
| Routing (`/`, `/login`, `/register`, `/app`) | ✅ |
| Private route protection | ✅ |
| Chat assistant (`/chat`) | ✅ |
| Movie grid rendering | ✅ |
| Floating chat toggle + window | ✅ |
| Component scaffolding (Shadcn UI) | ✅ |

---

## 🔜 Next Features

| Task | Priority |
|------|----------|
| [ ] `POST /seen` on “Mark as Seen” | 🔥 |
| [ ] Open trailers in new tab | 🔥 |
| [ ] Show loading state in chat | ⚙️ |
| [ ] Toasts for errors/success | ⚙️ |
| [ ] `/me` stats page | 🔜 |
| [ ] French i18n support | 🌍 |
| [ ] Mobile responsive layout | 📱 |

---

## 🧪 Dev Tips

- 🧠 Use `ChatWindow` instead of split-screen layout for modern UX
- 📦 Store tokens safely; context handles session logic
- 🧼 Use Tailwind for rapid layout fixes
- 🧪 Add loaders and error fallback later in MVP polish

---

