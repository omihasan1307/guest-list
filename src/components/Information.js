import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.init";
import useBudget from "../Hooks/useBudget";
import "./../App.css";
import { handleSaveBudgetToDb } from "../utilities/dbManage";
const Information = () => {
  const [user, loading, error] = useAuthState(auth);
  const [budget, setBudget, totalBudget] = useBudget();
  console.log(totalBudget);
  return (
    <div className=" mt-5">
      <h1 className="text-2xl">
        Hello,{" "}
        <span className="font-semibold text-purple-800 ">
          {!loading && user.displayName.toUpperCase()}.
        </span>{" "}
        <span>Welcome to our Guest List. </span>
        <span>
          Your total budget is:{" "}
          <span className="font-semibold  text-purple-800">{totalBudget}</span>{" "}
          TK
        </span>
      </h1>
      <form onSubmit={(e) => handleSaveBudgetToDb(e)} className="mt-5">
        <input
          className="w-3/12 p-2 my-2  bg-gray-100 outline-none rounded block"
          name="budget"
          type="text"
          placeholder="Enter Your Budget"
          required
        />
        <input
          className="w-3/12 bg-slate-800 text-white p-2 my-4 outline-none rounded block hover:bg-purple-800"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Information;
