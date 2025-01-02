import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "../style/MarkdownViewer.css";

const MarkdownViewer = () => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error("Error fetching markdown:", error));
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
