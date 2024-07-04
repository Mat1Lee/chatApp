import React, { useContext } from "react";

import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faVideo,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <div className="chat">
      <div className="chatInfo">
        {data.chatId !== "null" && (
          <div
            className="userIn"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img src={data?.user?.photoURL} alt="" />
            <span>{data?.user?.displayName}</span>
          </div>
        )}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
