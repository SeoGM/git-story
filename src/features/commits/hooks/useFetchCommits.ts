import { useQuery } from '@tanstack/react-query';
import { Commit } from '../types';

// fetchCommits 함수를 분리하여 재사용 가능하게 작성
const fetchCommits = async (repoUrl: string): Promise<Commit[]> => {
  const response = await fetch(repoUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  return response.json();
};

export const useFetchCommits = (repoUrl: string) => {
  // useQuery를 통해 데이터 패칭
  const { data: commits, isLoading, error } = useQuery<Commit[], Error>({
    queryFn: () => fetchCommits(repoUrl), // 데이터를 패칭할 함수
    queryKey: [repoUrl], // queryKey를 repoUrl로 설정, 특정 캐싱이 필요 없으면 기본값 사용
    retry: 1, // 요청 실패 시 재시도 횟수 설정
  });

  return { commits, isLoading, error: error?.message || null };
};
