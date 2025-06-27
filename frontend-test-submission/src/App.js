// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlStatsPage from "./pages/UrlStatsPage";
import RedirectHandler from "./components/RedirectHandler";
import LogButton from "./components/LogButton";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<UrlStatsPage />} />
        <Route path="/log" element={<LogButton />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
