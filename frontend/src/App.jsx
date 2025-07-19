import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import MoviesBrowse from "./pages/MoviesBrowse";
import SeenHistory from "./pages/SeenHistory";
import WatchList from "./pages/WatchList";
import NotInterested from "./pages/NotInterested";
// import TVShowsBrowse from "./pages/TVShowsBrowse"; // optional
// import UserStats from "./pages/UserStats"; // planned

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/movies"
          element={
            <PrivateRoute>
              <MoviesBrowse />
            </PrivateRoute>
          }
        />
        <Route
          path="/seen"
          element={
            <PrivateRoute>
              <SeenHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <WatchList />
            </PrivateRoute>
          }
        />
        <Route
          path="/not-interested"
          element={
            <PrivateRoute>
              <NotInterested />
            </PrivateRoute>
          }
        />
        {/* Uncomment when implemented
        <Route
          path="/tv"
          element={
            <PrivateRoute>
              <TVShowsBrowse />
            </PrivateRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <UserStats />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
