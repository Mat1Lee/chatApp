import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Input } from "antd";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { debounce } from "lodash";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { Search } = Input;
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    if (!username.trim()) {
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErr(true);
        setUser(null);
      } else {
        setErr(false);
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setUser(userData.length > 0 ? userData[0] : null);
        console.log(user, 'asdasd');
      }
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
const debounceSearch = debounce(handleSearch, 500);
  useEffect(() => {
    debounceSearch()
  }, [username]);
  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;

  //       console.log(combinedId);
  //       console.log('user',user)
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) {}

  //   setUser(null);
  //   setUsername("")
  // };
  const { dispatch, data } = useContext(ChatContext);
  const handleSelect = (u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="search">
      <Search
        placeholder="Nhập tên người dùng"
        onChange={(e) => setUsername(e.target.value)}
        allowClear
      />
      {err && <span>User not found!</span>}
      {user &&username && (
        <div className="userChat" onClick={()=>handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
