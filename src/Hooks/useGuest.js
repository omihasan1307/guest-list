import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase.init";

const useGuest = () => {
  const [inviteList, setInviteList] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `guestList/${user?.uid}/list`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setInviteList(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);
  let totalGuest = 0;
  for (const element of inviteList) {
    totalGuest = totalGuest + parseInt(element.member);
  }

  return [inviteList, setInviteList, totalGuest];
};
export default useGuest;
