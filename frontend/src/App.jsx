import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import MoviesBrowse from "./pages/MoviesBrowse";

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
      </Routes>
    </Router>
  );
}

export default App;
