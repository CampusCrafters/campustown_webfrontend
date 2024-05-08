import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Resumedemo from "./pages/Resumedemo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/resume" element={<Resumedemo />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
