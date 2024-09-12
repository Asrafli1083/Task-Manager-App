// build navigation pages between different pages using react-router-dom
// App.jsx file is the root of todos application
import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// func to logout
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// func to reg and logout
function RegisterAndLogout() {
  // when registering, it will clear the localstorage(so we don't have any old access
  // tokens with) without submitting the access for token
  localStorage.clear();
  return <Register />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Cannot acces the Home page unless have the access token by bypassing protectedroute */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<RegisterAndLogout />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
