import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.init";

const handleSaveBudgetToDb = async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  const re = new RegExp("^[+-]?[0-9]{0,900}(?:\\.[0-9]{0,900})?$");

  const budget = re.test(e.target.budget.value);
  const budgetValue = e.target.budget.value;

  if (budget) {
    const docRef = await addDoc(collection(db, `budget/${user?.uid}/Tk`), {
      budget: budgetValue,
    });
    await updateDoc(doc(db, `budget/${user?.uid}/Tk`, docRef.id), {
      id: docRef.id,
    });
    e.target.reset();
  } else {
    alert("text only");
  }
};
export { handleSaveBudgetToDb };
