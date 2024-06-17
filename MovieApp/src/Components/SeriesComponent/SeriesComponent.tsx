import React, { useState, useEffect } from "react";
import {
  getProviderLogoURLs,
  getTrailer,
  getTrendingTvShows,
  getTopRatedTvShows,
} from "../../Server/api";
import Slider from "react-slick";
import MovieCard from "../MovieCard/MovieCard";
import MovieInfoModal from "../MovieInfoModal/MovieInfoModal";
import { Movie } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingSeries: React.FC = () => {
  const [trendingTvShows, setTrendingTvShows] = useState<any[]>([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState<any[]>([]);
  const [providers, setProviders] = useState<{ [key: number]: any }>({});
  const [trailers, setTrailers] = useState<{ [key: number]: string | null }>(
    {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = async (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    const trailerURL = await getTrailer(movie.id, "tv");
    setTrailers((prevTrailer) => ({ ...prevTrailer, [movie.id]: trailerURL }));
    const providerLogos = await getProviderLogoURLs(movie.id, "tv");
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
    const fetchSeries = async () => {
      try {
        const trendingResponse = await getTrendingTvShows();
        const topRatedResponse = await getTopRatedTvShows();

        const trendingTvShowsData = trendingResponse.results;
        const topRatedTvShowsData = topRatedResponse.results;

        const providerPromises = [
          ...trendingTvShowsData.map((tvShow: { id: number }) =>
            getProviderLogoURLs(tvShow.id, "tv")
          ),
          ...topRatedTvShowsData.map((tvShow: { id: number }) =>
            getProviderLogoURLs(tvShow.id, "tv")
          ),
        ];

        const trailerPromises = [
          ...trendingTvShowsData.map((tvShow: { id: number }) =>
            getTrailer(tvShow.id, "tv")
          ),
          ...topRatedTvShowsData.map((tvShow: { id: number }) =>
            getTrailer(tvShow.id, "tv")
          ),
        ];

        const providerDataList = await Promise.all(providerPromises);
        const trailerDataList = await Promise.all(trailerPromises);

        const newProviders = providerDataList.reduce((acc, data, index) => {
          const allItems = [...trendingTvShowsData, ...topRatedTvShowsData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        const newTrailers = trailerDataList.reduce((acc, data, index) => {
          const allItems = [...trendingTvShowsData, ...topRatedTvShowsData];
          acc[allItems[index].id] = data;
          return acc;
        }, {});

        setTrendingTvShows(trendingTvShowsData);
        setTopRatedTvShows(topRatedTvShowsData);
        setProviders(newProviders);
        setTrailers(newTrailers);
      } catch (error) {
        console.error("Error fetching series", error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <h2 className="heading">Trending TV Shows This Week</h2>
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
          {trendingTvShows.map((tvShow) => (
            <MovieCard
              key={tvShow.id}
              movie={tvShow}
              onClick={openModal}
              isCarouselItem
              logos={providers[tvShow.id] || []}
              isBigCarouselItem={false}
            />
          ))}
        </Slider>
      </div>
      <div className="carousel-container">
        <h2 className="heading">Top Rated TV Shows</h2>
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
          {topRatedTvShows.map((tvShow) => (
            <MovieCard
              key={tvShow.id}
              movie={tvShow}
              onClick={openModal}
              isCarouselItem
              logos={providers[tvShow.id] || []}
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

export default TrendingSeries;
