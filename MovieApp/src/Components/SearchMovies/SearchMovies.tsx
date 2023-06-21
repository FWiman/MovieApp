import React, { useEffect, useState } from "react";
import {
  searchMoviesAndTvShows,
  getTrailer,
  getProviderLogoURLs,
} from "../../Server/api";
import MovieInfoModal from "../MovieInfoModal/MovieInfoModal";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../types";
import { useLocation } from "react-router-dom";

const SearchMovies: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [trailer, setTrailers] = useState<string | null>(null);
  const [logos, setLogos] = useState<Record<number, string[]>>({});

  const fetchProviderLogos = async (
    movieId: number,
    mediaType: "movie" | "tv"
  ) => {
    try {
      const logos = await getProviderLogoURLs(movieId, mediaType);
      setLogos((prevLogos) => ({ ...prevLogos, [movieId]: logos }));
    } catch (error) {
      console.error("Error fetching provider logos", error);
    }
  };

  const location = useLocation();

  const parseQueryParam = (): string | null => {
    return new URLSearchParams(location.search).get("query");
  };

  const query = parseQueryParam();

  useEffect(() => {
    const fetchFlicks = async () => {
      if (!query) return;
      try {
        const response = await searchMoviesAndTvShows(query);
        setMovies(response.results);

        response.results.forEach((movie: Movie) => {
          fetchProviderLogos(movie.id, movie.media_type);
        });
      } catch (error) {
        console.error("Error searching for flicks", error);
      }
    };

    fetchFlicks();
  }, [location]);

  const openModal = async (movie: Movie) => {
    setSelectedMovie(movie);

    try {
      const trailerURL = await getTrailer(movie.id, movie.media_type);
      setTrailers(trailerURL);
    } catch (error) {
      console.error("Error fetching trailer", error);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="search-container">
      <ul className="search-results">
        {movies.map((movie) => (
          <li key={movie.id} className="search-results-item">
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => openModal(movie)}
              isCarouselItem={false}
              logos={logos[movie.id] || []}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && selectedMovie && (
        <MovieInfoModal
          movie={selectedMovie}
          trailer={trailer}
          onClose={closeModal}
          logos={logos[selectedMovie.id]}
        />
      )}
    </div>
  );
};

export default SearchMovies;
