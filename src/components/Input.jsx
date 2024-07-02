import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faPaperPlane,faPaperclip,faFaceSmile,faFileImage,  } from '@fortawesome/free-solid-svg-icons';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,onSnapshot
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import formatRelative from "date-fns/esm/fp/formatRelative/index.js";
import {formatDate} from "../helpers/index.js";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [doc1,setDoc1] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // console.log(data)

const getChats = () => {
  const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
    setDoc1(doc._document)
  });

  return () => {
    unsub();
  };
}

 getChats();
  const handleSend = async () => {
    if(text!== ''){
 if (img) {
      const storageRef = ref(storage, uuid());
      
      const uploadTask = uploadBytesResumable(storageRef, img);
        // console.log(data.chatId);
      uploadTask.on(
        (error) => {
         
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data?.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: formatDate(Timestamp.now()),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {

      if(doc1 !== null){
   await updateDoc(doc(db, "chats", data?.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text:text.trim(),
          senderId: currentUser.uid,
          date: formatDate(Timestamp.now()),
          photoURL:currentUser.photoURL,
        
        }),
      });


      }
       else {
        await setDoc(doc(db, "chats", data?.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: formatDate(Timestamp.now()),
            photoURL:currentUser.photoURL,
          
          }),
        });
       }
   
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data?.chatId + ".lastMessage"]: {
        text,
      },
      [data?.chatId + ".date"]: serverTimestamp(),
    });

   
    setText("");
    setImg(null);

    } else alert('nhap tin nhan')
   
  };
  
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target?.value)}
        value={text}
      />
      <div className="send">
      <FontAwesomeIcon  className="icon-send" icon={faPaperclip}/>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <FontAwesomeIcon className="icon-send" icon={faFileImage}/>
        </label>
        {/* <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        <button onClick={handleSend}><FontAwesomeIcon className="icon-send" icon={faPaperPlane}/></button>
      </div>
    </div>
  );
};

export default Input;
