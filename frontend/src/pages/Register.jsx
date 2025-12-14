import { useState } from "react";
import api from "../api/api";
import "./Register.css";

function Register({ onRegistered }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", {
        email: email.trim(),
        password,
      });

      alert("Registration successful. Please login.");
      onRegistered();
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      {/* ✅ CENTERED LOGIN LINK */}
      <p className="login-text">
        Already have an account?{" "}
        <span onClick={onRegistered}>Login</span>
      </p>
    </div>
  );
}

export default Register;
