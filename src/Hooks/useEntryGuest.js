import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase.init";

const useEntryGuest = () => {
  const [entry, setEntry] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `entryGuest/${user?.uid}/lists`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setEntry(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);

  return [entry, setEntry];
};
export default useEntryGuest;
