import { useState, FormEvent, ChangeEvent } from "react";

export default function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace this with your real backend later
      console.log("Sending reset link to:", email);

      // Example real request (uncomment when ready):
      /*
      await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      */

      setSent(true);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reset Password</h2>

      {sent ? (
        <p>Check your email for a reset link.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}

      <br />

      <a href="/sign-in">Back to Sign In</a>
    </div>
  );
}