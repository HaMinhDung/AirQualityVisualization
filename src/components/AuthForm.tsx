// src/app/components/AuthForm.tsx
import { useState } from "react";
import Link from "next/link";

type AuthFormProps = {
  isSignup: boolean; // Prop to determine if the form is for signup or login
};

const AuthForm = ({ isSignup }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match!"); // Check for password match during signup
      return;
    }
    // Handle the form submission logic here (e.g., API call)
    alert(`Submitted: ${email}, Password: ${password}`);
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded"
          required
        />
        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4 p-2 border rounded"
            required
          />
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
      
      {/* Navigation Links */}
      <div className="mt-4 text-sm">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">Log In</Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
