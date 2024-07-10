import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import { Form, Input, Button, Upload, message, Spin } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UploadOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    const { displayName, email, password, file } = values;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      if (file) {
        const uploadTask = uploadBytesResumable(storageRef, file.file);
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error("Upload error:", error);
            setLoading(false);
            message.error("Failed to upload the image");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {
                id: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              navigate("/");
              setLoading(false);
            });
          }
        );
      } else {
        await updateProfile(res.user, {
          displayName,
          photoURL: '',
        });
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: '',
        });
        await setDoc(doc(db, "userChats", res.user.uid), {
          id: res.user.uid,
          displayName,
          email,
          photoURL: '',
        });
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setErr(true);
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Fun Chat</span>
        <span className="title">Register</span>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: 'Please input your display name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Display Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="file"
            valuePropName="file"
            style={{ marginBottom: 0,textAlign:'center' }}
            getValueFromEvent={(e) => (e && e.fileList.length > 0 ? e.fileList[0] : null)}
          >
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Add an avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{ textAlign:'center' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign up
            </Button>
          </Form.Item>
          {err && <span style={{ color: 'red' }}>Something went wrong</span>}
        </Form>
        <p>
          You do have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
