import { FieldValue, arrayRemove, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { useChatMessages } from "../hook/message";
import { AuthContext } from "../context/AuthContext";
import { formatRelative } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [content,setContent] = useState('')
  const { currentUser } = useContext(AuthContext);
  const { messageshook} = useChatMessages(data?.chatId);
  const [isEdit, setEdit] = useState({id: null, isEdit: false});
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
  const updateMessage = async(value, messageId)=> {
    // Access the document
    const docRef = doc(db, 'chats', data?.chatId);
  
    // Update the document by removing the specific message
    const messageIndex = messages.findIndex((message) => message.id === messageId);
    messages[messageIndex].text = value;
    await updateDoc(docRef, {
      messages,
    });
  
  
    console.log(`Message with ID ${messageId} deleted successfully.`);
  }
  async function deleteMessageByIndex(documentId, index) {
    const docRef = doc(db, 'chats', documentId);
    if (index < 0 || index >= messages.length) {
      console.log('Invalid index');
      return;
    }
  
    messages.splice(index, 1);
  
    await updateDoc(docRef, {
      messages,
    });
  
    console.log(`Message at index ${index} deleted successfully.`);
  }
  return (
    <div className="messages" >
      {messages.map((message, index) => (
        <div
          className={`message ${message.senderId === currentUser.uid && "owner"}`}
          key={message.id}
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
            <div className="text-message" style={{minWidth: '130px'}}>
              {isEdit.id === message.id && isEdit.isEdit ? (
                <input
                  type="text"
                  defaultValue={message.text}
                  style={{ width: '100%', border: 'none', outline: 'none' }}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <p>{message.text}</p>
              )}
              <span style={{ fontSize: '14px',float: 'right' }}>{formatRelative(message.date, new Date())}</span>
            </div>
            <div className="text-message-info" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <span>
                {isEdit.id === message.id && isEdit.isEdit ? (
                  <span style={{ cursor: 'pointer' }} onClick={() => setEdit({ id: null, isEdit: false })}><span style={{ marginRight: '5px' }}
                  onClick={(value) => {
                    // console.log(content)
                    updateMessage(content, message.id);
                  }}
                  >Gửi</span>Hủy</span>
                ) : (
                  <EditOutlined
                    color="green"
                    onClick={() => {
                      setEdit({ id: message.id, isEdit: true });
                    }}
                  />
                )}
              </span>
              <span>
                <DeleteOutlined
                  color="red"
                  onClick={() => {
                    deleteMessageByIndex(data.chatId, index);
                  }}
                />
              </span>
            </div>
            {message.img && <img src={message.img} alt="" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
