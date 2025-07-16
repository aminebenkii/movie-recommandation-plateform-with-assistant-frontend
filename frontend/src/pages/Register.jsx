// src/pages/Register.jsx
import React from "react";
import AuthForm from "../components/AuthForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await api.post("/auth/signup", formData);
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Please check your info.");
      console.error(err);
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}

export default Register;
