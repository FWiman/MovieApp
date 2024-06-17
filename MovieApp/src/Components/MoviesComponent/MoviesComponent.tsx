import React, { useState, useEffect } from "react";
import {
  getProviderLogoURLs,
  getTrailer,
  getTrendingMovies,
  getTopRatedMovies,
} from "../../Server/api";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import MovieInfoModal from "../MovieInfoModal/MovieInfoModal";
import { Movie } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingMovies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [providers, setProviders] = useState<{ [key: number]: any }>({});
  const [trailers, setTrailers] = useState<{ [key: number]: string | null }>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    const trailerURL = await getTrailer(movie.id, "movie");
    setTrailers((prevTrailer) => ({ ...prevTrailer, [movie.id]: trailerURL }));
    const providerLogos = await getProviderLogoURLs(movie.id, "movie");
    setProviders((prevProviders) => ({
      ...prevProviders,
      [movie.id]: providerLogos,
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingResponse = await getTrendingMovies();
        const topRatedResponse = await getTopRatedMovies();

        const trendingMoviesData = trendingResponse.results;
        const topRatedMoviesData = topRatedResponse.results;

        const providerPromises = [
          ...trendingMoviesData.map((movie: { id: number }) =>
            getProviderLogoURLs(movie.id, "movie")
          ),
          ...topRatedMoviesData.map((movie: { id: number }) =>
            getProviderLogoURLs(movie.id, "movie")
          ),
        ];

        const trailerPromises = [
          ...trendingMoviesData.map((movie: { id: number }) =>
            getTrailer(movie.id, "movie")
          ),
          ...topRatedMoviesData.map((movie: { id: number }) =>
            getTrailer(movie.id, "movie")
          ),
        ];

        const providerDataList = await Promise.all(providerPromises);
        const trailerDataList = await Promise.all(trailerPromises);

        const newProviders = providerDataList.reduce((acc, data, index) => {
          const allItems = [...trendingMoviesData, ...topRatedMoviesData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        const newTrailers = trailerDataList.reduce((acc, data, index) => {
          const allItems = [...trendingMoviesData, ...topRatedMoviesData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        setTrendingMovies(trendingMoviesData);
        setTopRatedMovies(topRatedMoviesData);
        setProviders(newProviders);
        setTrailers(newTrailers);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <h2 className="heading">Trending Movies This Week</h2>
        <Slider
          className="carousel-item"
          dots={false}
          infinite={true}
          slidesToShow={7}
          slidesToScroll={7}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={openModal}
              isCarouselItem
              logos={providers[movie.id] || []}
              isBigCarouselItem={false}
            />
          ))}
        </Slider>
      </div>
      <div className="carousel-container">
        <h2 className="heading">Top Rated Movies</h2>
        <Slider
          className="carousel-item"
          dots={false}
          infinite={true}
          slidesToShow={7}
          slidesToScroll={7}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
          ]}
        >
          {topRatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={openModal}
              isCarouselItem
              logos={providers[movie.id] || []}
              isBigCarouselItem={false}
            />
          ))}
        </Slider>
      </div>
      {isModalOpen && selectedMovie && (
        <MovieInfoModal
          movie={selectedMovie}
          trailer={trailers[selectedMovie.id]}
          onClose={closeModal}
          logos={providers[selectedMovie.id] || []}
        />
      )}
    </div>
  );
};

export default TrendingMovies;
