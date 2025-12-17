import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [page, setPage] = useState("landing");

  // Check login status on refresh
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      setPage("dashboard");
    }
  }, []);

  function goToDashboard() {
    localStorage.setItem("loggedIn", "true");
    setPage("dashboard");
  }

  function logout() {
    localStorage.removeItem("loggedIn");
    setPage("landing");
  }

  return (
    <>
      {page === "landing" && <Landing goToDashboard={goToDashboard} />}
      {page === "dashboard" && <Dashboard logout={logout} />}
    </>
  );
}

export default App;
