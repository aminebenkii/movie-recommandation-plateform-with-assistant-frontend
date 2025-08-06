
# ✅ Frontend TODO — MoviesYouDidntWatch.com

This document tracks the development progress of the frontend, from authentication to chat assistant integration and UI polish.

---

## 🔧 1. Core Setup

- [x] Vite + React + Tailwind configured
- [x] ShadCN UI installed
- [x] Axios instance with interceptors (`Authorization`, `Accept-Language`)
- [x] Router setup (`react-router-dom`)
- [x] Project structure finalized (`src/pages`, `components`, `context`, etc.)

---

## ✅ 2. Authentication


- [x] `AuthContext.jsx` with login/signup/logout logic
- [x] JWT stored in localStorage
- [x] `PrivateRoute.jsx` implemented
- [x] Redirect on invalid token
- [x] Add toast for login/signup failure

---

## 🎬 3. Movie Browsing

- [x] `MoviesBrowse.jsx` main page
- [x] `FiltersBar.jsx` with rating, votes, genre, year, sort
- [x] Default call to `/movies/search` with popularity sort
- [x] Display `MovieCard` in `MovieGrid`
- [x] `MovieDetails.jsx` modal on poster click
- [x] Action buttons: Seen / Later / Not Interested
- [x] Movie status POST request
- [x] Handle "none" status to unmark movie
- [x] Toast for movie actions (success/failure)

---

## 🗨️ 4. Assistant & Chat

- [ ] `ChatWindow.jsx` UI
- [ ] Query sent to `/chat` with `Accept-Language` + JWT
- [ ] Chat returns assistant message + filters
- [ ] Filters auto-apply in `FiltersBar`
- [ ] Preserve chat history in session
- [ ] Animate assistant typing (optional)

---

## 🌍 5. Language Support

- [x] `LanguageContext.jsx`
- [x] `LanguageToggle.jsx` in header + hero
- [x] Axios adds `Accept-Language` to all requests
- [ ] Chat and filter labels respond to toggle
- [x] Genres, overview, trailers localized
- [ ] Confirm fallback if language missing

---

## 📁 6. User Lists

- [ ] Pages: `Seen`, `WatchList`, `NotInterested`
- [ ] Calls to `/users/me/movies/:status`
- [ ] `GenreFilterBar.jsx` for local filtering
- [ ] Movie cards and details reused
- [ ] Add “undo” or “unmark” in Not Interested
- [ ] Show fallback message if list is empty

---

## 📊 7. Stats (Planned)

- [ ] Create `UserStats.jsx` page
- [ ] Fetch from `/users/me/stats`
- [ ] Show charts or summaries (genres, rating, years)
- [ ] Language-aware labels

---

## 🎨 8. UI/UX Polish

- [ ] IMDb-style Black & Yellow theme
- [ ] Full poster image on cards
- [ ] Responsive layout (grid + filters)
- [ ] Better mobile layout
- [ ] Scroll to top on navigation
- [ ] Transition between pages (optional)

---

## 🚨 9. Bugs / To Investigate

- [ ] Handle 401 → auto-logout and redirect
- [ ] Handle stale JWT gracefully
- [ ] Avoid duplicate movie cards
- [ ] Caching for chat results? (future)

---

## 🧪 10. Testing

- [ ] Add integration tests for `api.js`
- [ ] Test login/signup flows
- [ ] Unit test `AuthContext`, `LanguageContext`
- [ ] Mock assistant API in dev mode

---

## 🚀 11. Deployment (later)

- [ ] Setup environment variables (`VITE_API_URL`)
-
