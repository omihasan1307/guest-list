import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase.init";

const useAbsentGuest = () => {
  const [absent, setAbsent] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `absentGuest/${user?.uid}/list`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setAbsent(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);
  let totalAbsentGuest = 0;
  for (const element of absent) {
    totalAbsentGuest = totalAbsentGuest + parseInt(element.member);
  }

  return [absent, setAbsent, totalAbsentGuest];
};
export default useAbsentGuest;
