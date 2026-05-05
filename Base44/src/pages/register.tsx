import { useState, FormEvent, ChangeEvent } from "react";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otpCode, setOtpCode] = useState<string>("");

  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // -------------------------
  // STEP 1: REGISTER
  // -------------------------
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 🔥 Replace with backend later
      console.log("Registering user:", { email, password });

      // Example backend call:
      /*
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      */

      setShowOtp(true);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }

    setLoading(false);
  };

  // -------------------------
  // STEP 2: VERIFY OTP
  // -------------------------
  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Verifying OTP:", { email, otpCode });

      // Example backend call:
      /*
      await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode }),
      });
      */

      alert("Account verified!");
      window.location.href = "/sign-in";
    } catch (err: any) {
      setError(err.message || "Invalid code");
    }

    setLoading(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOtpCode(e.target.value);

  return (
    <div style={{ maxWidth: "420px", margin: "auto", paddingTop: "40px" }}>
      <h2>{showOtp ? "Verify Email" : "Create Account"}</h2>

      {/* ---------------- REGISTER FORM ---------------- */}
      {!showOtp ? (
        <form onSubmit={handleRegister}>
          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <div>
            <label>Email</label><br />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
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
              required
            />
          </div>

          <br />

          <div>
            <label>Confirm Password</label><br />
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      ) : (
        /* ---------------- OTP FORM ---------------- */
        <form onSubmit={handleVerifyOtp}>
          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <div>
            <label>Verification Code</label><br />
            <input
              value={otpCode}
              onChange={handleOtpChange}
              required
            />
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>

          <br /><br />

          <button
            type="button"
            onClick={() => console.log("Resend OTP to", email)}
          >
            Resend Code
          </button>
        </form>
      )}

      <br />

      {!showOtp && (
        <p>
          Already have an account?{" "}
          <a href="/sign-in">Sign In</a>
        </p>
      )}
    </div>
  );
}