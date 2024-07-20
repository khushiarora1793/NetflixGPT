import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_NOW_PLAYING_API_URL } from "../constants";
import { addNowPlayingMovies } from "../slice/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTMDBMoviesPlaying = async () => {
      try {
        const apiResponse = await fetch(
          TMDB_NOW_PLAYING_API_URL +
            "&api_key=" +
            process.env.REACT_APP_TMDB_API_KEY
        );
        const apiJsonResponse = await apiResponse.json();
        dispatch(addNowPlayingMovies(apiJsonResponse.results));
      } catch (error) {}
    };
    fetchTMDBMoviesPlaying();
  }, [dispatch]);
};

export default useNowPlayingMovies;