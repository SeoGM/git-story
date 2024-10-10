import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface GitHubAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code: string) => {
      const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

      // 환경 변수 체크: 값이 없으면 오류 메시지 출력 후 리턴
      if (!clientId || !clientSecret) {
        console.error(
          "Error: GitHub Client ID or Client Secret is not defined."
        );
        return;
      }

      try {
        const response = await axios.post<GitHubAccessTokenResponse>(
          "https://github.com/login/oauth/access_token",
          {
            client_id: clientId,
            client_secret: clientSecret,
            code,
          },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const accessToken = response.data.access_token;
        if (accessToken) {
          sessionStorage.setItem("access_token", accessToken);
          navigate("/"); // 로그인 완료 후 홈으로 리디렉션
        }
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetchAccessToken(code);
    } else {
      console.error("Authorization code is missing from the URL.");
      navigate("/"); // 코드가 없으면 메인으로 리디렉션
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <p className="mt-4">Loading...</p>
    </div>
  );
};

export default Callback;
