"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CutomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const UserAuth = () => {
  const [loginState, setLoginState] = useState(true);
  return (
    <>
      <CustomerHeader />
      {loginState ? <UserLogin /> : <UserSignUp />}

      <button
        className="button-link"
        onClick={() => setLoginState(!loginState)}
      >
        {loginState
          ? "Don't have an account? Signup"
          : "Already have an account? Login"}
      </button>
      <RestaurantFooter />
    </>
  );
};

export default UserAuth;
