import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Cập nhật đường dẫn này cho phù hợp với dự án của bạn

export const useChatMessages = (chatId) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = onSnapshot(
      doc(db, "chats", chatId),
      (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        } else {
          setError(new Error("Chat does not exist"));
        }
      },
      (error) => {
        setError(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return { messages, error };
};

// export default useChatMessages;
