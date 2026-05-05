import { useState, FormEvent, ChangeEvent } from "react";

export default function ResetPassword(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // 🔥 Replace with real backend later
      console.log("Reset password request:", {
        token,
        newPassword,
      });

      // Example backend call:
      /*
      await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword,
        }),
      });
      */

      alert("Password reset successful!");
      window.location.href = "/sign-in";
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    }

    setLoading(false);
  };

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  return (
    <div style={{ maxWidth: "420px", margin: "auto", paddingTop: "40px" }}>
      <h2>Reset Password</h2>
      <p>Enter your new password below</p>

      <form onSubmit={handleSubmit}>
        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <div>
          <label>New Password</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
            required
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}