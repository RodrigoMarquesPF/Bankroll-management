import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Team from "./pages/Team";
import Methods from "./pages/Methods";
import Management from "./pages/Management";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/methods"
          element={
            <ProtectedRoute>
              <Methods />
            </ProtectedRoute>
          }
        />
        <Route path="/management/:id" element={<Management />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;