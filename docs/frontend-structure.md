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
frontend/
├── public/                       # Static assets like logos, icons, etc.
│   └── vite.svg
├── src/
│   ├── assets/                   # Logos, icons, or future static images
│   │   └── react.svg
│   ├── components/               # Reusable and global UI components
│   │   ├── AuthForm.jsx              # Shared login/signup form (used by pages)
│   │   ├── LanguageToggle.jsx        # Toggle to switch Beteen Frenhc and English
│   │   ├── SiteHeader.jsx            # Full top bar with navigation and language toggle
│   │   ├── SiteFooter.jsx            # Global footer with signature
│   │   ├── FiltersBar.jsx            # Bar with Search Filters and assistant button
│   │   ├── GenreFilterBar.jsx         # Genre-only filters shown on list pages
│   │   ├── MovieCard.jsx             # Compact visual movie info: poster, rating, actions
│   │   ├── MovieDetails.jsx          # Expanded view of a movie (poster, overview, trailer)
│   │   ├── MovieGrid.jsx             # Responsive grid layout to display multiple cards
│   │   ├── ChatWindow.jsx            # Full assistant chat interface (float/modal)
│   │   │   
│   │   ├── ui/                       # ShadCN customized base components
│   │   │    ├── badge.jsx
│   │   │    ├── button.jsx
│   │   │    ├── card.jsx
│   │   │    ├── input.jsx
│   │   │    ├── navigation-menu.jsx
│   │   │    ├── separator.jsx
│   │   │    └── textarea.jsx
│   │   │
│   │   └── providers/                 # ShadCN customized base components
│   │         └── ToasterProvider.jsx
│   │ 
│   ├── context/
│   │   ├── LanguageContext.jsx       # Language Storage
│   │   └── AuthContext.jsx           # JWT storage, login/signup, auth status

│   ├── lib/
│   │   └── utils.js                  # Reusable helpers (e.g. debounce, token injection)
│   ├── pages/                        # Top-level route views
│   │   ├── PreHero.jsx               # 1-second loading animation before Hero
│   │   ├── Hero.jsx                  # Landing page (Sign Up / Login)
│   │   ├── Login.jsx                 # Login Page with form
│   │   ├── Signup.jsx                # Signup Page with form
│   │   ├── MoviesBrowse.jsx          # Main app view with filters, chat, cards
│   │   ├── Seen.jsx                  # Seen history
│   │   ├── WatchList.jsx             # User's "Watch Later" list
│   │   ├── NotInterested.jsx         # Rejected movies
│   │   └── UserStats.jsx             # (Future) personal stats overview
│   ├── utils/
│   │   ├── api.js                    # API request wrappers (with token header)
│   │   └── format.js                 # Format vote counts, years, ratings, etc.
│   ├── App.jsx                       # Main router setup
│   └── main.jsx                      # React entrypoint
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
