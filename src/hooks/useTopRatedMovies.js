import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_TOP_RATED_MOVIES_API_URL } from "../constants";
import { addTopRatedMovies } from "../slice/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTMDBTopRatedMovies = async () => {
      try {
        const apiResponse = await fetch(
          TMDB_TOP_RATED_MOVIES_API_URL +
            "&api_key=" +
            process.env.REACT_APP_TMDB_API_KEY
        );
        const apiJsonResponse = await apiResponse.json();
        dispatch(addTopRatedMovies(apiJsonResponse.results));
      } catch (error) {}
    };
    fetchTMDBTopRatedMovies();
  }, [dispatch]);
};

export default useTopRatedMovies;