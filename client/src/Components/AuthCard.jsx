import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { BASE_URL } from "../Utils/Constant";

const AuthCard = ({
  title,
  subtitle,
  buttonText,
  redirectText,
  redirectLink,
  redirectHref,
  isLogin,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const endpoint = isLogin
        ? `${BASE_URL}/api/auth/login`
        : `${BASE_URL}/api/auth/register`;

      try {
        const response = await axios.post(endpoint, {
          username: values.name,
          email: values.email,
        });

        if (isLogin) {
          localStorage.setItem("token", response.data.token);
          setSnackbar({
            open: true,
            message: "Login successful! Redirecting to slots…",
            severity: "success",
          });
          setTimeout(() => {
            navigate("/slot");
          }, 2000);
        } else {
          setSnackbar({
            open: true,
            message: "Registration successful! Please log in.",
            severity: "success",
          });
          setTimeout(() => {
            navigate("/log-in");
          }, 2000);
        }
      } catch (err) {
        setSnackbar({
          open: true,
          message:
            err.response?.data?.message ||
            (isLogin
              ? "Login failed. Please check your credentials."
              : "Registration failed. Please try again."),
          severity: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 md:p-8 flex flex-col gap-5 text-center sm:max-w-[600px] mx-auto lg:max-w-full"
      >
        <h1 className="text-3xl md:text-5xl text-[#0B3558] dark:text-white font-bold leading-snug">
          {title}
        </h1>
        <p className="text-[#476788] dark:text-[#B0B0B0] text-sm md:text-lg font-medium">
          {subtitle}
        </p>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="name"
              placeholder="Enter your good name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className={`outline-none rounded-md p-2 md:p-3 placeholder:text-zinc-300 placeholder:text-sm font-medium border-2 transition-colors ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs md:text-sm text-left">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
              className={`outline-none rounded-md p-2 md:p-3 placeholder:text-zinc-300 placeholder:text-sm font-medium border-2 transition-colors ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs md:text-sm text-left">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Submit Button with Loading */}
          <button
            type="submit"
            disabled={isLoading || !formik.isValid}
            className={`relative bg-[#006BFF] dark:bg-white dark:text-black font-medium text-white p-2 md:p-3 rounded-md text-sm md:text-base ${
              isLoading || !formik.isValid
                ? "opacity-70 cursor-not-allowed"
                : "hover:opacity-90 transition-opacity"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <CircularProgress size={20} color="inherit" />
                <span>Please wait...</span>
              </div>
            ) : (
              buttonText
            )}
          </button>
        </form>

        {/* OR Separator */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-full bg-black/20" />
          <p className="text-[#476788] dark:text-[#B0B0B0] text-sm md:text-base">
            OR
          </p>
          <div className="h-[1px] w-full bg-black/20" />
        </div>

        {/* Redirect Link */}
        <p className="text-[#476788] dark:text-[#B0B0B0] text-sm md:text-base">
          {redirectText}{" "}
          <a href={redirectHref} className="text-[#006BFF] font-medium">
            {redirectLink}
          </a>
        </p>
      </div>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right", zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthCard;
