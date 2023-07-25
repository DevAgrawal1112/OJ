import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Problems from "./components/Problems";
import ProblemsPage from "./components/ProblemPage";
import Submissions from "./components/Submissions";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [auth, setAuth] = useState(false);

  const handleAuthChange = (value) => {
    setAuth(value);
    window.location.reload();
  };

  return (
    <>
      <BrowserRouter>
        <NavBar auth={auth} handleAuthChange={handleAuthChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:pid/" element={<ProblemsPage />} />
          <Route path="/submissions/:pid/" element={<Submissions />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login handleAuthChange={handleAuthChange} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
