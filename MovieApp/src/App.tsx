import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Css/App.css";
import SearchMovies from "./Components/SearchMovies";
import TrendingContent from "./Components/TrendingContent";
import Navbar from "./Components/Navbar";
import AboutPage from "./Components/AboutPage";
import ContactPage from "./Components/ContactPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/" element={<TrendingContent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
