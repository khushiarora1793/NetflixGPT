import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_VIDEOS_API_URL } from "../constants";
import { addTrailerVideo } from "../slice/moviesSlice";

const useMovieTrailer = (movieID) => {
  const trailer = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();

  // fetch trailer video and update the store with trailer video data
  useEffect(() => {
    async function getVideosForMovieID() {
      const apiResponse = await fetch(
        TMDB_VIDEOS_API_URL +
          "/" +
          movieID +
          "/videos?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY
      );
      const apiJsonResponse = await apiResponse.json();
      const videos = apiJsonResponse.results;
      const filteredData = videos.filter((video) => video.type === "Trailer");
      const trailer = filteredData.length ? filteredData[0] : videos[0];
      dispatch(addTrailerVideo(trailer));
    }
    
    !trailer && getVideosForMovieID(); //only make the API call if the trailer doesn't already exist in the store.
  }, [dispatch, movieID, trailer]);
};

export default useMovieTrailer