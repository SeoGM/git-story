// src/features/commits/pages/CommitDetailPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Commit } from "../types";

const CommitDetailPage = () => {
  const { commitHash } = useParams();
  const [commit, setCommit] = useState<Commit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCommitDetails = async () => {
      try {
        const response = await fetch(
          //   `https://api.github.com/repos/{owner}/{repo}/commits/${commitHash}`
          `https://api.github.com/repos/SeoGM/git-story/commits/${commitHash}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch commit details");
        }
        const data = await response.json();
        setCommit(data as Commit); // 데이터를 Commit 타입으로 캐스팅
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommitDetails();
  }, [commitHash]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="commit-detail">
      <h2>Commit Details</h2>
      {commit && (
        <>
          <p>Commit Hash: {commit.sha}</p>
          <p>Author Name: {commit.commit.author.name}</p>
          <p>Author GitHub Username: {commit.author.login}</p>
          <p>Date: {commit.commit.author.date}</p>
          <p>Message: {commit.commit.message}</p>
          <div>
            <h3>Files Changed:</h3>
            <ul>
              {commit.files.map(file => (
                <li key={file.filename}>
                  {file.filename} ({file.changes} changes)
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CommitDetailPage;
