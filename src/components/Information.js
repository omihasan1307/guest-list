import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.init";
import useBudget from "../Hooks/useBudget";
import useCost from "../Hooks/useCost";
import useGuest from "../Hooks/useGuest";
import "./../App.css";
const Information = () => {
  const [user, loading, error] = useAuthState(auth);
  const [budget, setBudget, totalBudget] = useBudget();
  const [userCost, setUserCost, cost] = useCost();
  const [inviteList, setInviteList, totalGuest] = useGuest();
  console.log(totalBudget);
  return (
    <div className="">
      <div className="flex justify-around text-center mt-7">
        <div className="border p-10 rounded-3xl customBudget text-white w-full mx-2">
          <p>Total Budget</p>
          <h1 className="text-5xl font-bold">{totalBudget} Tk</h1>
        </div>
        <div className="border p-10 rounded-3xl customSpent text-white w-full mx-2">
          <p>Spent Amount</p>
          <h1 className="text-5xl font-bold">{cost} Tk</h1>
        </div>
        <div className="border p-10 rounded-3xl customGuest text-white w-full mx-2">
          <p>Invited Guest</p>
          <h1 className="text-5xl font-bold">{totalGuest} Person</h1>
        </div>
      </div>
    </div>
  );
};

export default Information;
