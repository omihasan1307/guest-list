import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import InviteGuest from "./components/InviteGuest";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import EntryGuest from "./components/EntryGuest";
import Cost from "./components/Cost";
import Information from "./components/Information";
import Picture from "./components/Picture";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route path="/profile" element={<Profile />}>
            <Route path="info" element={<Information></Information>}></Route>
            <Route path="pictures" element={<Picture />}></Route>
          </Route>
          <Route path="/inviteGuest" element={<InviteGuest />}></Route>
          <Route path="/entryGuest" element={<EntryGuest />}></Route>
          <Route path="/logIn" element={<Login />}></Route>
          <Route path="/cost" element={<Cost />}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: "#6b21a8",
        }}
      />
    </div>
  );
}

export default App;
