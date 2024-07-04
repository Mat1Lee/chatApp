import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { formatRelative } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
// import formatRelative from "date-fns/esm/fp/formatRelative/index.js";
const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
// const deleteMessageById = async (chatId, messageId) => {
//   const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
//   try {
//     const res =   await deleteDoc(messageRef);
//     console.log(`Message with ID ${messageId} deleted successfully.${res}`);
//   } catch (error) {
//     console.error(`Error deleting message with ID ${messageId}:`, error);
//   }
// };
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
         <div className="text-message">
            <p>{message.text} <h/>
              
            </p>
            <span>{formatRelative(message.date, new Date())}</span>
           
         </div>
         <div className="text-message-info" style={{display:'flex',justifyContent:'space-between',gap:'10px'}}>
            <span><EditOutlined  style={{color:'green'}}/></span>
            <span><DeleteOutlined color="red" onClick={() => {
              // console.log(message.id);
              // deleteMessageById(data.chatId,message.id);
            }} /></span>
            
            </div>
      
        { <img src={message.img} alt="" />}
      </div>
    </div>
    </>
   
  );
};

export default Message;
