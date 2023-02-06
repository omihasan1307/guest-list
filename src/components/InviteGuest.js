import moment from "moment/moment";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase.init";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";

const InviteGuest = () => {
  const [inviteList, setInviteList] = useState([]);
  const [update, setUpdate] = useState({});
  const user = auth.currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const address = e.target.address.value;
    const member = e.target.member.value;
    const time = moment().format("DD/MM/YYYY, h:mm:ss a");
    handleAddGuest(name, address, member, e, time);
  };

  const handleAddGuest = async (name, address, member, e, time) => {
    onSnapshot(
      query(
        collection(db, `guestList/${user?.uid}/list`),
        where("name", "==", name)
      ),
      async (snapshot) => {
        if (snapshot.empty) {
          const docRef = await addDoc(
            collection(db, `guestList/${user?.uid}/list`),
            {
              name: name,
              address: address,
              member: member,
              time: time,
            }
          );
          await updateDoc(doc(db, `guestList/${user?.uid}/list`, docRef.id), {
            id: docRef.id,
          });

          const abDocRef = await addDoc(
            collection(db, `absentGuest/${user?.uid}/list`),
            {
              name: name,
              address: address,
              member: member,
              time: time,
            }
          );

          await updateDoc(
            doc(db, `absentGuest/${user?.uid}/list`, abDocRef.id),
            {
              id: abDocRef.id,
            }
          );
        } else {
        }
        e.target.reset();
      }
    );
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, `guestList/${user?.uid}/list`),
        orderBy("time", "asc")
      ),
      (snapshot) => {
        setInviteList(snapshot.docs.map((e) => e.data()));
      },
      (error) => {}
    );
  }, [user?.uid]);

  const handleRemoveGuest = async (id) => {
    await deleteDoc(doc(db, `guestList/${user?.uid}/list`, id));
  };

  const handleUpdateGuest = (id) => {
    onSnapshot(
      collection(db, `guestList/${user?.uid}/list`),
      (snapshot) => {
        setUpdate(inviteList.find((e) => e.id === id));
      },
      (error) => {}
    );
  };
  const handleUpdateComplete = async (id) => {
    const name = update.name;
    const address = update.address;
    const member = update.member;
    await updateDoc(doc(db, `guestList/${user?.uid}/list`, id), {
      name: name,
      address: address,
      member: member,
    });
  };

  const handleEditName = (e) => {
    const { name, ...rest } = update;
    const newName = e.target.value;
    const newGuest = { name: newName, ...rest };
    setUpdate(newGuest);
  };
  const handleEditAddress = (e) => {
    const { address, ...rest } = update;
    const newAddressValue = e.target.value;
    const newAddress = { address: newAddressValue, ...rest };
    setUpdate(newAddress);
  };
  const handleEditMember = (e) => {
    const { member, ...rest } = update;
    const newMemberValue = e.target.value;
    const newMember = { member: newMemberValue, ...rest };
    setUpdate(newMember);
  };

  let totalGuest = 0;
  for (const element of inviteList) {
    totalGuest = totalGuest + parseInt(element.member);
  }

  return (
    <div className="grid lg:grid-cols-5 ">
      <div className="lg:col-span-2 border border-transparent lg:border-r-slate-700">
        <h2 className="text-2xl font-semibold text-center text-slate-700 uppercase">
          Add Guest
        </h2>

        <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
          <label htmlFor="name" className="px-2 text-slate-800 text-sm">
            Name:{" "}
          </label>
          <input
            className="w-full p-2 my-2 outline-none border border-cyan-500 rounded block"
            type="text"
            name="name"
            placeholder="Guest name"
            required
          />

          <label htmlFor="address" className="px-2 text-sm text-slate-800">
            Address:{" "}
          </label>
          <input
            className="w-full  p-2 my-2 border border-cyan-500 outline-none rounded block"
            type="text"
            name="address"
            placeholder="Guest address"
            required
          />

          <label htmlFor="member" className="px-2 text-sm text-slate-800">
            Member:{" "}
          </label>
          <input
            className="w-full  p-2 my-2 border border-cyan-500 outline-none rounded block"
            type="number"
            name="member"
            placeholder="Guest member"
            required
          />
          <input
            className="w-full cursor-pointer bg-cyan-500 text-white p-2 mt-7 outline-none rounded block hover:bg-cyan-600"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
      <div className="lg:col-span-3 lg:px-8">
        <div>
          <h2 className="text-2xl font-semibold text-center my-8 lg:my-0 lg:mb-5 text-slate-700 uppercase">
            Guest Invited: {totalGuest}
          </h2>
          <table className="tableSl text-center w-full">
            <tr className="bg-cyan-500 text-white ">
              <th>SL</th>
              <th>Name</th>
              <th>Address</th>
              <th>Memeber</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            {inviteList.map((e) => (
              <tr key={e.id}>
                <td>{}</td>
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>{e.member}</td>
                <td>
                  <label htmlFor="my-modal">
                    <FontAwesomeIcon
                      onClick={() => handleUpdateGuest(e.id)}
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
                        htmlFor="name"
                        className="px-2 font-sm text-slate-800"
                      >
                        Name:
                      </label>
                      <input
                        className=" w-full bg-gray-100 p-2 my-2 border border-cyan-500 outline-green-500 rounded block"
                        type="text"
                        name="name"
                        value={update.name}
                        onChange={handleEditName}
                        placeholder="Guest name"
                        required
                      />

                      <label
                        htmlFor="address"
                        className="px-2 font-sm text-slate-800"
                      >
                        Address:
                      </label>
                      <input
                        className="w-full bg-gray-100 p-2 my-2 border border-cyan-500 outline-green-500 rounded block"
                        type="text"
                        name="address"
                        value={update.address}
                        onChange={handleEditAddress}
                        placeholder="Guest address"
                        required
                      />

                      <label
                        htmlFor="member"
                        className="px-2 font-sm text-slate-800"
                      >
                        Member:
                      </label>
                      <input
                        className="w-full bg-gray-100 p-2 my-2 border  border-cyan-500 outline-green-500 rounded block"
                        type="number"
                        name="member"
                        placeholder="Guest member"
                        onChange={handleEditMember}
                        value={update.member}
                        required
                      />

                      <div className="modal-action">
                        <label
                          onClick={() => {
                            handleUpdateComplete(e.id);
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
                    onClick={() => handleRemoveGuest(e.id)}
                    className=" hover:text-red-800 cursor-pointer"
                    icon={faTrash}
                  />{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default InviteGuest;
