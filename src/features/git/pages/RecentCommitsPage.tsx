import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useQuery } from "@tanstack/react-query";
import { fetchCommits, fetchUserRepos } from "../../../app/api/gitApi";

export const RecentCommitsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // `user`가 없을 경우 처리
  if (!user || !user.username) {
    return <p>No user data available</p>;
  }

  // **저장소 목록 가져오기**
  const {
    data: repos,
    isLoading: reposLoading,
    error: reposError,
    refetch: refetchRepos,
  } = useQuery({
    queryKey: ["userRepos", user.username],
    queryFn: () => fetchUserRepos(user.username),
    enabled: !!user.username,
    retry: 1,
  });

  const today = new Date().toISOString().split("T")[0];

  // **오늘 커밋 가져오기**
  const {
    data: commits,
    isLoading: commitsLoading,
    error: commitsError,
    refetch: refetchCommits,
  } = useQuery({
    queryKey: ["todayCommits", user.username],
    queryFn: async () => {
      if (!repos) return []; // 저장소가 없으면 빈 배열 반환
      const allCommits = await Promise.all(
        repos.map((repo: any) =>
          fetchCommits(user.username, repo.name).then(data =>
            data.filter((commit: any) =>
              commit.commit.author.date.startsWith(today)
            )
          )
        )
      );
      return allCommits.flat(); // 모든 커밋 병합
    },
    enabled: !!repos, // 저장소 데이터가 로드되었을 때만 활성화
    retry: 1,
    refetchInterval: 5000, // 5초마다 자동 새로고침
    refetchIntervalInBackground: true, // 브라우저 비활성화 상태에서도 새로고침
  });

  return (
    <div>
      <h1>GitHub Polling</h1>

      {/* 저장소 로딩/에러 상태 */}
      {reposLoading && <p>Loading repositories...</p>}
      {reposError && (
        <p style={{ color: "red" }}>
          Error loading repositories: {reposError.message}
        </p>
      )}
      <button onClick={() => refetchRepos} disabled={reposLoading}>
        Refresh Repositories
      </button>

      {/* 저장소 목록 출력 */}
      <h2>Repositories</h2>
      {repos ? (
        <ul>
          {repos.map((repo: any) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      ) : (
        <p>No repositories found.</p>
      )}

      {/* 커밋 로딩/에러 상태 */}
      {commitsLoading && <p>Loading commits...</p>}
      {commitsError && (
        <p style={{ color: "red" }}>
          Error loading commits: {commitsError.message}
        </p>
      )}
      <button
        onClick={() => refetchCommits}
        disabled={commitsLoading || !repos}
      >
        Check Today Commits
      </button>

      {/* 커밋 데이터 출력 */}
      <h2>Today Commits</h2>
      {commits?.length ? (
        <ul>
          {commits.map((commit: any, index: number) => (
            <li key={commit.sha || index}>
              <p>
                <strong>Message:</strong> {commit.commit.message}
              </p>
              <p>
                <strong>Date:</strong> {commit.commit.author.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No commits found for today.</p>
      )}
    </div>
  );
};
