import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useFetchCommitDetail } from "./hooks/useFetchCommitDetail";
import { renderDiff } from "../../../utils/renderDiff";
import { generateBlogPost } from "../../../utils/generateBlogPost";

const CommitDetailPage = () => {
  const { username, repo, sha } = useParams();
  const accessToken = useSelector(
    (state: RootState) => state.auth.user?.accessToken
  );
  const {
    data: commitDetail,
    isLoading,
    error,
  } = useFetchCommitDetail(username!, repo!, sha!, accessToken!);

  const [blogPost, setBlogPost] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const handleGenerateBlog = async () => {
    if (!commitDetail) return;

    setIsGenerating(true);
    try {
      const blogContent = await generateBlogPost(
        commitDetail.commit.message,
        commitDetail.files
      );
      setBlogPost(blogContent);
    } catch (err) {
      console.error("Error generating blog post:", err);
      setBlogPost("Failed to generate blog post. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Commit Detail
      </h1>
      {isLoading && (
        <p className="text-center text-blue-500">Loading commit...</p>
      )}
      {error && (
        <p className="text-center text-red-500">
          Error loading commit: {error.message}
        </p>
      )}
      {commitDetail && (
        <div className="space-y-6">
          {/* Commit Information */}
          <div className="border border-gray-300 rounded-lg p-4">
            <p>
              <span className="font-bold text-gray-700">SHA:</span>{" "}
              {commitDetail.sha}
            </p>
            <p>
              <span className="font-bold text-gray-700">Author:</span>{" "}
              {commitDetail.commit.author.name}
            </p>
            <p>
              <span className="font-bold text-gray-700">Date:</span>{" "}
              {commitDetail.commit.author.date}
            </p>
            <p>
              <span className="font-bold text-gray-700">Message:</span>{" "}
              {commitDetail.commit.message}
            </p>
            <p>
              <span className="font-bold text-gray-700">URL:</span>{" "}
              <a
                href={commitDetail.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on GitHub
              </a>
            </p>
          </div>

          {/* Changed Files */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Changed Files
            </h2>
            {commitDetail.files && commitDetail.files.length > 0 ? (
              <ul className="space-y-4">
                {commitDetail.files.map((file: any) => (
                  <li
                    key={file.filename}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <p>
                      <span className="font-bold text-gray-700">File:</span>{" "}
                      {file.filename}
                    </p>
                    <p>
                      <span className="font-bold text-gray-700">Status:</span>{" "}
                      {file.status}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-md font-semibold text-gray-800 mb-2">
                        Diff:
                      </h3>
                      <div className="bg-gray-100 p-2 rounded-lg overflow-auto">
                        {file.patch ? (
                          renderDiff(file.patch)
                        ) : (
                          <p>No diff available</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No files changed in this commit.</p>
            )}
          </div>

          {/* Generate Blog Section */}
          <button
            onClick={handleGenerateBlog}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating Blog..." : "Generate Blog Post"}
          </button>

          {blogPost && (
            <div className="mt-6 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Generated Blog Post
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">{blogPost}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommitDetailPage;
