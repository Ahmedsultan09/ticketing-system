import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/signIn";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signUp";
import Nav from "./components/nav";
import Tickets from "./components/tickets";
import SpecificTicket from "./components/specificTicket";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Tickets />} path="/tickets" />
        <Route element={<SpecificTicket />} path="/tickets/:ticketID" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </>
  );
}

export default App;
