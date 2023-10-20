import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Blog from "./Pages/blog";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }, 1300000); //300000 = 5 minutos en milisegundos
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/blog" element={<Blog onLogout={handleLogout} />} />
      </Route>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes >
  )
}

export default App
