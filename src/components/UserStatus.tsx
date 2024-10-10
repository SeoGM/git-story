// src/layouts/UserStatus.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface GitHubUser {
  login: string;
  avatar_url: string;
}

const UserStatus: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get<GitHubUser>(
        "https://api.github.com/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      sessionStorage.removeItem("access_token");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    setUser(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center">
      <img
        src={user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
      <span>{user.login}</span>
      <button
        onClick={handleLogout}
        className="ml-4 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserStatus;
