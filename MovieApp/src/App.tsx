import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";
import MoviesPage from "./Components/MoviesComponent/MoviesComponent";
import SeriesPage from "./Components/SeriesComponent/SeriesComponent";
import "./Css/App.css";

const App: React.FC = () => {
  return (
    <div className="app-background">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
