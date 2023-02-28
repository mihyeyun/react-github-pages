import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Weather from "./pages/AI/Weather.js";
import Shopping from "./pages/shop/Shopping.js";
import Topbar from "./pages/topbar/Topbar.js";
import Intro from './pages/intro/Intro.js';
import Portfolio from './pages/portfolio/Portfolio.js';
import Works from './pages/works/Works.js';
import Menu from "./pages/menu/Menu.js";
import './app.scss';

function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <div className="sections">
                <Intro />
                <Portfolio />
                <Works />
              </div>
            </div>
          }
        ></Route>
        <Route path="/weather" element={<Weather />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
      </Routes>
    </>
  );
}

export default App;

