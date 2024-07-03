import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { get } from "lodash";

export const useSearchMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchUser = async (payload) => {
    if (!get(payload, "userName").trim()) {
      return;
    }

    const q = query(
      collection(db, "users"),
      where("displayName", "==", get(payload, "userName"))
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError(true);
        setMembers(null);
      } else {
        setError(false);
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });
        setMembers(userData.length > 0 ? userData[0] : null);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return { searchUser, loading, error };
};
