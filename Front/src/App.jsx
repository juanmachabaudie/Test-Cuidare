import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Blog from "./Pages/blog";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //ESTE USE EFFECT SE HIZO CON EL OBJETIVO DE VERIFICAR SI EL USUARIO ESTA 
  //IDENTIFICADO Y ASI PODER INGRESAR A LAS RUTAS
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  //FUNCION QUE MANTIENE LA SESION
  const handleLogin = () => {
    setIsLoggedIn(true);
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    }, 300000);
  };

  //FUNCION QUE BORRA EL LOCALSTORAGE
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
