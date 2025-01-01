import React from "react";

export const renderDiff = (patch: string): JSX.Element | null => {
  if (!patch) return null;

  const lines = patch.split("\n");
  let oldLineNumber = 0; // 원본 파일 라인 번호
  let newLineNumber = 0; // 수정된 파일 라인 번호

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
      {lines.map((line, index) => {
        let lineClass = ""; // 기본 텍스트 스타일
        let lineBackground = ""; // 라인 배경색
        let displayLineNumber = null;

        if (line.startsWith("@@")) {
          // Hunk 헤더 처리
          const matches = line.match(/@@ -(\d+),?(\d+)? \+(\d+),?(\d+)? @@/);
          if (matches) {
            oldLineNumber = parseInt(matches[1], 10) - 1; // 원본 파일 시작 라인
            newLineNumber = parseInt(matches[3], 10) - 1; // 수정된 파일 시작 라인
          }
          lineClass = "font-bold text-blue-900 py-2 px-4"; // Hunk 헤더 텍스트 스타일
          lineBackground = "bg-blue-100"; // Hunk 헤더 배경색
        } else if (line.startsWith("+")) {
          // 추가된 줄
          lineClass = "text-green-900";
          lineBackground = "bg-green-100"; // 추가된 줄 배경색
          newLineNumber += 1;
          displayLineNumber = { old: "", new: newLineNumber };
        } else if (line.startsWith("-")) {
          // 삭제된 줄
          lineClass = "text-red-900";
          lineBackground = "bg-red-100"; // 삭제된 줄 배경색
          oldLineNumber += 1;
          displayLineNumber = { old: oldLineNumber, new: "" };
        } else {
          // 일반 줄
          lineClass = "text-gray-800";
          oldLineNumber += 1;
          newLineNumber += 1;
          displayLineNumber = { old: oldLineNumber, new: newLineNumber };
        }

        return (
          <div
            key={index}
            className={`grid grid-cols-[50px_50px_1fr] gap-4 items-center ${lineBackground}`}
          >
            {line.startsWith("@@") ? (
              <>
                <span></span>
                <span></span>
                <span className={lineClass}>{line}</span>
              </>
            ) : (
              <>
                <span className="text-gray-500 text-right">
                  {displayLineNumber?.old}
                </span>
                <span className="text-gray-500 text-right">
                  {displayLineNumber?.new}
                </span>
                <span className={`${lineClass} px-4`}>{line}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
