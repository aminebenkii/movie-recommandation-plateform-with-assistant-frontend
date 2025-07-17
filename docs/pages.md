# 📄 Pages — MoviesYouDidntWatch.com

This document outlines each main page in the app, its purpose, components used, user interactions, and language behavior. All route-level pages live under `src/pages/`.

---

## 1. `PreHero.jsx`

- **Path:** `/`
- **Auth Required:** ❌ No
- **Purpose:**  
  Short intro animation or visual loader (1 second)

- **Behavior:**
  - After 1s delay, redirects to `/hero`
  - Language toggle not present yet

---

## 2. `Hero.jsx`

- **Path:** `/hero`
- **Auth Required:** ❌ No
- **Purpose:**  
  Landing page for new or unauthenticated users

- **Components Used:**
  - `LanguageToggle`
  - Two buttons: `Login`, `Sign Up`

- **Language Behavior:**
  - Toggling language instantly updates:
    - Button text
    - Page headline (if any)
    - Footer (if shown)

---

## 3. `Login.jsx`

- **Path:** `/login`
- **Auth Required:** ❌ No
- **Purpose:**  
  User login screen

- **Components Used:**
  - `AuthForm` (`mode="login"`)
  - `LanguageToggle`

- **Language Behavior:**
  - Language toggle updates:
    - Form labels (`Email`, `Password`)
    - Placeholders
    - Buttons (`Log In`, `Don’t have an account?`)
    - Error messages
    - Toast messages
  - All text has EN + FR version internally via translation map or `t()` helper

- **Behavior:**
  - Submits to `/auth/login`
  - On success:
    - Stores JWT
    - Redirects to `/movies`

---

## 4. `Signup.jsx`

- **Path:** `/signup`
- **Auth Required:** ❌ No
- **Purpose:**  
  User registration screen

- **Components Used:**
  - `AuthForm` (`mode="signup"`)
  - `LanguageToggle`

- **Language Behavior:**
  - Toggle updates:
    - Field labels (`First Name`, `Last Name`, `Email`, `Password`)
    - Button text
    - Validation messages
    - Error feedback
  - All labels and messages localized using `LanguageContext`

- **Behavior:**
  - Sends form to `/auth/signup`
  - On success:
    - Logs user in
    - Redirects to `/movies`

---
## 5. `Home.jsx`
---

## 5. `MoviesBrowse.jsx`

- **Path:** `/movies`
- **Auth Required:** ✅ Yes
- **Purpose:**  
  Main movie discovery interface with filters and assistant

- **Components Used:**
  - `SiteHeader` (includes `LanguageToggle`)
  - `FiltersBar` (fully localized)
  - `ChatWindow` (localized queries + answers)
  - `MovieGrid` + `MovieCard`
  - `MovieDetails`
  - `SiteFooter`

- **Language Behavior:**
  - Language toggle updates:
    - Filter labels (e.g. “Rating”, “Genre”)
    - Chat assistant instructions + replies
    - Genre names
    - Button tooltips
    - Movie data (fetched with `lang=fr/en`)
    - Trailers (based on language)

- **API Behavior:**
  - `/movies/search?lang=fr` is used to retrieve localized titles, overviews, genres, and trailers.

---
## 6. `TVShowsBrowse.jsx`
---

## 6. `Seen.jsx`

- **Path:** `/seen`
- **Auth Required:** ✅ Yes
- **Purpose:**  
  Displays movies marked as seen by the user

- **Components Used:**
  - `SiteHeader`
  - `GenreFilterBar`
  - `MovieGrid` + `MovieCard`
  - `SiteFooter`

- **Language Behavior:**
  - GenreFilterBar adapts genres to selected language
  - Movie cards reflect localized titles and genres
  - Headers and tooltips update on toggle

- **API:**
  - Calls `/users/me/movies/seen?lang=fr`

---

## 7. `WatchList.jsx`

- **Path:** `/watchlist`
- **Auth Required:** ✅ Yes
- **Purpose:**  
  Displays user's "Watch Later" queue

- **Components Used:**
  - `SiteHeader`
  - `GenreFilterBar`
  - `MovieGrid`
  - `SiteFooter`

- **Language Behavior:**
  - Genre list is localized
  - UI labels, buttons, and movie metadata reflect current language
  - Toggle affects everything immediately

- **API:**
  - `/users/me/movies/later?lang=fr`

---

## 8. `NotInterested.jsx`

- **Path:** `/not-interested`
- **Auth Required:** ✅ Yes
- **Purpose:**  
  Shows movies the user rejected

- **Components Used:**
  - `SiteHeader`
  - `GenreFilterBar`
  - `MovieGrid`
  - `SiteFooter`

- **Language Behavior:**
  - Genre names, actions, and messages follow selected language
  - Toggle affects display and API call

- **API:**
  - `/users/me/movies/not-interested?lang=fr`

---

## 9. `UserStats.jsx` *(Planned)*

- **Path:** `/stats`
- **Auth Required:** ✅ Yes
- **Purpose:**  
  Visual overview of user activity and preferences

- **Components (Planned):**
  - `SiteHeader`
  - Data charts
  - Stat summary cards
  - `SiteFooter`

- **Language Behavior:**
  - All labels and titles for charts/stats must respond to current language
  - Example: “Top Genres” → “Genres préférés”

---

## 🌍 Language Behavior Summary

| Page             | Language Toggle | UI Labels | API Requests Use `lang` | Movie Data Localized |
|------------------|------------------|------------|----------------------------|------------------------|
| `/`              | ❌               | N/A        | ❌                         | ❌                     |
| `/hero`          | ✅               | ✅         | ❌                         | ❌                     |
| `/login`         | ✅               | ✅         | ❌                         | ❌                     |
| `/signup`        | ✅               | ✅         | ❌                         | ❌                     |
| `/movies`        | ✅               | ✅         | ✅ `/movies/search?lang=fr`| ✅                     |
| `/seen`          | ✅               | ✅         | ✅                         | ✅                     |
| `/watchlist`     | ✅               | ✅         | ✅                         | ✅                     |
| `/not-interested`| ✅               | ✅         | ✅                         | ✅                     |
| `/stats`         | ✅               | ✅         | ✅ (future)                | ✅ (future)            |

---

## 🧠 Important Notes

- Every page must listen to `LanguageContext`
- All strings must have both EN + FR variants
- Static labels should be centralized in a translation helper like:

```js
t("email") // returns "Email" or "Adresse e-mail"
```

- Chat assistant response + filters adapt to selected language
- Genre mapping (ID → name) uses `genres_mapping.json` localized

---
