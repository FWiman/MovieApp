import React, { useEffect, useState } from "react";
import { getTrendingTvShows, getProviderLogoURLs } from "../../Server/api";
import MovieCard from "../MovieCard/MovieCard";
import "./LoginPage.css"

const LoginPAge: React.FC = () => {
      const [isRegisterOpen, setRegisterOpen] = useState(false);
      const [trendingTvShows, setTrendingTvShows] = useState<any[]>([]);
      const [providers, setProviders] = useState<{ [key: number]: any}>({});

      useEffect(() => {
        const fetchTvShows = async () => {
            try {
                const response = await getTrendingTvShows();
                const tvShowData = response.result;

                const providerPromise = tvShowData.map((tvShow: {id: number}) => 
                getProviderLogoURLs(tvShow.id, "tv")
                );

                const providerListData = await Promise.all(providerPromise);

                const newProviders = providerListData.reduce((acc, data, index) =>{
                    acc[tvShowData[index].id] = data;
                    return acc;
                }, {});

                setTrendingTvShows(tvShowData);
                setProviders(newProviders);
            } catch (error) {
                console.error("Error fetching tv-shows", error);
            }
        }
        fetchTvShows();
      }, [])

    return (
        <div className="App">
            <div className="grid-container">
                <div className="grid">
                    {trendingTvShows.map((tvShow) => {
            const scaleClass = Math.random() > 0.5 ? "scale-up" : ""; // randomize scale-up class assignment
            return (
              <MovieCard
                key={tvShow.id}
                movie={tvShow}
                className={`grid-item ${scaleClass}`}
                logos={providers[tvShow.id] || []}
              />
            );
                    })}

                </div>
            </div>
            <div className="form-wrapper">
                <h1 className="heading">Welcome!</h1>
                <p className="about-text"> bla bla bla</p>
                <form className="form-container">
                    <label className="form-label">
                    Username: 
                    <input type="text" name="username" className="input"/>
                </label>
                <label className="form-label">
                    Password:
                    <input type="text" name="password" className="input"/>
                </label>

                <input type="submit" value="Login" className="login-button"/>
                <button type="button" className="login-button" onClick={() => setRegisterOpen(true)}>Register</button>
                </form>
            </div>
            {isRegisterOpen && (
                <div className="register-wrapper">
                    <form className="register-container">
                        <h1 className="register-heading">Type in ur information to register! </h1>
                        <label className="form-label">
                            Username:
                            <input type="text" name="username" className="input" placeholder="Username"/>
                        </label>
                        <label className="form-label">
                            Password:
                            <input type="text" name="password" className="input" placeholder="Password"/>
                        </label>
                        <label className="form-label">
                            Email:
                            <input type="text" name="email" className="input" placeholder="Email address"/>
                        </label>
                        <input type="submit" value="Register" className="register-button"/>
                        <button type="button" className="register-button" onClick={() => setRegisterOpen(false)}>Close</button>
                    </form>
                </div>
            )}
        </div>
    )

}

export default LoginPAge;