import React, { useEffect, useState } from "react";
import { getTrendingTvShows, getProviderLogoURLs } from "../../Server/api";
import MovieCard from "../MovieCard/MovieCard";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPAge: React.FC = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [trendingTvShows, setTrendingTvShows] = useState<any[]>([]);
  const [providers, setProviders] = useState<{ [key: number]: any }>({});
  const sizes = ["big", "medium", "small"];

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await getTrendingTvShows();
        const tvShowData = response.results;

        const providerPromise = tvShowData.map((tvShow: { id: number }) =>
          getProviderLogoURLs(tvShow.id, "tv")
        );

        const providerListData = await Promise.all(providerPromise);

        const newProviders = providerListData.reduce((acc, data, index) => {
          acc[tvShowData[index].id] = data;
          return acc;
        }, {});

        setTrendingTvShows(tvShowData);
        setProviders(newProviders);
      } catch (error) {
        console.error("Error fetching tv-shows", error);
      }
    };
    fetchTvShows();
  }, []);

  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid">
          {trendingTvShows.map((tvShow, index) => {
  const durations = ['15s', '20s', '25s',];
  const randomDuration = durations[Math.floor(Math.random() * durations.length)];
  const style = {
    animationDuration: randomDuration,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  };

  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

  return (
    <div 
      key={index} 
      className={`poster-wrapper ${randomSize}`} 
      style={style}
    >
      <MovieCard
        movie={tvShow}
        onClick={() => {}}
        isCarouselItem={true}
        logos={providers[tvShow.id] || []}
      />
    </div>
  );
})}

        </div>
      </div>
      <div className="form-wrapper">
        <h1 className="heading">Welcome!</h1>
        <p className="about-text"> To be able to use the website you need to register and login! :D When you have done that you will be able to
        find trending content and top content and also search for that specific show or movie that you been looking for!
        There you will get some info about the show or movie like a description, imdb rating, trailer and also on wich streaming service
        you will be able to watch that specifc show or movie!! </p>
        <form className="form-container">
          <label className="form-label">
            Username:
            <input type="text" name="username" className="input" />
          </label>
          <label className="form-label">
            Password:
            <input type="text" name="password" className="input" />
          </label>

          <button type="button" className="login-button">
            <Link to="/trending" />
            Login
          </button>
          <button
            type="button"
            className="login-button"
            onClick={() => setRegisterOpen(true)}
          >
            Register
          </button>
        </form>
      </div>
      {isRegisterOpen && (
        <div className="register-wrapper">
          <form className="register-container">
            <h1 className="register-heading">
              Type in ur information to register!{" "}
            </h1>
            <label className="form-label">
              Username:
              <input
                type="text"
                name="username"
                className="input"
                placeholder="Username"
              />
            </label>
            <label className="form-label">
              Password:
              <input
                type="text"
                name="password"
                className="input"
                placeholder="Password"
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="text"
                name="email"
                className="input"
                placeholder="Email address"
              />
            </label>
            <input type="submit" value="Register" className="register-button" />
            <button
              type="button"
              className="register-button"
              onClick={() => setRegisterOpen(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPAge;
