import tmdbAPI from "./tmdAPI";

// HANDLES THE SEARCH FUNCTION
export async function searchMoviesAndTvShows(query: string) {
  try {
    const response = await tmdbAPI.get("/search/multi", {
      params: {
        query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for movies", error);
    throw error;
  }
}

// GETS THE TRENDING MOVIES THIS WEEK
export async function getTrendingMovies() {
  try {
    const response = await tmdbAPI.get("/trending/movie/week");
    return response.data;
  } catch (error) {
    console.error("Error showing movies", error);
    throw error;
  }
}

// GETS THE TRENDING TV SHOWS THIS WEEK
export async function getTrendingTvShows() {
  try {
    const response = await tmdbAPI.get("/trending/tv/week");
    return response.data;
  } catch (error) {
    console.error("Error showing tv-shows", error);
    throw error;
  }
}
// GETS THE STREAMING SERVICES THAT HAS THE RIGHT TO SHOW THE MOVIE/TV-SHOW
export const getProviderLogoURLs = async (
  id: number,
  contentType: "movie" | "tv"
): Promise<string[]> => {
  try {
    const response = await tmdbAPI.get(`/${contentType}/${id}/watch/providers`);

    const providerData = response.data;

    if (
      providerData.results &&
      providerData.results.SE &&
      providerData.results.SE.flatrate
    ) {
      const logos = providerData.results.SE.flatrate.map(
        (provider: any) => `https://image.tmdb.org/t/p/w45${provider.logo_path}`
      );
      const validLogos = logos.filter((logo: string) => logo !== undefined);

      return validLogos;
    }
  } catch (error) {
    console.error("Error fetching provider data:", error);
  }

  return [];
};

// GETS THE MOVIE/TV_SHOW TRAILERS
export const getTrailer = async (
  id: number,
  contentType: "movie" | "tv"
): Promise<string | null> => {
  try {
    const response = await tmdbAPI.get(`/${contentType}/${id}/videos`);
    const trailerData = response.data.results;

    const trailer = trailerData.find(
      (video: { type: string; site: string }) =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }
  } catch (error) {
    console.error("Error fetching trailer data:", error);
  }

  return null;
};

// GETS THE TOPRATED MOVIES
export const getTopRatedMovies = async () => {
  try {
    const response = await tmdbAPI.get(`/movie/top_rated`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    throw error;
  }
};

// GETS THE TOPRATED TV-SHOWS
export const getTopRatedTvShows = async () => {
  try {
    const response = await tmdbAPI.get(`/tv/top_rated`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated tv-shows:", error);
    throw error;
  }
};
// GETS THE UPCOMING CINEMA MOVIES
