import React from "react";
import ProviderLogo from "./ProviderLogo";
import { Movie } from "../types";

interface MovieInfoModalProps {
  movie: Movie;
  trailer: string | null;
  onClose: () => void;
  logos: string[];
}

const MovieInfoModal: React.FC<MovieInfoModalProps> = ({
  movie,
  trailer,
  onClose,
  logos,
}) => {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

  return (
    <div className="movie-info-modal-overlay" onClick={onClose}>
      <div className="movie-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="movie-info-header">
          <h2 className="movie-title">{title}</h2>
          <p className="release-date">{releaseDate}</p>
        </div>
        {movie.poster_path && (
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <ProviderLogo
          movieId={movie.id}
          mediaType={movie.media_type}
          logos={logos}
        />
        <div className="movie-details">
          <p className="overview">{movie.overview}</p>
          <p className="rating">
            Rating on IMDB: {movie.vote_average.toFixed(1)}
          </p>
        </div>
        {trailer && (
          <div className="trailer-container">
            <iframe
              title="trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${new URL(
                trailer
              ).searchParams.get("v")}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfoModal;
