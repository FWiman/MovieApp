import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import LoginPage from "../LoginPage/LoginPage";
import TrendingContent from "../TrendingContent/TrendingContent";
import AboutPage from "../AboutPage - ContactPage/AboutPage";
import ContactPage from "../AboutPage - ContactPage/ContactPage";
import SearchMovies from "../SearchMovies/SearchMovies";
import { useShouldShowNavbar } from "../../hooks/useShouldShowNavbar";

const MainApp: React.FC = () => {
  const shouldShowNavbar = useShouldShowNavbar();

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trending" element={<TrendingContent />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
};

export default MainApp;
