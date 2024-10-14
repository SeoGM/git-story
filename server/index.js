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
      "https://3000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

// Passport 초기화
app.use(passport.initialize());

// GitHub Strategy 설정
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://4000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io/auth/github/callback",
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

// GitHub로 로그인 라우트
app.get("/auth/github", passport.authenticate("github"));

// GitHub 콜백 라우트
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: false }),
  (req, res) => {
    // 사용자 정보 확인
    console.log("Authenticated user:", req.user);

    // JWT 생성
    const token = jwt.sign(
      { id: req.user.id, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 쿠키에 토큰 설정
    res.cookie("token", token, { httpOnly: true });
    res.redirect("https://3000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io");
  }
);

// 인증된 사용자 정보 확인 라우트
app.get("/profile", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("로그인이 필요합니다.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(401).send("토큰이 유효하지 않습니다.");
  }
});

// 서버 시작
app.listen(4000, () => {
  console.log(
    "Backend server is running on https://4000-seogm-gitstory-1ayu6plkg6n.ws-us116.gitpod.io"
  );
});
