const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// CORS 설정
app.use(
  cors({
    origin: [
      "https://git-story-rouge.vercel.app",
      "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// Passport 초기화
app.use(passport.initialize());

const callbackURL =
  process.env.APP_ENV === "vercel"
    ? "https://git-story-rouge.vercel.app/auth/github/callback"
    : "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io/auth/github/callback";

// GitHub Strategy 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// GitHub로 로그인 라우트
app.get("/auth/github", passport.authenticate("github"));

// GitHub 콜백 라우트
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  (req, res) => {
    // JWT 생성
    const token = jwt.sign(
      {
        id: req.user.id,
        username: req.user.username,
        avatar_url: req.user.photos[0].value,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 쿠키에 토큰 설정 (secure와 sameSite 설정 포함)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // HTTPS 환경에서만 작동
      sameSite: "lax", // 동일 출처 요청에 대해 쿠키 전송
    });

    const redirectURL =
      process.env.APP_ENV === "vercel"
        ? "https://git-story-rouge.vercel.app"
        : "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us117.gitpod.io";

    res.redirect(redirectURL);
  }
);

// 인증된 사용자 정보 확인 라우트
app.get("/profile", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("로그인이 필요합니다.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      id: decoded.id,
      username: decoded.username,
      avatar_url: decoded.avatar_url,
    });
  } catch (error) {
    res.status(401).send("토큰이 유효하지 않습니다.");
  }
});

// 서버 시작
app.listen(4000, () => {
  console.log("Backend server is running");
});
