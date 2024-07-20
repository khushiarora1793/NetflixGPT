import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="px-6 bg-black bg-opacity-70 text-white">
      <h1 className="text-lg md:text-2xl py-6"> {title} </h1>
      <div className="flex overflow-x-auto">
        <div className="flex my-4">
          {movies.map((movie) => (
            <MovieCard
              imageID={movie.poster_path}
              key={movie.id}
              searchQuery={movie.title.split(" ").join("+")} //searchQuery prop is used for showing a Google Search Link on every movieCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
