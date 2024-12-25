import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export const RecentCommitsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return <div>{user?.username}</div>;
};
