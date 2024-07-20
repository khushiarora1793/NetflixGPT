import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames) return;
  return (
    <div className="mb-12">
      {movieNames.map(
        (movie, ind) =>
          movieResults[ind].length !== 0 && ( // to handle the case when TMBD doesn't have the movie information, the name of which was returned by GPT API
            <MovieList key={movie} title={movie} movies={movieResults[ind]} />
          )
      )}
    </div>
  );
};

export default GPTMovieSuggestions;
