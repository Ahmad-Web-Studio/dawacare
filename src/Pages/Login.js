import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminUsername = "admin";
    const adminPassword = "admin123";

    if (email === adminUsername && password === adminPassword) {

      // store login state
      localStorage.setItem("adminAuth", "true");

      // redirect to admin panel
      navigate("/admin");

    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <>
      <Header/>

      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Admin Login</h1>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="login-page-btn">
              Login
            </button>

          </form>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Login;