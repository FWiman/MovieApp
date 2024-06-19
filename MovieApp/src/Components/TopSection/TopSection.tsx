import React from "react";
import styles from "./TopSection.module.css";
import { Movie } from "../../types";

interface TopSectionProps {
  trendingMovies: Movie[];
  openModal: (movie: Movie) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  trendingMovies,
  openModal,
}) => {
  return (
    <div className={styles.topSection}>
      <div className={styles.heroSection}>
        {trendingMovies.slice(0, 1).map((movie) => (
          <div
            key={movie.id}
            className={`${styles.heroItem} ${styles.mainHeroItem}`}
            onClick={() => openModal(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
        ))}
        <div className={styles.sideHeroContainer}>
          {trendingMovies.slice(1, 6).map((movie, index) => (
            <div
              key={movie.id}
              className={`${styles.heroItem} ${styles.sideHeroItem}`}
              style={{ zIndex: 5 - index }}
              onClick={() => openModal(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSection;
