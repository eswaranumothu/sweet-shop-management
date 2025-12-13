import { useState } from "react";
import api from "../api/api";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email: email.trim(),
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      onLogin();
    } catch (err) {
      alert("Invalid email or password");
    }
  };

 return (
  <div className="login-page">
    <div className="login-card">
      <h2>Login</h2>

      <input
        type="email"
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

      <button onClick={handleLogin}>Login</button>

      <p className="register-text">
        Don’t have an account? <span onClick={onRegister}>Register</span>
      </p>
    </div>
  </div>
);

}

export default Login;
