import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
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

const EntryGuest = () => {
  const user = auth.currentUser;
  const [searchResult, setSearchResult] = useState({});
  const [search, setSearch] = useState([]);
  const [userList, setUserList] = useState([]);
  const [update, setUpdate] = useState({});

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    const member = e.target.member.value;
    const amount = e.target.amount.value;
    const time = moment().format("DD/MM/YYYY, h:mm:ss a");
    handleGuestEntry(member, amount, e, time);
  };

  const handleGuestEntry = async (member, amount, e, time) => {
    const docRef = await addDoc(
      collection(db, `entryGuest/${user?.uid}/lists`),
      {
        name: searchResult.name,
        address: searchResult.address,
        member: member,
        amount: amount,
        time: time,
      }
    );
    await updateDoc(doc(db, `entryGuest/${user?.uid}/lists`, docRef.id), {
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
      query(
        collection(db, `entryGuest/${user?.uid}/lists`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setUserList(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);

  const handleRemoveGuest = async (id) => {
    await deleteDoc(doc(db, `entryGuest/${user?.uid}/lists`, id));
  };

  let guestMember = 0;
  let guestAmount = 0;
  for (const amount of userList) {
    guestAmount = guestAmount + parseFloat(amount.amount);
    guestMember = guestMember + parseFloat(amount.member);
  }
  const handleUpdateGuest = (id) => {
    onSnapshot(
      collection(db, `entryGuest/${user?.uid}/lists`),
      (snapshot) => {
        setUpdate(userList.find((e) => e.id === id));
      },
      (error) => {}
    );
  };
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `guestList/${user?.uid}/list`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setSearch(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);
  const handleEditGuestName = (e) => {
    const { name, ...rest } = update;
    setUpdate({ name: e, ...rest });
  };
  const handleEditGuestAddress = (e) => {
    const { address, ...rest } = update;
    setUpdate({ address: e, ...rest });
  };
  const handleEditGuestMember = (e) => {
    const { member, ...rest } = update;
    setUpdate({ member: e, ...rest });
  };
  const handleEditGuestAmount = (e) => {
    const { amount, ...rest } = update;
    setUpdate({ amount: e, ...rest });
  };
  const handleUpdateComplete = async (id) => {
    const name = update.name;
    const address = update.address;
    const member = update.member;
    const amount = update.amount;
    await updateDoc(doc(db, `entryGuest/${user?.uid}/lists`, id), {
      name: name,
      address: address,
      member: member,
      amount: amount,
    });
  };

  const handleOnSelect = (item) => {
    setSearchResult(item);
    console.log(item);
  };

  const formatResult = (item) => {
    return (
      <div>
        <p>{item.name}</p>
        <p>{item.address}</p>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-2 border-2 border-transparent border-r-slate-700">
        <h2 className="text-2xl font-semibold text-center ">
          Entry Guest Info
        </h2>

        <form onSubmit={handleEntrySubmit}>
          <label className="px-2 font-semibold text-slate-800" htmlFor="name">
            Name :
          </label>
          <div className="w-3/4 my-1">
            <ReactSearchAutocomplete
              items={search}
              onSelect={handleOnSelect}
              formatResult={formatResult}
              showIcon={false}
              autoFocus
              placeholder="Search guest"
              styling={{
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#f3f4f6",
                boxShadow: "none",
                placeholderColor: "#a9a9a9",
                iconColor: "#f3f4f6",
              }}
            />
          </div>

          <label
            className="px-2 font-semibold text-slate-800"
            htmlFor="address"
          >
            Address :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            type="text"
            name="address"
            placeholder="Guest address"
            // value={searchResult.address}
            required
          />

          <label className="px-2 font-semibold text-slate-800" htmlFor="member">
            Member :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            type="number"
            name="member"
            placeholder="Guest member"
            required
          />

          <label className="px-2 font-semibold text-slate-800" htmlFor="amount">
            Amount :
          </label>
          <input
            className="w-3/4 p-2 my-2  bg-gray-100 outline-none rounded block"
            type="number"
            name="amount"
            placeholder="Amount"
            required
          />

          <input
            className="w-3/4 bg-slate-800 text-white p-2 mt-7 outline-none rounded block hover:bg-purple-800"
            type="submit"
            value="submit"
          />
        </form>
      </div>

      <div className="col-span-3 px-8">
        <div>
          <h2 className="text-2xl font-semibold text-center mb-5">
            Collected Amount : {guestAmount}
          </h2>
          <table className="tableSl text-center w-full">
            <tr className="bg-slate-800 text-white ">
              <th>SL</th>
              <th>Name</th>
              <th>Address</th>
              <th>Memeber</th>
              <th>Amount</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {userList.map((data) => (
              <tr key={data.id}>
                <td>{}</td>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.member}</td>
                <td>{data.amount} TK</td>
                <td>
                  <Popup
                    trigger={
                      <button className="button">
                        {" "}
                        <FontAwesomeIcon
                          onClick={() => handleUpdateGuest(data.id)}
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
                          {" "}
                          Update Infomation
                        </h4>
                        <div className="content w-3/4 mx-auto">
                          <label
                            htmlFor="name"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Name :{" "}
                          </label>
                          <input
                            className=" w-full bg-gray-100 p-2 my-2 border border-purple-800 outline-green-500 rounded block"
                            type="text"
                            name="name"
                            value={update.name}
                            onChange={(e) =>
                              handleEditGuestName(e.target.value)
                            }
                            placeholder="Guest name"
                            required
                          />

                          <label
                            htmlFor="address"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Address :{" "}
                          </label>
                          <input
                            className="w-full bg-gray-100 p-2 my-2 border border-purple-800 outline-green-500 rounded block"
                            type="text"
                            name="address"
                            value={update.address}
                            onChange={(e) =>
                              handleEditGuestAddress(e.target.value)
                            }
                            placeholder="Guest address"
                            required
                          />
                          <label
                            htmlFor="member"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Member :{" "}
                          </label>
                          <input
                            className="w-full bg-gray-100 p-2 my-2 border  border-purple-800 outline-green-500 rounded block"
                            type="number"
                            name="member"
                            placeholder="Guest member"
                            onChange={(e) =>
                              handleEditGuestMember(e.target.value)
                            }
                            value={update.member}
                            required
                          />
                          <label
                            htmlFor="amount"
                            className="px-2 font-semibold text-slate-800"
                          >
                            Amount :{" "}
                          </label>
                          <input
                            className="w-full bg-gray-100 p-2 my-2 border  border-purple-800 outline-green-500 rounded block"
                            type="number"
                            name="amount"
                            placeholder="Guest amount"
                            onChange={(e) =>
                              handleEditGuestAmount(e.target.value)
                            }
                            value={update.amount}
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
            ))}{" "}
            <tr className="bg-slate-800 text-white ">
              <th></th>
              <th>Sum</th>
              <th>=</th>
              <th>{guestMember}</th>
              <th>{guestAmount} TK</th>
              <th>{}</th>
              <th>{}</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntryGuest;
