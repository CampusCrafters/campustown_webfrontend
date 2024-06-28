import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import useTokenVerification from "./hooks/auth/useTokenVerification";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import Projects from "./pages/home/explore-all/Projects";
import Resumedemo from "./pages/Resumedemo";
import EventsPage from "./pages/EventsPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import PostProject from "./pages/PostProject";
import MyApplications from "./pages/MyApplications";
import { Toaster } from "@/components/ui/toaster";
import ChatPage from "./pages/ChatPage";
import ManageProjects from "./pages/ManageProjects";

//comment1
function App() {
  const { user, loading } = useTokenVerification();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    setAuthLoading(loading);
  }, [loading]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route
            path="/"
            element={!user ? <LandingPage /> : <Navigate to="/explore-all" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/explore-all" />}
          />
          <Route
            path="/"
            element={user ? <Layout /> : <Navigate to="/login" />}
          >
            <Route path="explore-all" element={<Projects />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="resume" element={<Resumedemo />} />
            <Route path="postProject" element={<PostProject />} />
            <Route path="myApplications" element={<MyApplications />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="Manageproject" element={<ManageProjects />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
