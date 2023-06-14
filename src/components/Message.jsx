import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import formatRelative from "date-fns/esm/fp/formatRelative/index.js";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
// console.log(message.date)
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  
  return (
    <>
  
    
     <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : message.photoURL
          }
          alt=""
        />
        <span>{message.displayName}</span>
        
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        { <img src={message.img} alt="" />}
      </div>
    </div>
    </>
   
  );
};

export default Message;
