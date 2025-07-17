# 👤 Frontend User Flow — MoviesYouDidntWatch.com

This document outlines the **user journey** and interactions on the frontend of the MoviesYouDidntWatch.com app, from landing to movie browsing, all with multilingual support and JWT-protected routes.

---

## 🎬 1. App Entry Flow

- When the user visits the site:
  - A short animation or loading screen plays for ~1 second (optional: cinematic flair).
  - After that, they’re redirected to the **Hero Page**.

---

## 🏠 2. Hero Page

- Background: a stylish image or video with a cinema vibe.
- Center of screen:
  - Two buttons:
    - `Sign Up`
    - `Login`
- Top-right corner:
  - Language toggle: `🇬🇧 EN / 🇫🇷 FR`
    - When toggled:
      - Buttons update:
        - `Sign Up` → `S'enregistrer`
        - `Login` → `Se connecter`
- ✅ No authentication required to view this page.

---

## 📝 3. Sign Up Page

- Form fields:
  - First Name
  - Last Name
  - Email
  - Password
- Button: `Create Account`
- Below the form:
  - Localized prompt:  
    `"Already have an account? Login"` / `"Vous avez déjà un compte ? Connectez-vous"`
- 🔐 On submit:
  - Sends a `POST /auth/signup` request to the backend.
  - ✅ After success, user is automatically logged in — no need to manually go to login.
  - ❌ No email confirmation yet (to avoid complexity in backend).

---

## 🔐 4. Login Page

- Form fields:
  - Email
  - Password
- Button: `Log In`
- Below the form:
  - `"Don’t have an account yet? Sign up"`  
  - Optional: `"Forgot password?"` (placeholder — to be implemented)
- 🔐 On submit:
  - Sends a `POST /auth/login` request to the backend.
  - Stores the JWT token in localStorage.
  - Redirects user to the **Main App Page**.

---

## 🔒 5. Protected Routes & Auth

- The **Main App Page** and all user-specific pages are protected:
  - Only accessible if JWT token is present in localStorage.
  - All API calls must include `Authorization: Bearer <JWT>`.
  - If not authenticated, user is redirected to `/login`.

---

## 🧭 6. Main App Layout

### ✅ Header (persistent)
- **Left:**  
  - App logo (clickable → returns to Hero Page)

- **Right (in order):**
  - `Hello, {FirstName}`  
    - Clickable → opens User Panel or navigation dropdown
  - `Logout` button

- **Middle Navigation:**
  - `Home` *(not implemented yet)*
  - `Movies` *(✅ handled)*
  - `TV Shows` *(not implemented yet)*
  - `Seen History`
  - `Watchlist`
  - `Not Interested`
  - `Statistics` *(planned later)*

- **Language Toggle:**  
  - Consider placing this on the header as well.

---

### ✅ Footer (persistent)

- Displays at the bottom of every page:
  - `"Made by AB 🍿 cinephile with ❤️"`  
  - Optional: link to GitHub or contact

---

## 🎥 7. Movies Page

### 🔍 Filter Bar (below the header)

- `Genre`: dropdown or tag-style selector
- `IMDb Rating`: slider (range from 1 to 10)
- `IMDb Votes`: slider (e.g. 1K to 2M)
- `Release Year`: double slider (select min and max)
- `Sort By`: dropdown  
  - `popularity.desc`  
  - `vote_average.desc`  
  - `vote_count.desc`
- `Search` button → fetches results manually
- `Ask Assistant` button:
  - Opens floating chatbot modal
  - Accepts natural language queries
  - Applies backend-recommended filters and triggers search

---

### 🧠 Default Behavior

- When user lands on `/movies`, the frontend automatically loads a **default list of popular movies**.
- No filter interaction is needed.
- Uses `sort_by: popularity.desc`

---

## 🧱 8. Movie Cards

Each movie is shown as a rich visual card.

### Card Elements:

- 🖼️ **Full Poster Image** (not cropped)
- 🔼 **Top-Left:**
  - IMDb rating badge
  - Vote count in `K` or `M`
- 🔼 **Top-Right:**
  - Release year

### 📦 Bottom Buttons (small icons):
- 👁️ Mark as Seen
- ⏱️ Add to Watchlist
- ❌ Mark as Not Interested

### 🔍 Card Expansion:
- Clicking the **middle of the poster** opens a full-width detail view:
  - **Left:** Large poster
  - **Right:**
    - Movie Title
    - Overview / description
    - Buttons: Seen, Watch Later, Not Interested (larger format)
    - Embedded YouTube trailer

---

## 📁 9. User Lists

Accessible from the navigation bar:

### ✅ Seen History
- Calls backend: `GET /users/me/movies/seen`
- Lists all marked movies
- (Optional: filter by genre/rating/year)

### ✅ Watchlist
- Calls backend: `GET /users/me/movies/later`

### ✅ Not Interested
- Calls backend: `GET /users/me/movies/not-interested`

---

## 📊 10. Statistics (Later)

Planned but not implemented yet.

May include:
- Total movies watched
- Top genres
- Average IMDb rating
- Watch time
- Favorite director/actor

---

## 🔮 11. Planned Additions

- 🔧 Email confirmation flow (signup)
- 🔐 Forgot password + password reset
- 📺 TV Shows
- 📊 Statistics panel
- 🔎 Search bar (global search)
- 🔗 Streaming links in movie detail view

---
