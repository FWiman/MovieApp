import React from "react";
import "../Css/App.css";

const AboutPage: React.FC = () => {
  return (
    <div className="about-text-container">
      <p className="about-text">
        Hello! My name is Fredrik and i just graduated from Higher Vocational
        Education studying .NET Software development and i made this as a hobby
        project with the aim to learn :D
      </p>
      <p className="about-text">
        I have been interested in programming since i was 18 and i have always
        wanted to learn more about it. I have been working as a warehouse worker
        for the last 8ish years and then 2-3 years ago i decided to change my
        career path and become a software developer.
      </p>
      <p className="about-text">
        This is a simple movie app that uses the TMDB API to display trending
        movies and tv-shows + search for movies and tv-shows. It was built using
        Typescript, Styled Components, Redux Toolkit, Axios, Material UI, SWR,
        NextJS, and React Router
      </p>
      <p className="about-text">
        ps, it is not optimized for telephone use atm but its coming!
      </p>
      <p className="about-text">
        The source code can be found on my Github page:
        https://github.com/FWiman
      </p>
      <p className="about-text">
        The TMDB API can be found here: https://www.themoviedb.org/
      </p>
    </div>
  );
};

export default AboutPage;
