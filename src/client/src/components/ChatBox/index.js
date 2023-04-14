import React from "react";
import { useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import ChatContent from "./ChatContent";
import ReceiveChat from "./ReceiveChat";
import SentChat from "./SentChat";
const ChatBox = () => {
  const { user } = useSelector((state) => state.auth);
  const data = [
    { user: { id: 13, avatar: user.avatar }, type: "text", content: "Hello" },
    { user: { id: 14, avatar: user.avatar }, type: "text", content: "Hi" },
    {
      user: { id: 13, avatar: user.avatar },
      type: "text",
      content: "Nice to meet you",
    },
    {
      user: { id: 14, avatar: user.avatar },
      type: "text",
      content: "Nice to meet you too",
    },
    {
      user: { id: 14, avatar: user.avatar },
      type: "text",
      content: "What is your name",
    },
  ];
  return (
    <div className="w-[328px] h-[445px] bg-white shadow-lg flex flex-col rounded-t-lg">
      <div className="w-full max-h-11 min-h-11 shadow flex item-center justify-between p-1">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all p-2 rounded-lg">
          <div className="border w-8 h-8 border-grayCard bg-white  rounded-full f-center overflow-hidden ">
            <img src={user.avatar} className="w-full object-cover"></img>
          </div>
          <span className="font-medium text-base">{user.userName}</span>
        </div>
      </div>
      <ChatContent>
        {data &&
          data.map((chat) => {
            if (chat.user.id == user.id) {
              return <SentChat content={chat.content}></SentChat>;
            } else {
              return (
                <ReceiveChat
                  image={chat.user.avatar}
                  content={chat.content}
                ></ReceiveChat>
              );
            }
          })}
      </ChatContent>
      <div className="mt-auto flex items-center justify-between p-2 text-[#bcc0c4]">
        <span class="material-symbols-rounded cursor-pointer">add_circle</span>
        <span class="material-symbols-rounded cursor-pointer">
          photo_library
        </span>
        <span class="material-symbols-rounded cursor-pointer">mood</span>
        <TextareaAutosize
          className="rounded-lg text-sm py-1.5 px-2 text-black outline-none focus:outline-none"
          placeholder="Aa"
        />
        <span class="material-symbols-rounded">thumb_up</span>
      </div>
    </div>
  );
};

export default ChatBox;
