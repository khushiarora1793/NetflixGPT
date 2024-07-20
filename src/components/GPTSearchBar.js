import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import groq from "../utils/groq";
import {
  GENERIC_ERROR_MESSAGE,
  GROQ_GPT_MODEL,
  TMDB_SEARCH_MOVIES_API_URL,
} from "../constants";
import { formGPTQuery } from "../utils/gptQuery";
import { addGPTMovieResults } from "../slice/gptSlice";
import language from "../utils/languageConstants";

const GPTSearchBar = () => {
  const searchText = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (store) => store.config.selectedLanguage
  );

  const searchTMDBMovies = async (movieName) => {
    try {
      const apiResponse = await fetch(
        TMDB_SEARCH_MOVIES_API_URL +
          "?query=" +
          movieName +
          "&api_key=" +
          process.env.REACT_APP_TMDB_API_KEY
      );
      const apiJsonResponse = await apiResponse.json();
      return apiJsonResponse.results;
    } catch (e) {}
  };

  const handleGPTSearchClick = async () => {
    setShowLoader(true);
    //Make an API call to GPT API and get movie results
    const gptQuery = formGPTQuery(searchText.current.value);

    const gptResults = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
      model: GROQ_GPT_MODEL,
    });

    if (!gptResults || !gptResults.choices || gptResults.choices.length === 0) {
      setErrorMessage(GENERIC_ERROR_MESSAGE);
      setShowLoader(false);
      return;
    }

    setErrorMessage(null);

    const gptMovieResults = gptResults.choices[0]?.message?.content.split(",");

    const gptMovies = gptMovieResults.map((movie) =>
      movie.trim().replace(/^ +|\.+$/g, "")
    );
    // regex to remove any whitespaces in the beginning or full stops at the end

    //for each movie, get movie details from TMDB
    const tmdbMoviesPromiseArray = gptMovies.map((movie) =>
      searchTMDBMovies(movie)
    );

    const tmdbMoviesData = await Promise.all(tmdbMoviesPromiseArray);

    const tmdbMoviesFilteredData = tmdbMoviesData.map((movieSuggestions) =>
      movieSuggestions.filter((movie) => gptMovies.includes(movie.title))
    );

    dispatch(
      addGPTMovieResults({
        movieNames: gptMovies,
        movieResults: tmdbMoviesFilteredData,
      })
    );

    setShowLoader(false);
  };

  return (
    <>
      <div className="pt-[7%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-blue-300 grid grid-cols-12 rounded-lg mb-12 gpt-search-bar-container"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            ref={searchText}
            className="p-3 m-4 col-span-9 rounded-lg"
            placeholder={language[selectedLanguage].gptSearchPlaceHolder}
          />
          <button
            className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4"
            onClick={handleGPTSearchClick}
          >
            {language[selectedLanguage].search}
          </button>
        </form>
      </div>
      {errorMessage && (
        <div className="flex justify-center">
          <div className="w-1/2 bg-blue-200 text-red-500 mt-2 font-bold text-center text-2xl">
            {errorMessage}
          </div>
        </div>
      )}
      <div className="flex justify-center mb-12">
        <PulseLoader color="#FFFFFF" loading={showLoader} size={20} />
      </div>
    </>
  );
};

export default GPTSearchBar;
