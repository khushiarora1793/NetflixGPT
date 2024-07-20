import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_POPULAR_MOVIES_API_URL } from "../constants";
import { addPopularMovies } from "../slice/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTMDBPopularMovies = async () => {
      try {
        const apiResponse = await fetch(
          TMDB_POPULAR_MOVIES_API_URL +
            "&api_key=" +
            process.env.REACT_APP_TMDB_API_KEY
        );
        const apiJsonResponse = await apiResponse.json();
        dispatch(addPopularMovies(apiJsonResponse.results));
      } catch (error) {}
    };
    fetchTMDBPopularMovies();
  }, [dispatch]);
};

export default usePopularMovies;