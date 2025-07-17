# 🧩 UI Components — MoviesYouDidntWatch.com

This document describes all shared and reusable UI components used in the frontend of the app. Each component is designed to be modular, minimal, and tied to user interactions or visual display.

---

## 🎬 Supported Genres

These are the genre options available in filters (both manual and assistant-powered):

```
"action", "adventure", "animation", "comedy", "crime", "documentary",
"drama", "family", "fantasy", "history", "horror", "music", "mystery",
"romance", "science fiction", "tv movie", "thriller", "war", "western"
```

---

## 📊 Supported Sort Options

These are the sort options shown to the user (without `.desc` suffix):

```
"popularity", "vote_average", "vote_count"
```

Internally, all sort queries are sent as `*.desc` to the backend.

---

## 1. `SiteHeader.jsx`

- **Purpose:**  
  Displays the top navigation bar across all protected pages.

- **Features:**
  - Logo (clickable, routes to home or `/movies`)
  - Navigation links: Movies, Seen, Watchlist, Not Interested, Stats (future)
  - Language toggle
  - `Hello, {FirstName}` greeting
  - Logout button

---

## 2. `SiteFooter.jsx`

- **Purpose:**  
  Simple persistent footer for branding and optional links.

- **Features:**
  - Static text: `"Made by 🍿 cinephiles with ❤️"`
  - (Optional) GitHub / About links

---

## 3. `LanguageToggle.jsx`

- **Purpose:**  
  Allows the user to switch between English and French.

- **Props:**  
  None (uses `LanguageContext` internally)

- **Behavior:**
  - On toggle, updates global language context
  - Labels and text across the app re-render accordingly

---

## 4. `FiltersBar.jsx`

- **Purpose:**  
  Manual filtering UI for the `/movies` page.

- **Includes:**
  - Genre dropdown
  - IMDb rating slider
  - IMDb vote count slider
  - Release year range slider (double-ended)
  - Sort by dropdown (`popularity`, `vote_average`, `vote_count`)
  - `Search` button
  - `Ask Assistant` button (opens `ChatWindow`)

- **Behavior:**  
  Syncs with assistant state and updates query filters.

---

## 5. `GenreFilterBar.jsx`

- **Purpose:**  
  Lightweight filter bar used on list pages (Seen, WatchList, NotInterested)

- **Includes:**
  - Genre-only toggle/filter chips or checkboxes

- **Behavior:**  
  Applies filters **client-side** to limit movie display by genre.

---

## 6. `MovieCard.jsx`

- **Purpose:**  
  Compact, visual representation of a single movie.

- **Displays:**
  - Poster (uncropped)
  - IMDb rating badge (top-left)
  - Vote count (top-left, next to rating)
  - Release year (top-right)
  - Genres (under the poster)
  - Buttons:
    - 👁️ Mark as Seen
    - ⏱ Add to Watch Later
    - ❌ Mark as Not Interested

- **Events:**
  - Clicking the poster opens `MovieDetails`

---

## 7. `MovieDetails.jsx`

- **Purpose:**  
  Expanded detail view for a movie (modal or section view).

- **Displays:**
  - Large poster (left)
  - Title, overview (right)
  - Trailer (embedded YouTube)
  - Repeated action buttons (Seen, Watch Later, Not Interested)

---

## 8. `MovieGrid.jsx`

- **Purpose:**  
  Layout component for rendering a list of movies in grid format.

- **Used in:**
  - `MoviesBrowse`
  - `Seen`, `WatchList`, `NotInterested`

- **Props:**
  ```js
  movies: Array<MovieCardData>
  ```

---

## 9. `ChatWindow.jsx`

- **Purpose:**  
  Assistant chat modal for natural language filtering.

- **Features:**
  - Accepts natural queries (e.g. "romantic comedies from the 2000s")
  - Calls backend `/chat` endpoint
  - Parses response and updates filters
  - Chat remains open while updating filters in the UI

- **State:**
  - Controlled internally
  - Integrated with filters through context or props

---

## 10. `AuthForm.jsx`

- **Purpose:**  
  Shared form component for both `Login.jsx` and `Signup.jsx`.

- **Props:**
  ```js
  mode: "login" | "signup"
  onSubmit: (formData) => void
  ```

- **Fields:**
  - Email, Password (for login)
  - First Name, Last Name, Email, Password (for signup)

- **Localization:**  
  Labels should change with current language

---

## 11. `PrivateRoute.jsx`

- **Purpose:**  
  Wrapper component that protects routes from unauthenticated access.

- **Behavior:**
  - If JWT exists → renders child component
  - If JWT missing or invalid → redirects to `/login`

- **Usage:**
  ```jsx
  <PrivateRoute>
    <MoviesBrowse />
  </PrivateRoute>
  ```

---

## 12. `ToasterProvider.jsx`

- **Purpose:**  
  Global notification system provider using `sonner` or `react-hot-toast`.

- **Behavior:**
  - Automatically added to layout in `App.jsx`
  - Can be triggered with success/error messages from any component

- **Usage:**
  ```js
  import { toast } from "sonner";
  toast.success("Movie marked as seen!");
  ```

---

## 📌 Notes on Component Conventions

- 📁 All components live in `src/components/`
- 📁 ShadCN UI base components are inside `components/ui/`
- 📁 Providers like `ToasterProvider` and `LanguageContext` go inside `components/providers/` and `context/`
- ✅ Keep components **focused and modular**
- ❌ Avoid breaking things down too far unless reused in many places

---
