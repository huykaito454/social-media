import React from "react";

const ChatContent = ({ children }) => {
  return (
    <div className="overflow-y-scroll flex flex-col gap-1 px-3 py-1 w-full">
      {children}
    </div>
  );
};

export default ChatContent;
