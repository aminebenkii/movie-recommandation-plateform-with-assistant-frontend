# 🧱 Frontend Structure — MoviesYouDidntWatch.com

This document describes the technical structure and design philosophy behind the **frontend** of the MoviesYouDidntWatch.com web app.

---

## 🧰 1. Tech Stack Overview

- **Framework:** React (with Vite)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com) (built on Radix + Tailwind)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context (`AuthContext`)
- **Language Support:** EN / FR toggle (handled in global layout)
- **Theme:** **Black & Yellow** (inspired by IMDb)
- **AI Assistant:** Floating chat interface for natural language filtering

---

## 🗂️ 2. Project Layout

Below is a cleaned-up view of your `frontend/` folder with purpose annotations.

```
./
├── DevNotes.md                         # Developer notes and work log
├── docs/                               # Documentation related to frontend structure and flow
│   ├── components.md
│   ├── frontend-api-calls.md
│   ├── frontend-structure.md
│   ├── frontend-todo.md
│   ├── frontend-user-flow.md
│   └── pages.md
├── frontend/
│   ├── .gitignore
│   ├── README.md
│   ├── components.json                 # Custom component registry/config (if used)
│   ├── eslint.config.js
│   ├── index.html                      # Entry point for Vite
│   ├── jsconfig.json                   # JS tooling config (e.g., for path aliases)
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── public/                         # Static assets like logos, icons, etc.
│   │   └── vite.svg
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       ├── assets/                     # Logos, backgrounds, images
│       │   ├── bg.png
│       │   ├── imdb.png
│       │   ├── logo.png
│       │   ├── logonobg.png
│       │   └── react.svg
│       ├── components/                 # Reusable and global UI components
│       │   ├── PrivateRoute.jsx        # Guarded route for protected pages
│       │   ├── SiteElements/           # Site-wide layout elements
│       │   │   ├── GreetingMessage.jsx
│       │   │   ├── LanguageToggle.jsx
│       │   │   ├── LogOutButton.jsx
│       │   │   ├── NavigationBar.jsx
│       │   │   ├── SiteFooter.jsx
│       │   │   └── SiteHeader.jsx
│       │   ├── FiltersBar/             # Search filters and assistant helpers
│       │   │   ├── AskAssistantButton.jsx
│       │   │   ├── FiltersBar.jsx
│       │   │   ├── GenreFilterBar.jsx
│       │   │   ├── GenreSelector.jsx
│       │   │   ├── RatingSlider.jsx
│       │   │   ├── SearchButton.jsx
│       │   │   ├── SortSelector.jsx
│       │   │   ├── VotesSlider.jsx
│       │   │   └── YearRangeSlider.jsx
│       │   ├── ChatElements/           # Chat assistant interface
│       │   │   ├── ChatWindow.jsx
│       │   │   └── MessageBubble.jsx
│       │   ├── MovieElements/          # Movie-specific components
│       │   │   ├── GenreNameBadge.jsx
│       │   │   ├── ImdbBadge.jsx
│       │   │   ├── MovieCard.jsx
│       │   │   ├── MovieDetails.jsx
│       │   │   ├── MovieGrid.jsx
│       │   │   ├── ToHiddenButton.jsx
│       │   │   ├── ToSeenButton.jsx
│       │   │   ├── ToWatchListButton.jsx
│       │   │   └── YearBadge.jsx
│       │   ├── ui/                     # ShadCN customized base components
│       │   │   ├── avatar.jsx
│       │   │   ├── badge.jsx
│       │   │   ├── button.jsx
│       │   │   ├── card.jsx
│       │   │   ├── input.jsx
│       │   │   ├── navigation-menu.jsx
│       │   │   ├── separator.jsx
│       │   │   ├── slider.jsx
│       │   │   ├── dualslider.jsx
│       │   │   ├── textarea.jsx
│       │   │   ├── toggle.jsx
│       │   │   └── toggle-group.jsx
│       ├── context/                    # Global state management (React context)
│       │   ├── AuthContext.jsx
│       │   └── LanguageContext.jsx
│       ├── lib/                        # Shared helper logic
│       │   └── utils.js
│       ├── providers/                  # Global providers (e.g., toast)
│       │   └── ToasterProvider.jsx
│       ├── utils/                      # API and formatting logic
│       │   ├── api.js
│       │   └── format.js
│       └── pages/                      # Main application routes
│           ├── Hero.jsx
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── MoviesBrowse.jsx
│           ├── NotInterested.jsx
│           ├── SeenHistory.jsx
│           ├── SignUp.jsx
│           ├── TVShowsBrowse.jsx
│           ├── UserStats.jsx
│           └── WatchList.jsx

```

