import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/Slices/ThemeSlice";
import { useEffect } from "react";

const ThemeToggle = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [darkMode]);
  return (
    <button onClick={() => dispatch(toggleTheme())}>
        <img 
          src={darkMode ? "/images/sun.png" : "/images/dark-mode.png"} 
          alt="theme toggle"
          className="size-5"
        />
      </button>
  )
}

export default ThemeToggle
