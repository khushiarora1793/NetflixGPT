import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import {
  YOUTUBE_ALLOW_OPTIONS,
  YOUTUBE_EMBED_URL,
  YOUTUBE_VIDEO_OPTIONS,
} from "../constants";

const VideoBackground = ({ movieID }) => {
  useMovieTrailer(movieID);

  const trailer = useSelector((store) => store.movies.trailerVideo);

  return (
    <div className="w-screen">
      {trailer && (
        <iframe
          className="w-screen aspect-video"
          src={
            YOUTUBE_EMBED_URL +
            trailer.key +
            YOUTUBE_VIDEO_OPTIONS +
            trailer.key
          }
          title="YouTube Video Player"
          allow={YOUTUBE_ALLOW_OPTIONS}
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
