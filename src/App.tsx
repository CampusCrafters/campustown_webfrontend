import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Projects from "./pages/Projects";
import Resumedemo from "./pages/Resumedemo";
import useTokenVerification from "./hooks/auth/useTokenVerification";

function App() {
  const user = useTokenVerification();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/projects"/>}></Route>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/projects"/>}></Route>
        <Route path="/projects" element={user ? <Layout><Projects /></Layout>: <Navigate to="/login"/>}></Route>
        <Route path="/profile" element={user ? <Layout><ProfilePage /></Layout> : <Navigate to="/login"/>}></Route>
        <Route path="/resume" element={user ? <Layout><Resumedemo /></Layout> : <Navigate to="/login"/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
