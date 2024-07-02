import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { useChatMessages } from "../hook/message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { messageshook} = useChatMessages(data?.chatId);
  console.log(data?.chatId);
  // console.log(messageshook,'  messageshook')
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", data?.chatId),
      (doc) => {
        if (doc.exists()) {
          console.log(doc.data().messages, 'day là màn hình');
          setMessages(doc.data().messages);
        } else {
          console.log('Document does not exist');
          setMessages([]);
        }
      },
      (error) => {
        console.error('Error fetching document: ', error);
      }
    );

    return () => {
      unSub();
    };
  }, [data]);
  // console.log(data.chatId);
  

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
