import React, { useState, useEffect } from "react";
import {
  getProviderLogoURLs,
  getTrailer,
  getTrendingMovies,
  getTrendingTvShows,
  getTopRatedMovies,
  getTopRatedTvShows,
} from "../../Server/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MovieCard from "../MovieCard/MovieCard";
import MovieInfoModal from "../MovieInfoModal/MovieInfoModal";
import { Movie } from "../../types";

const TrendingContent: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingTvShows, setTrendingTvShows] = useState<any[]>([]);
  const [providers, setProviders] = useState<{ [key: number]: any }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [trailers, setTrailers] = useState<{ [key: number]: string | null }>(
    {}
  );
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState<any[]>([]);
  const [topRatedTrailers, setTopRatedTrailers] = useState<{
    [key: number]: string | null;
  }>({});
  const [topRatedProviders, setTopRatedProviders] = useState<{
    [key: number]: any;
  }>({});
  const [logos, setLogos] = useState<string[]>([]);

  const openModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    const trailerURL = await getTrailer(movie.id, movie.media_type);
    setTrailers((prevTrailer) => ({ ...prevTrailer, [movie.id]: trailerURL }));
    const providerLogos = await getProviderLogoURLs(movie.id, movie.media_type);
    setLogos(providerLogos);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const fetchContent = async (
      fetchMoviesFunction: { (): Promise<any>; (): Promise<any>; (): any },
      fetchTvShowsFunction: {
        (): Promise<{ results: never[] }>;
        (): Promise<any>;
        (): any;
      },
      setMoviesState: {
        (value: React.SetStateAction<any[]>): void;
        (value: React.SetStateAction<any[]>): void;
        (arg0: any): void;
      },
      setTvShowsState: {
        (value: React.SetStateAction<any[]>): void;
        (value: React.SetStateAction<any[]>): void;
        (arg0: any): void;
      },
      setTrailersState: {
        (value: React.SetStateAction<{ [key: number]: string | null }>): void;
        (value: React.SetStateAction<{ [key: number]: string | null }>): void;
        (arg0: any): void;
      },
      setProvidersState: {
        (value: React.SetStateAction<{ [key: number]: any }>): void;
        (value: React.SetStateAction<{ [key: number]: any }>): void;
        (arg0: any): void;
      }
    ) => {
      try {
        const moviesResponse = await fetchMoviesFunction();
        const tvShowsResponse = await fetchTvShowsFunction();

        const moviesData = moviesResponse.results;
        const tvShowsData = tvShowsResponse.results;

        const providerPromises = [
          ...moviesData.map((movie: { id: number }) =>
            getProviderLogoURLs(movie.id, "movie")
          ),
          ...tvShowsData.map((tvShow: { id: number }) =>
            getProviderLogoURLs(tvShow.id, "tv")
          ),
        ];

        const trailerPromises = [
          ...moviesData.map((movie: { id: number }) =>
            getTrailer(movie.id, "movie")
          ),
          ...tvShowsData.map((tvShow: { id: number }) =>
            getTrailer(tvShow.id, "tv")
          ),
        ];

        const trailerDataList = await Promise.all(trailerPromises);
        const providerDataList = await Promise.all(providerPromises);

        const newTrailers = trailerDataList.reduce((acc, data, index) => {
          const allItems = [...moviesData, ...tvShowsData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        const newProviders = providerDataList.reduce((acc, data, index) => {
          const allItems = [...moviesData, ...tvShowsData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        setMoviesState(moviesData);
        setTvShowsState(tvShowsData);
        setTrailersState(newTrailers);
        setProvidersState(newProviders);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchContent(
      getTrendingMovies,
      getTrendingTvShows,
      setTrendingMovies,
      setTrendingTvShows,
      setTrailers,
      setProviders
    );

    fetchContent(
      getTopRatedMovies,
      getTopRatedTvShows,
      setTopRatedMovies,
      setTopRatedTvShows,
      setTopRatedTrailers,
      setTopRatedProviders
    );
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="bigCarouselContainer">
        <Slider
          className="bigCarouselItem"
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={4}
          arrows={true}
          slidesToScroll={4}
          initialSlide={0}
          autoplay={true}
          autoplaySpeed={10000}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
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
              isBigCarouselItem={false}
              logos={providers[movie.id] || []}
            />
          ))}
        </Slider>
      </div>
      <div className="carousel-container">
        <div className="carousel">
          <h2 className="heading">Trending Movies This Week</h2>
          <Slider
            className="carousel-item"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={7}
            slidesToScroll={7}
            initialSlide={0}
            draggable={true} // TEMPORARLY DRAGGABLE
            arrows={true} // FIX SO ARROW SHOWS
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
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
                isBigCarouselItem={false}
                logos={providers[movie.id] || []}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="carousel-container">
        <h2 className="heading">Trending TV Shows This Week</h2>
        <div className="carousel">
          <Slider
            className="carousel-item"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={7}
            slidesToScroll={7}
            initialSlide={0}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
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
            {trendingTvShows.map((tvShow) => (
              <MovieCard
                key={tvShow.id}
                movie={tvShow}
                onClick={openModal}
                isCarouselItem
                isBigCarouselItem={false}
                logos={providers[tvShow.id] || []}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="carousel-container">
        <h2 className="heading">Top Rated Movies</h2>
        <div className="carousel">
          <Slider
            className="carousel-item"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={7}
            slidesToScroll={7}
            initialSlide={0}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
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
                isBigCarouselItem={false}
                logos={providers[movie.id] || topRatedProviders[movie.id] || []}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="carousel-container">
        <h2 className="heading">Top Rated TV Shows</h2>
        <div className="carousel">
          <Slider
            className="carousel-item"
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={7}
            slidesToScroll={7}
            initialSlide={0}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                  infinite: true,
                  dots: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  initialSlide: 3,
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
            {topRatedTvShows.map((tvShow) => (
              <MovieCard
                key={tvShow.id}
                movie={tvShow}
                onClick={openModal}
                isCarouselItem
                isBigCarouselItem={false}
                logos={
                  providers[tvShow.id] || topRatedProviders[tvShow.id] || []
                }
              />
            ))}
          </Slider>
        </div>
      </div>
      {isModalOpen && selectedMovie && (
        <MovieInfoModal
          movie={selectedMovie}
          trailer={
            trailers[selectedMovie.id] || topRatedTrailers[selectedMovie.id]
          }
          onClose={closeModal}
          logos={
            providers[selectedMovie.id] ||
            topRatedProviders[selectedMovie.id] ||
            []
          }
        />
      )}
    </div>
  );
};

export default TrendingContent;
