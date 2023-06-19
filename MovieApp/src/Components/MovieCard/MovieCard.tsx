import React from "react";
import { Movie } from "../../types";
import ProviderLogo from "../ProviderLogo/ProviderLogo";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isCarouselItem: boolean;
  logos: string[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  isCarouselItem = false,
  logos,
}) => {
  return (
    <div
      className={`search-result-item${isCarouselItem ? " carousel-item" : ""}`}
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
      <ProviderLogo
        movieId={movie.id}
        mediaType={movie.media_type}
        logos={logos}
      />
    </div>
  );
};

export default MovieCard;
