import React, { useEffect } from "react";
import { NETFLIX_LOGO_URL, SUPPORTED_LANGUAGES } from "../constants";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../slice/userSlice";
import { clearMoviesSlice } from "../slice/moviesSlice";
import { clearGPTSlice, toggleShowGPTSearch } from "../slice/gptSlice";
import { resetLanguage, switchLanguage } from "../slice/configSlice";

const Header = ({ isBrowsePage = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        dispatch(clearMoviesSlice());
        dispatch(clearGPTSlice());
        dispatch(resetLanguage());
        navigate("/");
      }
    });
    //cleanup function when component unmounts
    return unsubscribe;
  }, [dispatch, navigate]);

  const user = useSelector((store) => store.user);

  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  async function handleSignOut() {
    try {
      await signOut(auth);
    } catch (error) {}
  }

  const handleGPTButtonClick = () => {
    dispatch(toggleShowGPTSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(switchLanguage(e.target.value));
  };

  return (
    <div
      className={`fixed w-screen px-8 py-2 z-10 flex flex-col md:flex-row justify-between items-center overflow-y-hidden ${
        isBrowsePage ? "bg-black browse-header" : "bg-gradient-to-b from-black header"
      }`}
    >
      <Link to="/">
        <img className="w-44" src={NETFLIX_LOGO_URL} alt="Netflix Logo" />
      </Link>
      {user && (
        <>
          <div className="p-2">
            {showGPTSearch && (
              <select
                className="mr-10 px-2 py-1 language-select"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((language) => (
                  <option value={language.identifier}> {language.name} </option>
                ))}
              </select>
            )}
              <button
                className="h-9 w-36 bg-purple-600 text-white rounded-lg mr-4 gpt-search-button"
                onClick={handleGPTButtonClick}
              >
                {showGPTSearch ? "Home Page" : "GPT Search"}
              </button>
              <button
                className="bg-red-500 h-9 w-20 text-white rounded-lg ml-4 sign-out-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
        </>
      )}
    </div>
  );
};

export default Header;
