import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { auth } from "../firebase.init";
import useAbsentGuest from "../Hooks/useAbsentGuest";
import useBudget from "../Hooks/useBudget";
import useCost from "../Hooks/useCost";
import useEntryGuest from "../Hooks/useEntryGuest";
import useGuest from "../Hooks/useGuest";
import "./../App.css";
const Information = () => {
  const [user, loading, error] = useAuthState(auth);
  const [budget, setBudget, totalBudget] = useBudget();
  const [userCost, setUserCost, cost] = useCost();
  const [inviteList, setInviteList, totalGuest] = useGuest();

  const [absent, setAbsent, totalAbsentGuest] = useAbsentGuest();
  const [entry] = useEntryGuest();

  console.log(entry);

  return (
    <div>
      <div className="lg:flex justify-around text-center mt-3 mx-3">
        <div className="border p-10 rounded-3xl customBudget text-white w-full mx-2">
          <p>Total Budget</p>
          <h1 className="text-5xl font-bold">{totalBudget} Tk</h1>
        </div>
        <div className="border p-10 rounded-3xl customSpent text-white w-full mx-2 my-3 lg:my-0">
          <p>Spent Amount</p>
          <h1 className="text-5xl font-bold">{cost} Tk</h1>
        </div>
        <div className="border p-10 rounded-3xl customGuest text-white w-full mx-2">
          <p>Invited Guest</p>
          <h1 className="text-5xl font-bold">{totalGuest} Person</h1>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 mt-8 mx-3">
        <div className="lg:col-span-3 p-2 w-full">
          {entry.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={entry}>
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <CartesianGrid stroke="#a3a3a3" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-xl text-gray-600">
              There is no data at this time
            </p>
          )}
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-xl text-gray-600 underline text-center">
            Absent Guest List
          </h1>
          {absent.map((e) => (
            <div
              key={e.id}
              className="shadow-md rounded my-2 p-2 w-full lg:w-3/4"
            >
              <p>
                <FontAwesomeIcon icon={faUser} /> {e.name}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {e.address}
              </p>
            </div>
          ))}

          {totalAbsentGuest > 0 && (
            <p className="text-indigo-500">
              {totalAbsentGuest} people did not come to event
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Information;
