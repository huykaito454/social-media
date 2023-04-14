import React from "react";

const SentChat = ({ content }) => {
  return (
    <div className="w-full right-0 flex flex-col items-end justify-end gap-1">
      <div className="max-w-[70%] p-2 text-sm flex-1 bg-primary2 text-white rounded-xl">
        {content}
      </div>
    </div>
  );
};

export default SentChat;
