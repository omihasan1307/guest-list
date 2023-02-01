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
import RequiredAuth from "./components/RequiredAuth";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home></Home>
            </RequiredAuth>
          }
        >
          <Route path="/profile" element={<Profile />}>
            <Route path="info" element={<Information></Information>}></Route>
            <Route path="pictures" element={<Picture />}></Route>
          </Route>
          <Route path="/inviteGuest" element={<InviteGuest />}></Route>
          <Route path="/entryGuest" element={<EntryGuest />}></Route>
          <Route path="/cost" element={<Cost />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
