// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./layouts/Header";
import LoginPage from "./pages/Login/LoginPage";
import CommitsPage from "./pages/Commits/CommitsPage";
import Callback from "./auth/Callback";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isLoggedIn = !!sessionStorage.getItem("access_token");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/commits"
            element={isLoggedIn ? <CommitsPage /> : <Navigate to="/" />}
          />
          <Route path="/callback" element={<Callback />} />{" "}
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
