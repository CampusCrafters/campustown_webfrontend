import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Resumedemo from "./pages/Resumedemo";
import useTokenVerification from "./hooks/auth/useTokenVerification";

function App() {
  const user = useTokenVerification();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard"/>}></Route>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard"/>}></Route>
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>}></Route>
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login"/>}></Route>
        <Route path="/resume" element={user ? <Resumedemo /> : <Navigate to="/login"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
