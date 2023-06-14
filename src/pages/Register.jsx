import React, { useState } from "react";
// import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash,faFileImage} from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [err, setErr] = useState(false);
  const [eye,setEye] = useState(true);
  const [pass,setPass] = useState('password')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {
              id: res.user.uid,
               displayName,
              email,
              photoURL: downloadURL,
            });
            navigate("/");console.log('setUser')
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  const Eye =()=>{
    if(pass=='password'){
      setPass('text');
      setEye(false)
    }else{
      setPass('password')
      setEye(true)
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Fun Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <div className="input-text">
          <input type={pass} placeholder="password" ></input>
          <FontAwesomeIcon onClick={Eye} icon={eye ? faEyeSlash : faEye}/>
          </div>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
          <FontAwesomeIcon className="icon-send" icon={faFileImage}/>
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
