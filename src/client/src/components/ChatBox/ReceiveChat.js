import React from "react";

const ReceiveChat = ({ image, content }) => {
  return (
    <div className="w-[70%] flex items-start gap-1">
      <div className="border w-7 h-7 border-grayCard bg-white  rounded-full f-center overflow-hidden ">
        <img src={image} className="w-full object-cover"></img>
      </div>
      <div className="p-2 text-sm flex-1 bg-[#e4e6eb] rounded-xl">
        {content}
      </div>
    </div>
  );
};

export default ReceiveChat;
