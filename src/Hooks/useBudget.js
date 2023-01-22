import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase.init";

const useBudget = () => {
  const user = auth.currentUser;
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, `budget/${user?.uid}/Tk`),
      (snapshot) => {
        setBudget(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);

  let totalBudget = 0;
  for (const e of budget) {
    totalBudget = totalBudget + parseFloat(e.budget);
  }

  return [budget, setBudget, totalBudget];
};
export default useBudget;
