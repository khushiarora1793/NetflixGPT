import React, { useState } from "react";
import { GOOGLE_SEARCH_URL } from "../constants";

const VideoTitle = ({ title, overview }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handlePlayButtonClick = () => {
    const youtubeIframe = document.querySelector("iframe");
    const command = isVideoPlaying ? "pauseVideo" : "playVideo";
    youtubeIframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command }),
      "*"
    );
    setIsVideoPlaying(!isVideoPlaying);
  };

  const handleKnowMoreButtonClick = () => {
    const searchQuery = title.split(" ").join("+");
    window.open(
      GOOGLE_SEARCH_URL + searchQuery,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute bg-gradient-to-r from-black text-white">
      <h1 className="text-6xl font-bold"> {title} </h1>
      <p className="py-6 text-lg w-1/3"> {overview} </p>
      <div className="mt-2">
        <button
          className="bg-white text-black p-2 px-10 text-lg hover:bg-opacity-80 rounded-md"
          onClick={handlePlayButtonClick}
        >
          {isVideoPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="mx-4 bg-gray-500 text-white p-2 px-4 text-lg bg-opacity-50 rounded-md"
          onClick={handleKnowMoreButtonClick}
        >
          Know More
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
