type Commit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
};

export const groupByDate = (commits: Commit[]) => {
  const grouped: { [date: string]: Commit[] } = {};
  commits.forEach(commit => {
    const date = commit.commit.author.date.split("T")[0]; // 날짜만 추출
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(commit);
  });
  return grouped;
};
