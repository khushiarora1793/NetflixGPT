import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="-mt-52 relative z-20 bg-black mb-16 secondary-container">
      <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies} />
      <MovieList title="Popular Movies" movies={movies.popularMovies} />
      <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
      <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
