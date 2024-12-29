require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");

const app = express();

// React의 빌드 파일 제공 (정적 파일 경로 설정)
app.use(express.static(path.join(__dirname, "../build")));

// CORS 설정
app.use(
  cors({
    origin: [
      "https://git-story-rouge.vercel.app",
      "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// Passport 초기화
app.use(passport.initialize());

const callbackURL =
  process.env.REACT_APP_APP_ENV === "vercel"
    ? "https://git-story-rouge.vercel.app/api/auth/github/callback"
    : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io/api/auth/github/callback";

// GitHub Strategy 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.REACT_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile, { accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// API 라우트 예제
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// GitHub로 로그인 라우트
app.get("/api/auth/github", passport.authenticate("github"));

// GitHub 콜백 라우트
app.get(
  "/api/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  (req, res) => {
    const accessToken = req.authInfo.accessToken;
    const user = req.user;

    // JWT 생성
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        avatar_url: user.photos[0].value,
        accessToken: accessToken,
      },
      process.env.REACT_APP_JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 쿠키에 토큰 설정
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    const redirectURL =
      process.env.REACT_APP_APP_ENV === "vercel"
        ? "https://git-story-rouge.vercel.app"
        : "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io";

    res.redirect(redirectURL);
  }
);

// 인증된 사용자 정보 확인 라우트
app.get("/api/auth/profile", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("로그인이 필요합니다.");

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    res.json({
      id: decoded.id,
      username: decoded.username,
      avatar_url: decoded.avatar_url,
      accessToken: decoded.accessToken,
    });
  } catch (error) {
    res.status(401).send("토큰이 유효하지 않습니다.");
  }
});

// 로그아웃
app.get("/api/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).send({ message: "로그아웃 성공" });
});

// React의 index.html 제공 (SPA 지원)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// 로컬 실행용 포트
const PORT = process.env.REACT_APP_PORT || 4000;

// Vercel Serverless 함수용 Export
module.exports = app;
module.exports.handler = serverless(app);

// 로컬에서 실행
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
