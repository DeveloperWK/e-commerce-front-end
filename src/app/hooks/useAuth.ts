"use client";
import {
  signIn,
  signOut,
} from "@/app/features/authStateProvider/authStateProvider";
import { RootState } from "@/app/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || !role) {
        dispatch(signOut());
      } else {
        dispatch(signIn({ token, role: role || "" }));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
  const handleLogin = (token: string, role: string) => {
    dispatch(signIn({ token, role }));
  };
  const handleLogout = () => {
    dispatch(signOut());
  };
  const hasRole = (requiredRole: string) => {
    return user.role === requiredRole;
  };
  return {
    user,
    signIn: handleLogin,
    signOut: handleLogout,
    hasRole,
    isAuthenticated: user.isAuthenticated,
  };
};
