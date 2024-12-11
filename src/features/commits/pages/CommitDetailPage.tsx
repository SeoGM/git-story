import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchCommitDetail } from "../hooks/useFetchCommitDetail";
import { useGenerateBlogPost } from "../hooks/useGenerateBlogPost";
import BlogPostPreview from "../components/BlogPostPreview";

const CommitDetailPage = () => {
  const { owner, repo, commitHash } = useParams(); // URL에서 파라미터로 owner, repo, commitHash 가져오기
  const {
    data: commit,
    isLoading,
    isError,
    error,
  } = useFetchCommitDetail(
    // owner!,
    // repo!,
    "SeoGM",
    "git-story",
    commitHash!
  );

  if (isLoading) {
    return <div className="text-center p-4">Loading commit details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error?.message}
      </div>
    );
  }

  const [generatedPost, setGeneratedPost] = useState<string | null>(null);
  const { generatePost, isLoading: isGenerating } = useGenerateBlogPost();
  const handleGeneratePost = async () => {
    const post = await generatePost(commit.commit.message);
    setGeneratedPost(post);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Commit Details</h2>
      <button
        onClick={handleGeneratePost}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Blog Post"}
      </button>
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

      {generatedPost && <BlogPostPreview content={generatedPost} />}
    </div>
  );
};

export default CommitDetailPage;
