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
import { capitalize } from "lodash";
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
            {data?.user?.photoURL &&<img src={data?.user?.photoURL} alt="" />}
            <span>{capitalize(data?.user?.displayName)}</span>
          </div>
        )}
      </div>
      <Messages />
      {data.chatId !== "null" &&( <Input />)}
    </div>
  );
};

export default Chat;
