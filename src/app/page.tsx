"use client";

import { useState, useEffect } from "react";
import TelegramLoginButton from "../component/login"
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const handleTelegramAuth = (user: TelegramUser) => {
    console.log("Authenticated user:", user);
    setUser(user); // Store user details in state
  };
  const handleLogout = () => {
    setUser(null); // Clear the user data
    console.log("User logged out");
    // Optionally redirect to the login page or homepage after logout
    // window.location.href = "/"; // For redirecting to the homepage
  };
  useEffect(() => {
    // Extract user details from query parameters
    const params = new URLSearchParams(window.location.search);
    const userData: TelegramUser = {
      id: Number(params.get("id")),
      first_name: params.get("first_name") || "",
      last_name: params.get("last_name") || undefined,
      username: params.get("username") || undefined,
      photo_url: params.get("photo_url") || undefined,
      auth_date: Number(params.get("auth_date")),
      hash: params.get("hash") || "",
    };

    if (userData.id && userData.first_name) {
      setUser(userData); // Update state with user data
    }
  }, []);

  return (
    <div className="login-page">
      <h1>Login with Telegram</h1>
      <TelegramLoginButton onAuth={handleTelegramAuth} />
      {!user ? (
        <p>Please authenticate via Telegram.</p>
      ) : (
        <div className="user-details">
          <h2>Welcome, {user.first_name}!</h2>
          {user.photo_url && (
            <img
              src={user.photo_url}
              alt={`${user.first_name}'s profile`}
              style={{ width: 100, height: 100, borderRadius: "50%" }}
            />
          )}
          <p>
            <strong>Username:</strong> {user.username || "N/A"}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Authenticated at:</strong>{" "}
            {new Date(user.auth_date * 1000).toLocaleString()}
          </p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
