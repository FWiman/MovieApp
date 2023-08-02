import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga";
import "./Css/App.css";
import { UserProvider } from "./Components/UserContext/userContext";
import MainApp from "./Components/MainApp/MainApp";

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
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <GoogleAnalytics />
          <MainApp />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
