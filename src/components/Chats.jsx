import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch, data } = useContext(ChatContext);
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      const docRef = collection(db, 'users');
      getDocs(docRef)
        .then((snapshot) => {
          const use = [];
          snapshot.docs.forEach((doc) => {
            use.push({ ...doc.data(), id: doc.id });
          });

          // console.log(use);
          const newUse = use.filter((item) => item.uid !== currentUser.uid);
          setChats(newUse);
        });
    }
  }, [currentUser, navigate]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats"
    style={{maxHeight: 'calc(100vh - 120px)'}}
    >
      {chats?.map((chat, index) => (
        <div
          className={`${data?.user.uid === chat.uid ? 'active' : ''} userChat`.trim()}
          key={index}
          onClick={() => handleSelect(chat)}
        >
          <img src={chat.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
