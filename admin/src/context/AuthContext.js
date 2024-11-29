import React, { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ShowToast, Severty } from "../helper/toast";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState({ token: null });
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) return;
    let user;

    try {
      user = JSON.parse(localStorage.getItem("userProfile"));
    } catch (e) {
      console.log(e);
    }

    if (user) {
      setUserProfile(user);
    }
    setIsLoggedIn(true);
    setSession({ token: token });
  }, []);

  useEffect(() => {
    if (!userProfile) return;
    // localStorage.setItem('userProfile',JSON.stringify(userProfile))
  }, [userProfile]);

  useEffect(() => {
    if (!isLoggedIn) return;
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
    // alert("login");
    return <Navigate to="/dashboard" />;
  };

  const logout = () => {
    //localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setSession({ token: null });
    setUserProfile();
    ShowToast("Logout Successfully", Severty.SUCCESS);
    window.location.assign("/login");
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        session,
        setSession,
        userProfile,
        setUserProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
