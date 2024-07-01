import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import styles from "./TopSection.module.css";
import { Movie } from "../../types";
import TrailerModal from "../TrailerModal/TrailerModal";

// Install the modules

interface TopSectionProps {
  trendingMovies: Movie[];
  openModal: (movie: Movie) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  trendingMovies,
  openModal,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleTrailerOpen = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleTrailerClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.topSection}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000 }}
        className={styles.swiperContainer}
      >
        {trendingMovies.slice(0, 5).map((movie) => (
          <SwiperSlide key={movie.id} className={styles.swiperSlide}>
            <div className={styles.heroItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className={styles.mainHeroImage}
              />
              <div className={styles.movieInfo}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.movieDescription}>{movie.overview}</p>
                <div className={styles.movieDetails}>
                  <span className={styles.movieRating}>
                    ⭐ {movie.vote_average.toLocaleString().slice(0, 3)}
                  </span>
                  <span className={styles.movieReleaseDate}>
                    {new Date(movie.release_date)
                      .toLocaleDateString()
                      .slice(0, 10)}
                  </span>
                </div>
                <button
                  className={styles.trailerButton}
                  onClick={() => handleTrailerOpen(movie)}
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedMovie && (
        <TrailerModal
          movieId={selectedMovie.id}
          contentType="movie"
          onClose={handleTrailerClose}
        />
      )}
    </div>
  );
};

export default TopSection;
