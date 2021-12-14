import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login/Login";
import TopNav from "./components/TopNav/TopNav";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Logoff from "./components/Logoff/Logoff";
import Dashboard from "./components/Dashboard/Dashboard";
import Learn from "./components/Learn/Learn";
import Basics from "./components/Basics/Basics";
import Advanced from "./components/Advanced/Advanced";
import Explore from "./components/Explore/Explore";
import Painter from "./components/Painter/Painter";
import Painters from "./components/Painters/Painters";
import Project from "./components/Project/Project";
import Projects from "./components/Projects/Projects";
import Game from "./components/Game/Game";
import Games from "./components/Games/Games";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import APIProvider from "./components/APIProvider/APIProvider";
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
              <Route path="/explore" element={<Explore />}>
                <Route path="painters" element={<Painters />} />
                <Route path="painters/:painterId" element={<Painter />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:projectId" element={<Project />} />
                <Route path="games" element={<Games />}>
                  <Route path=":gameId" element={<Game />} />
                </Route>
              </Route>
              <Route path="/learn" element={<Learn />}>
                <Route path="basics" element={<Basics />} />
                <Route path="advanced" element={<Advanced />} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
