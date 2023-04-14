import React from "react";
import ChatBox from "../ChatBox";

const Footer = () => {
  return (
    <div className="fixed bottom-0 right-0 flex items-end justify-end p-4 pb-0 gap-5">
      <div>
        <ChatBox></ChatBox>
      </div>
      <div>
        <div className="text-white p-5 bg-primary2 rounded-full f-center cursor-pointer shadow-sm hover:bg-[#7e65cb] active:scale-95 select-none mb-4">
          <span class="material-symbols-outlined">chat</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
