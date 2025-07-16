import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