---

## 🔁 3. Routing

- Managed in `App.jsx`
- Uses `react-router-dom`
- **Public routes** (accessible without login):
  - `/` → `PreHero` → `Hero`
  - `/login`
  - `/signup`
- **Protected routes** (JWT required):
  - `/movies`
  - `/seen`
  - `/watchlist`
  - `/not-interested`
  - `/stats` *(not implemented yet)*
- Protected using a `PrivateRoute` component (checks AuthContext)

---

## 🧠 4. Auth Context

Defined in `context/AuthContext.jsx`.

**Responsibilities:**
- Storing JWT in localStorage
- Setting auth state across app
- Handling login/signup flows
- Injecting token into `api.js` requests
- Exposing `user`, `login()`, `logout()`, etc.
- Redirecting unauthenticated users when needed

---

## 💡 5. Layout Philosophy

### 🔼 SiteHeader
- Appears on all protected pages
- Contains:
  - App logo (clickable)
  - Navigation: Movies, Seen, Watchlist, Not Interested, Stats (future)
  - Language toggle (🇬🇧 / 🇫🇷)
  - `Hello, {FirstName}` and `Logout` button

### 🔽 SiteFooter
- Simple text like:
  - `"Made by 🍿 cinephiles with ❤️"`
  - Optional links to GitHub or credits

---

## 🎥 6. Movie Browsing Components

### `MovieCard.jsx`
- Displays:
  - Poster (full, not cropped)
  - IMDb badge (up left) Has Rating and Vote count.
  - Release year (up right)
  - Genres (Under image Poster)
  - Buttons:
    - 👁️ Seen (botton Left)
    - ⏱ Watch Later ( bottom Center)
    - ❌ Not Interested (Bottom Right)

### `MovieDetails.jsx`
- Expanded view (on click of a MovieCard Poster):
  - Left: Poster
  - Right: Title, Overview, Buttons, Embedded YouTube trailer

### `MovieGrid.jsx`
- Responsive layout that arranges multiple `MovieCard`s into a grid
- Used across `MoviesBrowse`, `Seen`, `WatchList`, and `NotInterested`

---

## 🗨️ 7. AI Chat Assistant

### Triggered via click on button in the FiltersBar.
- Button that floats on screen
- On click → opens `ChatWindow.jsx` modal

### `ChatWindow.jsx`
- Allows users to:
  - Type natural language queries (e.g. “90s sci-fi with great ratings”)
  - Get back filter recommendations
  - Automatically update filters + trigger movie search

- State is synced with manual filters

---

## 🎨 8. Theming and Design

- Theme: **IMDb-inspired black and yellow**
  - Consider using Tailwind’s dark mode + custom `theme.extend.colors`
- ShadCN UI components are customized via:
  - `button.jsx`, `input.jsx`, `badge.jsx` in `components/ui/`
- Fonts, colors, and spacing should be kept consistent

---

## 📏 9. Component Design Philosophy

- Avoid unnecessary fragmentation
  - ✅ Use `MovieCard.jsx` as the smallest reusable block
  - ❌ Avoid creating `RatingBadge.jsx`, `VoteCounter.jsx` unless reused
- Follow **"smart layout, dumb components"**:
  - Pages handle state, API logic
  - Components are pure and focused

---

## 📍 10. Future Considerations

- Add `LanguageContext` (or global i18n support)
- Group public vs protected routes in `App.jsx`
- Support dark/light switch (optional)
- Add toast notifications (login success, errors, etc.)

---
