import React from "react";
import { GOOGLE_SEARCH_URL, TMDB_IMAGE_CDN_URL } from "../constants";

const MovieCard = ({ imageID, searchQuery }) => {
  if (!imageID) return;
  return (
    <div className="w-36 md:w-48 pr-5">
      <a
        href={GOOGLE_SEARCH_URL + searchQuery}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="Movie Card" src={TMDB_IMAGE_CDN_URL + imageID} />
      </a>
    </div>
  );
};

export default MovieCard;
