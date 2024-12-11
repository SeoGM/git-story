import React from "react";

const BlogPostPreview = ({ content }: { content: string }) => {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Blog Post Preview</h2>
      <p>{content}</p>
    </div>
  );
};

export default BlogPostPreview;
