import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// 커밋 데이터를 위한 인터페이스 정의
interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

// 데이터를 가져오는 함수 정의 (타입을 명시적으로 설정)
const fetchCommits = async (): Promise<Commit[]> => {
  const { data } = await axios.get<Commit[]>('https://api.github.com/repos/facebook/react/commits');
  return data;
};

const GitHubCommits: React.FC = () => {
  // useQuery에서 제네릭 타입 설정
  const { data, error, isLoading } = useQuery<Commit[]>({
    queryKey: ['commits'],
    queryFn: fetchCommits,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Recent Commits</h2>
      <ul>
        {data?.map((commit) => (
          <li key={commit.sha}>
            <p><strong>Message:</strong> {commit.commit.message}</p>
            <p><strong>Author:</strong> {commit.commit.author.name}</p>
            <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
            <a href={commit.html_url} target="_blank" rel="noopener noreferrer">View Commit</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCommits;
