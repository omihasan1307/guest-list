import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { auth, db } from "../firebase.init";
import useBudget from "../Hooks/useBudget";
import { handleSaveBudgetToDb } from "../utilities/dbManage";

const Cost = () => {
  const user = auth.currentUser;
  const [userCost, setUserCost] = useState([]);
  const [budget, setBudget, totalBudget] = useBudget();
  const [costUpdate, setCostUpdate] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const pdName = e.target.pdName.value;
    const quantity = e.target.quantity.value;
    const unit = e.target.unit.value;
    const price = e.target.price.value;
    const time = moment().format("DD/MM/YYYY, h:mm:ss a");
    handleCost(pdName, quantity, unit, price, time, e);
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
    toast.success("added successful", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    e.target.reset();
  };

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
  const Balance = totalBudget - cost;

  let warningMsg = 0;
  const a = (((totalBudget / 100) * 0.1) / 100) * 0.1 * 100;
  const b = (((cost / 100) * 0.1) / 100) * 0.1 * 100;
  const c = a - b;
  const d = (((c / 100) * 0.1) / 100) * 0.1;
  // console.log((totalBudget / budget.length) * 100);

  console.log(c);
  // if () {

  // }

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

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-2 border-2 border-transparent border-r-slate-700">
        <h2 className="text-2xl font-semibold text-center ">
          Budget : {totalBudget.toFixed(2)} Tk
        </h2>
        <form onSubmit={(e) => handleSaveBudgetToDb(e)}>
          <label className="px-2 font-semibold text-slate-800" htmlFor="pdName">
            Budget :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            name="budget"
            type="text"
            placeholder="Budget"
            required
          />
          <input
            className="w-3/4 bg-slate-800 text-white p-2 mt-7 outline-none rounded block hover:bg-purple-800"
            type="submit"
            value="Add Budget"
          />
        </form>

        <h2 className="text-2xl font-semibold text-center mt-5 ">Cost Info</h2>

        <form onSubmit={handleSubmit}>
          <label className="px-2 font-semibold text-slate-800" htmlFor="pdName">
            Product Name :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            name="pdName"
            type="text"
            placeholder="Product Name"
            required
          />
          <label
            className="px-2 font-semibold text-slate-800"
            htmlFor="quantity"
          >
            Product Quantity :
          </label>
          <div className="flex  w-3/4">
            <div className="w-10/12">
              <input
                className="w-full p-2 my-2  bg-gray-100 outline-none rounded block"
                name="quantity"
                type="number"
                placeholder="Product Quantity"
                required
              />
            </div>
            <div className="ml-2 w-2/12">
              <select
                name="unit"
                className="w-full p-2 my-2  bg-gray-100 outline-none rounded block"
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                <option value="liter">Liter</option>
                <option value="ti">Ti</option>
              </select>
            </div>
          </div>

          <label className="px-2 font-semibold text-slate-800" htmlFor="price">
            Product Price :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            name="price"
            type="text"
            placeholder="Product Price"
            required
          />

          <input
            className="w-3/4 bg-slate-800 text-white p-2 mt-7 outline-none rounded block hover:bg-purple-800"
            type="submit"
            value="Submit"
          />
        </form>
        <div className=" w-3/4 my-2">
          <h1>Total Budget : {totalBudget} Tk</h1>
          <h1>Spent Cost : {cost} Tk</h1>
          <hr className=" border-1 border-slate-800" />
          <h1>Remaning Balance : {Balance} Tk</h1>
        </div>
      </div>
      <div className="col-span-3 px-8">
        <h2 className="text-2xl font-semibold text-center ">
          Cost Price : {cost}
        </h2>
        <p>
          <table className="tableSl text-center w-full">
            <tr className="bg-slate-800 text-white ">
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
                  <Popup
                    trigger={
                      <button className="button ">
                        {" "}
                        <FontAwesomeIcon
                          onClick={() => handleUpdateCost(data.id)}
                          className=" hover:text-green-800 cursor-pointer"
                          icon={faPenToSquare}
                        />{" "}
                      </button>
                    }
                    modal
                  >
                    {(close) => (
                      <div className="modal p-5">
                        <h4 className="header font-semibold text-slate-800 text-center text-2xl">
                          Update Cost
                        </h4>
                        <div className="content w-3/4 mx-auto">
                          <label
                            htmlFor="costItem"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Cost Item :{" "}
                          </label>
                          <input
                            className=" w-full bg-gray-100 p-2 my-2 border border-purple-800 outline-green-500 rounded block"
                            type="text"
                            name="costItem"
                            value={costUpdate.pdName}
                            onChange={(e) => handleEditCostName(e.target.value)}
                            placeholder="Cost Item"
                            required
                          />
                          <label
                            htmlFor="ItemQuantity"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Item quantity :{" "}
                          </label>
                          <input
                            className=" w-full bg-gray-100 p-2 my-2 border border-purple-800 outline-green-500 rounded block"
                            type="number"
                            name="ItemQuantity"
                            value={costUpdate.quantity}
                            onChange={(e) =>
                              handleEditCostQuantity(e.target.value)
                            }
                            placeholder="Item Quantity"
                            required
                          />
                          <label
                            htmlFor="ItemPrice"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Item Price :{" "}
                          </label>
                          <input
                            className=" w-full bg-gray-100 p-2 my-2 border border-purple-800 outline-green-500 rounded block"
                            type="text"
                            name="ItemPrice"
                            value={costUpdate.price}
                            onChange={(e) =>
                              handleEditCostPrice(e.target.value)
                            }
                            placeholder="Item Price"
                            required
                          />
                          <input
                            className="w-full bg-slate-800 text-white p-2 mt-7 outline-none rounded block hover:bg-purple-800"
                            type="submit"
                            value="submit"
                            onClick={() => {
                              handleUpdateComplete(data.id);
                              close();
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Popup>
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
