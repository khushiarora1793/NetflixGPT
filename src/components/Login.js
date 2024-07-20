import React, { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import Header from "./Header";
import { validateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  GENERIC_ERROR_MESSAGE,
  INVALID_CREDENTIALS_ERROR_CODE,
  INVALID_CREDENTIALS_ERROR_MESSAGE,
  NETFLIX_BACKGROUND_URL,
} from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useRef(null);
  const emailInput = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  async function signUp() {
    try {
      const displayName = user.current.value;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput.current.value,
        password.current.value
      );
      const currentUser = userCredential.user;
      const { email, uid } = currentUser;
      await updateProfile(currentUser, {
        displayName: user.current.value,
      });
      dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
    } catch (error) {
      setErrorMessage(GENERIC_ERROR_MESSAGE);
    }
  }

  async function signIn() {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.current.value,
        password.current.value
      );
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === INVALID_CREDENTIALS_ERROR_CODE)
        setErrorMessage(INVALID_CREDENTIALS_ERROR_MESSAGE);
      else setErrorMessage(GENERIC_ERROR_MESSAGE);
    }
  }

  const handleButtonClick = () => {
    const validationResult = validateData(
      user?.current?.value,
      emailInput.current.value,
      password.current.value,
      isSignInForm
    );
    if (validationResult instanceof Error) {
      setErrorMessage(validationResult.message);
      return;
    }
    // in case the data is valid, we want to sign in/sign up the user.
    setErrorMessage(null);
    if (isSignInForm) signIn();
    else signUp();
  };

  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          src={NETFLIX_BACKGROUND_URL}
          alt="Netflix Background"
          className="background-image"
        ></img>
      </div>
      <form
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 sign-in-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={user}
            type="text"
            placeholder="Username"
            className="p-3 my-3 w-full bg-gray-700"
          />
        )}
        <input
          ref={emailInput}
          type="text"
          placeholder="Email Address"
          className="p-3 my-3 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-3 w-full bg-gray-700"
        />
        <p className="text-red-500 my-2 font-bold text-lg">{errorMessage}</p>
        <button
          className="my-5 h-9 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer my-3" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
