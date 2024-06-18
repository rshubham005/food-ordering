"use client";
import { useState } from "react";
import Login from "../_components/Login";
import Signup from "../_components/Signup";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const restaurant = () => {
  const [loginState, setLoginState] = useState(true);
  return (
    <>
      <RestaurantHeader />
      <div className="container">
        <h1>Restaurant Login and signup page</h1>

        {loginState ? <Login /> : <Signup />}
        <button
          className="button-link"
          onClick={() => setLoginState(!loginState)}
        >
          {loginState
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>
      <RestaurantFooter />
    </>
  );
};
export default restaurant;
