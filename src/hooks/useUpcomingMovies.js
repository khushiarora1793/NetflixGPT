import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_UPCOMING_MOVIES_API_URL } from "../constants";
import { addUpcomingMovies } from "../slice/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTMDBUpcomingMovies = async () => {
      try {
        const apiResponse = await fetch(
          TMDB_UPCOMING_MOVIES_API_URL +
            "&api_key=" +
            process.env.REACT_APP_TMDB_API_KEY
        );
        const apiJsonResponse = await apiResponse.json();
        dispatch(addUpcomingMovies(apiJsonResponse.results));
      } catch (error) {}
    };
    fetchTMDBUpcomingMovies();
  }, [dispatch]);
};

export default useUpcomingMovies;
