import "./Css/App.css";
import SearchMovies from "./Components/SearchMovies";
import TrendingContent from "./Components/TrendingContent";

function App() {
  return (
    <div className="App">
      <video
        className="background-video"
        src={`${import.meta.env.BASE_URL}4K_12.mp4`}
        autoPlay
        loop
        muted
      />
      <h1 className="heading">Movie App</h1>
      <SearchMovies />
      <TrendingContent />
    </div>
  );
}

export default App;
