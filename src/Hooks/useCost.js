import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase.init";

const useCost = () => {
  const [userCost, setUserCost] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    onSnapshot(
      query(collection(db, `cost/${user?.uid}/item`), orderBy("time", "asc")),
      (snapshot) => {
        setUserCost(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);
  let cost = 0;
  for (const e of userCost) {
    cost = cost + parseInt(e.price);
  }
  return [userCost, setUserCost, cost];
};

export default useCost;
