import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log("API Response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));

        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <div className="login-card">

        <div className="brand">
          <div className="brand-icon">A</div>

          <div>
            <h1>LOGIN</h1>
            <span>LOGIN PORTAL</span>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span>●</span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            <span>Sign In</span>
            <span className="arrow">→</span>
          </button>

        </form>

        <div className="security-info">
          <span className="status-dot"></span>
          Secure authentication enabled
        </div>

        <p className="copyright">
          © 2026 NEXUS Admin Portal
        </p>

      </div>
    </div>
  );
}

export default Login;