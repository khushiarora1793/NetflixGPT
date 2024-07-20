import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  if (!nowPlayingMovies) return;

  const mainMovie = nowPlayingMovies[0];
  const { overview, title, id } = mainMovie;

  return (
    <div className="main-container">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieID={id} />
    </div>
  );
};

export default MainContainer;
