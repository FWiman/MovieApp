import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { getTrendingMovies, getTrendingTvShows } from "../../Server/api";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../types";

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        const moviesResponse = await getTrendingMovies();
        const tvShowsResponse = await getTrendingTvShows();
        setMovies(moviesResponse.results.slice(0, 5));
        setTvShows(tvShowsResponse.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching trending content", error);
      }
    };

    fetchTrendingContent();
  }, []);

  const handleCardClick = (movie: Movie) => {
    console.log(movie);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.topSection}>
        <img
          src="MovieApp/src/assets/joker-4k-poster-1920x1080_666674-mm-90.jpg"
          alt="Website banner"
          className={styles.bannerImage}
        />
        <div className={styles.info}>
          <h1>Welcome to StreamWatch</h1>
          <p>
            Discover where to stream your favorite movies and TV shows.
            StreamWatch is your ultimate guide to finding the best streaming
            platforms for the latest and greatest in entertainment. Stay updated
            with trending movies and series, explore detailed information, and
            find out where to watch with just a few clicks.
          </p>
          <p>
            Whether you are into blockbuster hits, indie gems, or binge-worthy
            TV series, StreamWatch has got you covered. Dive into our extensive
            library and never miss out on the entertainment you love!
          </p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.contentList}>
          <div className={styles.movieList}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleCardClick}
                isCarouselItem={false}
                isBigCarouselItem={false}
                logos={[]} // Provide the appropriate logos
              />
            ))}
          </div>
        </div>
        <div className={styles.contentList}>
          <div className={styles.tvShowList}>
            {tvShows.map((tvShow) => (
              <MovieCard
                key={tvShow.id}
                movie={tvShow}
                onClick={handleCardClick}
                isCarouselItem={false}
                isBigCarouselItem={false}
                logos={[]} // Provide the appropriate logos
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
