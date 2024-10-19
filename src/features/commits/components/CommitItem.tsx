import React from "react";
import { Commit } from "../types";

interface CommitItemProps {
  commit: Commit;
}

const CommitItem: React.FC<CommitItemProps> = ({ commit }) => {
  return (
    <div className="commit-item p-4 border-b border-gray-300">
      <h3 className="font-bold">{commit.commit.message}</h3>
      <p className="text-gray-600">Author: {commit.commit.author.name}</p>
      <p className="text-gray-600">Date: {commit.commit.author.date}</p>
    </div>
  );
};

export default CommitItem;
