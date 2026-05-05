import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔥 Replace with backend later
      console.log("Login attempt:", { email, password });

      // Example backend call:
      /*
      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      */

      alert("Login successful!");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    // Placeholder for later OAuth integration
    console.log("Google login clicked");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div style={{ maxWidth: "420px", margin: "auto", paddingTop: "40px" }}>
      <h2>Welcome Back</h2>
      <p>Sign in to your account</p>

      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>

      <hr />

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />
        </div>

        <br />

        <Link to="/forgot-password">
          Forgot password?
        </Link>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <br />

      <p>
        Don't have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}