import React from "react";
import { Movie } from "../../types";
import ProviderLogo from "../ProviderLogo/ProviderLogo";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isCarouselItem: boolean;
  isBigCarouselItem: boolean;
  logos: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isCarouselItem = false,
  isBigCarouselItem = false,
  logos,
}) => {
  return (
    <div
      className={`search-result-item${isCarouselItem ? " carousel-item" : ""}${
        isBigCarouselItem ? " big-carousel-item" : ""
      }`}
      onClick={() => onClick(movie)}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="no-image">No Image</div>
      )}
      {isBigCarouselItem && (
        <div className="bigOverview">
          <h3 className="bigTitle">{movie.title}</h3>
          <p className="movie-info">{movie.overview}</p>
          <ul className="provider-logos"></ul>
        </div>
      )}
      <ProviderLogo
        movieId={movie.id}
        mediaType={movie.media_type}
        logos={logos}
        isModal={false}
      />
    </div>
  );
};

export default MovieCard;
