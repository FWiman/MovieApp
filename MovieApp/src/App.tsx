import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import ReactGA from "react-ga";
import "./Css/App.css";
import SearchMovies from "./Components/SearchMovies/SearchMovies";
import TrendingContent from "./Components/TrendingContent/TrendingContent";
import Navbar from "./Components/Navbar/Navbar";
import AboutPage from "./Components/AboutPage - ContactPage/AboutPage";
import ContactPage from "./Components/AboutPage - ContactPage/ContactPage";
import LoginPAge from "./Components/LoginPage/LoginPage";
import {
  UserContext,
  UserProvider,
} from "./Components/UserContext/userContext";

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

const trackingId = import.meta.env.REACT_APP_GA_TRACKING_ID || "UA-000000-2";

ReactGA.initialize(trackingId);

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize(trackingId);
      window.GA_INITIALIZED = true;
    }
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  const userContext = useContext(UserContext);

  return (
    <Router>
      <UserProvider>
        <div className="App">
          <GoogleAnalytics />
          {userContext && userContext.isUserLoggedIn && <Navbar />}
          <Routes>
            <Route path="/" element={<LoginPAge />} />
            <Route path="/trending" element={<TrendingContent />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
