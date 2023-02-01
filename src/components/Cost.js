import {
  faEraser,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { auth, db } from "../firebase.init";
import useBudget from "../Hooks/useBudget";
import useCost from "../Hooks/useCost";
import { handleSaveBudgetToDb } from "../utilities/dbManage";

const Cost = () => {
  const user = auth.currentUser;
  const [userCost, setUserCost, cost] = useCost();
  const [budget, setBudget, totalBudget] = useBudget();
  const [costUpdate, setCostUpdate] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const pdName = e.target.pdName.value;
    const quantity = e.target.quantity.value;
    const unit = e.target.unit.value;
    const price = e.target.price.value;
    const time = moment().format("DD/MM/YYYY, h:mm:ss a");

    if (totalBudget > 0) {
      handleCost(pdName, quantity, unit, price, time, e);
    } else {
      toast.error("Please add your budget first");
    }
  };

  const handleCost = async (pdName, quantity, unit, price, time, e) => {
    const docRef = await addDoc(collection(db, `cost/${user?.uid}/item`), {
      pdName: pdName,
      quantity: quantity,
      unit: unit,
      price: parseFloat(price),
      time: time,
    });
    await updateDoc(doc(db, `cost/${user?.uid}/item`, docRef.id), {
      id: docRef.id,
    });
    e.target.reset();
  };

  const Balance = totalBudget - cost;

  let warningMsg = "";
  const totalPercentage = (cost / totalBudget) * 100;
  console.log(cost / totalBudget);
  if (Math.sign(totalPercentage) === -1) {
    warningMsg = "You have crossed your total budget limit";
  } else {
    if (isNaN(totalPercentage)) {
      warningMsg = `You spent 0.0% of your total budget`;
    } else {
      warningMsg = `You spent ${totalPercentage.toFixed(
        2
      )}% of your total budget`;
    }
  }

  const handleRemoveGuest = async (id) => {
    await deleteDoc(doc(db, `cost/${user?.uid}/item`, id));
  };

  const handleUpdateCost = (id) => {
    onSnapshot(
      collection(db, `cost/${user?.uid}/item`),
      (snapshot) => {
        setCostUpdate(userCost.find((e) => e.id === id));
      },
      (error) => {}
    );
  };

  const handleEditCostName = (e) => {
    const { pdName, ...rest } = costUpdate;
    setCostUpdate({ pdName: e, ...rest });
  };
  const handleEditCostQuantity = (e) => {
    const { quantity, ...rest } = costUpdate;
    setCostUpdate({ quantity: e, ...rest });
  };
  const handleEditCostPrice = (e) => {
    const { price, ...rest } = costUpdate;
    setCostUpdate({ price: e, ...rest });
  };
  const handleUpdateComplete = async (id) => {
    await updateDoc(doc(db, `cost/${user?.uid}/item`, id), {
      pdName: costUpdate.pdName,
      quantity: costUpdate.quantity,
      price: costUpdate.price,
    });
  };

  const handleRemoveBudget = async () => {
    for (const elements of budget) {
      await deleteDoc(doc(db, `budget/${user?.uid}/Tk`, elements.id));
    }
  };

  return (
    <div className="grid lg:grid-cols-5">
      <div className="lg:col-span-2 border border-transparent lg:border-r-slate-700">
        <h2 className="text-2xl font-semibold text-center ">
          YOUR BUDGET: {totalBudget.toFixed(2)}
          <span className="text-sm lowercase">tk</span>{" "}
          <sup className="text-cyan-500 cursor-pointer" title="Clear Budget">
            <FontAwesomeIcon icon={faEraser} onClick={handleRemoveBudget} />
          </sup>
        </h2>{" "}
        <form
          className="w-3/4 mx-auto"
          onSubmit={(e) => handleSaveBudgetToDb(e)}
        >
          <input
            className="w-full p-2 my-2  border border-cyan-500 outline-none rounded block"
            name="budget"
            type="text"
            placeholder="Budget"
            required
          />
          <input
            className="w-full bg-cyan-500 text-white p-2 mt-5 outline-none rounded block hover:bg-cyan-600"
            type="submit"
            value="Add Budget"
          />
        </form>
        <h2 className="text-2xl font-semibold text-center mt-8">
          COST INFORMATION
        </h2>
        <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
          <label className="px-2 text-sm text-slate-800" htmlFor="pdName">
            Product Name:
          </label>
          <input
            className="w-full p-2 my-2  border border-cyan-500 outline-none rounded block"
            name="pdName"
            type="text"
            placeholder="Product Name"
            required
          />
          <label className="px-2 text-sm text-slate-800" htmlFor="quantity">
            Product Quantity:
          </label>
          <div className="flex  w-full">
            <div className="w-3/4">
              <input
                className="w-full p-2 my-2  border border-cyan-500 outline-none rounded block"
                name="quantity"
                type="number"
                placeholder="Product Quantity"
                required
              />
            </div>
            <div className="ml-2 w-3/12">
              <select
                name="unit"
                className="w-full p-2 my-2  border border-cyan-500 outline-none rounded block"
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                <option value="liter">Liter</option>
                <option value="ti">Ti</option>
              </select>
            </div>
          </div>

          <label className="px-2 text-sm text-slate-800" htmlFor="price">
            Product Price:
          </label>
          <input
            className="w-full p-2 my-2  border border-cyan-500 outline-none rounded block"
            name="price"
            type="text"
            placeholder="Product Price"
            required
          />

          <input
            className="w-full bg-cyan-500 text-white p-2 mt-7 outline-none rounded block hover:bg-cyan-600"
            type="submit"
            value="Submit"
          />
        </form>
        <div className="w-3/4 mx-auto mt-5 text-center lg:text-left">
          <div className="flex justify-between">
            <p>Total Budget</p>
            <p>
              {totalBudget}
              <span className="text-sm lowercase">tk</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p>Spent Amount</p>
            <p>
              {cost}
              <span className="text-sm lowercase">tk</span>
            </p>
          </div>
          <hr className="border-1 border-slate-800" />
          <div className="flex justify-between">
            <p>
              {Math.sign(Balance) === -1
                ? "Over Balance"
                : Math.sign(Balance) === 0
                ? "Remaning Balance"
                : "Remaning Balance"}
            </p>

            <p>
              <span className="font-normal">
                {Balance > 0 ? Balance : Math.abs(Balance)}
              </span>
              <span className="text-sm lowercase font-normal">tk</span>
            </p>
          </div>

          {totalPercentage > 50 ? (
            <p className="text-rose-900 bg-rose-200 py-2 text-center my-3">
              {warningMsg}
            </p>
          ) : (
            <p className="text-green-900 bg-green-200 py-2 text-center my-3">
              {warningMsg}
            </p>
          )}
        </div>
      </div>
      <div className="lg:col-span-3 lg:px-8 mt-10 lg:mt-0">
        <h2 className="text-2xl font-semibold text-center uppercase">
          Cost Price: {cost}
          <span className="lowercase text-sm">tk</span>
        </h2>
        <p>
          <table className="tableSl text-center w-full">
            <tr className="bg-cyan-500 text-white ">
              <th>SL</th>
              <th>Name of Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {userCost.map((data) => (
              <tr className="">
                <td>{}</td>
                <td> {data.pdName}</td>
                <td>
                  {" "}
                  {data.quantity} {data.unit}
                </td>
                <td>{data.price} </td>
                <td>
                  <label htmlFor="my-modal">
                    <FontAwesomeIcon
                      onClick={() => handleUpdateCost(data.id)}
                      className=" hover:text-green-800 cursor-pointer"
                      icon={faPenToSquare}
                    />
                  </label>

                  <input
                    type="checkbox"
                    id="my-modal"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box text-left">
                      <h4 className="header font-semibold text-slate-800 text-center text-2xl">
                        Update Infomation
                      </h4>

                      <label
                        htmlFor="costItem"
                        className="px-2 text-sm text-slate-800"
                      >
                        Cost Item:{" "}
                      </label>
                      <input
                        className=" w-full bg-gray-100 p-2 my-2 border border-cyan-500 outline-green-500 rounded block"
                        type="text"
                        name="costItem"
                        value={costUpdate.pdName}
                        onChange={(e) => handleEditCostName(e.target.value)}
                        placeholder="Cost Item"
                        required
                      />
                      <label
                        htmlFor="ItemQuantity"
                        className="px-2 text-sm text-slate-800"
                      >
                        Item quantity:{" "}
                      </label>
                      <input
                        className=" w-full bg-gray-100 p-2 my-2 border border-cyan-500 outline-green-500 rounded block"
                        type="number"
                        name="ItemQuantity"
                        value={costUpdate.quantity}
                        onChange={(e) => handleEditCostQuantity(e.target.value)}
                        placeholder="Item Quantity"
                        required
                      />
                      <label
                        htmlFor="ItemPrice"
                        className="px-2 text-sm text-slate-800"
                      >
                        Item Price:{" "}
                      </label>
                      <input
                        className=" w-full bg-gray-100 p-2 my-2 border border-cyan-500 outline-green-500 rounded block"
                        type="text"
                        name="ItemPrice"
                        value={costUpdate.price}
                        onChange={(e) => handleEditCostPrice(e.target.value)}
                        placeholder="Item Price"
                        required
                      />

                      <div className="modal-action">
                        <label
                          onClick={() => {
                            handleUpdateComplete(data.id);
                          }}
                          htmlFor="my-modal"
                          className="btn w-full bg-cyan-500 text-white flex border-none outline-none rounded hover:bg-cyan-600"
                        >
                          Update
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <FontAwesomeIcon
                    onClick={() => handleRemoveGuest(data.id)}
                    className=" hover:text-red-800 cursor-pointer"
                    icon={faTrash}
                  />{" "}
                </td>
              </tr>
            ))}
          </table>
        </p>
      </div>
    </div>
  );
};

export default Cost;
