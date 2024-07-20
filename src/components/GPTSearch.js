import React, { useEffect } from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { NETFLIX_BACKGROUND_URL } from "../constants";
import { useDispatch } from "react-redux";
import { clearGPTSlice } from "../slice/gptSlice";

const GPTSearch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      //clear movie information from the GPT Slice once the component is unmounted
      dispatch(clearGPTSlice());
    };
  }, [dispatch]);

  return (
    <>
      <div className="fixed -z-10">
        <img
          src={NETFLIX_BACKGROUND_URL}
          className="background-image"
          alt="Netflix Background"
        ></img>
      </div>
      <div className="gpt-search-bar">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GPTSearch;
