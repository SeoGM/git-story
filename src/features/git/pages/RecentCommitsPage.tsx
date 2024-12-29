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
    queryFn: () => fetchUserRepos(user.username, user.accessToken),
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
          fetchCommits(user.username, repo.name, user.accessToken).then(data =>
            data
              .filter((commit: any) =>
                commit.commit.author.date.startsWith(today)
              )
              .map((commit: any) => ({
                ...commit,
                repoName: repo.name, // 저장소 이름 추가
              }))
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        GitHub Polling
      </h1>

      {/* 커밋 로딩/에러 상태 */}
      {commitsLoading && (
        <p className="text-center text-blue-500">Loading commits...</p>
      )}
      {commitsError && (
        <p className="text-center text-red-500">
          Error loading commits: {commitsError.message}
        </p>
      )}

      <h2 className="text-xl font-semibold text-gray-700 mt-6">
        Today Commits
      </h2>
      {commits?.length ? (
        <ul className="space-y-4 mt-4">
          {commits.map((commit: any, index: number) => (
            <li
              key={commit.sha || index}
              className="border border-gray-300 rounded-lg p-4"
            >
              <p>
                <span className="font-bold text-gray-700">Repository:</span>{" "}
                {commit.repoName}
              </p>
              <p>
                <span className="font-bold text-gray-700">Message:</span>{" "}
                {commit.commit.message}
              </p>
              <p>
                <span className="font-bold text-gray-700">Date:</span>{" "}
                {commit.commit.author.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No commits found for today.</p>
      )}

      <button
        onClick={() => refetchCommits()}
        disabled={commitsLoading || !repos}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:opacity-50 mt-6"
      >
        Check Today Commits
      </button>

      {/* 저장소 로딩/에러 상태 */}
      {reposLoading && (
        <p className="text-center text-blue-500 mt-6">
          Loading repositories...
        </p>
      )}
      {reposError && (
        <p className="text-center text-red-500">
          Error loading repositories: {reposError.message}
        </p>
      )}
      <button
        onClick={() => refetchRepos()}
        disabled={reposLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 mt-4"
      >
        Refresh Repositories
      </button>

      {/* 저장소 목록 출력 */}
      <h2 className="text-xl font-semibold text-gray-700 mt-6">Repositories</h2>
      {repos ? (
        <ul className="list-disc pl-6 space-y-2">
          {repos.map((repo: any) => (
            <li key={repo.id} className="text-gray-600">
              {repo.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No repositories found.</p>
      )}
    </div>
  );
};
