import React from "react";
import { useParams } from "react-router-dom";
import { useFetchCommitDetail } from "../hooks/useFetchCommitDetail";

const CommitDetailPage = () => {
  const { owner, repo, commitHash } = useParams(); // URL에서 파라미터로 owner, repo, commitHash 가져오기
  const { commit, loading, error } = useFetchCommitDetail(
    // owner!,
    // repo!,
    "SeoGM",
    "git-story",
    commitHash!
  );

  if (loading) {
    return <div className="text-center p-4">Loading commit details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Commit Details</h2>
      <p>
        <strong>Commit Hash:</strong> {commit.sha}
      </p>
      <p>
        <strong>Author:</strong> {commit.commit.author.name}
      </p>
      <p>
        <strong>Date:</strong> {commit.commit.author.date}
      </p>
      <p>
        <strong>Message:</strong> {commit.commit.message}
      </p>

      <h3 className="text-xl font-semibold mt-6">Changed Files</h3>
      <ul className="mt-4 space-y-4">
        {commit.files.map((file: any) => (
          <li
            key={file.filename}
            className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
          >
            <strong className="block text-lg">{file.filename}</strong>
            <span className="block text-sm text-gray-600">
              {file.status} ({file.changes} changes)
            </span>
            <pre className="diff mt-2 bg-gray-900 text-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {file.patch}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitDetailPage;
