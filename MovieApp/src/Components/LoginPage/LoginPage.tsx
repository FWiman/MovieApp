import React, { useContext, useEffect, useState } from "react";
import { getTrendingTvShows, getProviderLogoURLs } from "../../Server/api";
import MovieCard from "../MovieCard/MovieCard";
import "./LoginPage.css";
import { UserContext } from "../UserContext/userContext";

const LoginPage: React.FC = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [trendingTvShows, setTrendingTvShows] = useState<any[]>([]);
  const [providers, setProviders] = useState<{ [key: number]: any }>({});
  const sizes = ["big", "medium", "small"];

  const { setIsUserLoggedIn } = useContext(UserContext)!;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsUserLoggedIn(false);
    window.location.href = "/trending"; // redirect to home page after login successfull!
  };

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
            const durations = ["15s", "20s", "25s"];
            const randomDuration =
              durations[Math.floor(Math.random() * durations.length)];
            const style = {
              animationDuration: randomDuration,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDirection: "alternate",
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
                  isBigCarouselItem={false}
                  logos={providers[tvShow.id] || []}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="form-wrapper">
        <form className="form-container" onSubmit={onSubmit}>
          <h1 className="heading">Welcome!</h1>
          <label className="form-label">
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
            />
          </label>
          <label className="form-label">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="register-button"
            onClick={() => setRegisterOpen(true)}
          >
            Register
          </button>
        </form>
      </div>
      {isRegisterOpen && (
        <div className="register-wrapper">
          <form
            className="register-container"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                password: { value: string };
                confirmPassword: { value: string };
              };
              const password = target.password.value;
              const confirmPassword = target.confirmPassword.value;
              if (password !== confirmPassword) {
                alert("Passwords do not match");
              } else {
                alert("You are now registered!");
              }
            }}
          >
            <h1 className="register-heading">
              Type in ur information to register!{" "}
            </h1>
            <label className="form-label">
              <input
                type="text"
                name="username"
                className="input"
                placeholder="Username"
              />
            </label>
            <label className="form-label">
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
            </label>
            <label className="form-label">
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="Confirm Password"
              />
            </label>
            <label className="form-label">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email address"
              />
            </label>
            <input type="submit" value="Register" className="register-button" />
            <button
              type="submit"
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

export default LoginPage;
