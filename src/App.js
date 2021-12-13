import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login/Login";
import Logoff from "./components/Logoff/Logoff";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import APIProvider from "./components/APIProvider/APIProvider";
import TopNav from "./components/TopNav/TopNav";
import logo from "./static/logo.png";

function App() {
  return (
    <AuthProvider>
      <APIProvider>
        <div className="App">
          <Login />
          <img src={logo} className="mt-4 logo"></img>
          <TopNav />
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/logoff" element={<Logoff />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
