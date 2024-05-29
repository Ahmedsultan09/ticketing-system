import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/signIn";
import Dashboard from "./components/dashboard";
import SignUp from "./components/signUp";
import Nav from "./components/nav";
import Tickets from "./components/tickets/tickets";
import SpecificTicket from "./components/tickets/specificTicket";
import TicketType from "./components/tickets/ticketType";
import Users from "./components/users/user";
import AllOperators from "./components/users/operators/allOperators";
import AllEngineers from "./components/users/engineers/allEngineers";
import SpecificEngineer from "./components/users/engineers/specificEngineer";
import SpecificOperator from "./components/users/operators/specificOperator";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route exact element={<Tickets />} path="/tickets" />
        <Route exact element={<SpecificTicket />} path="/tickets/:ticketID" />
        <Route
          exact
          element={<TicketType />}
          path="/tickets/type/:ticketType"
        />
        <Route element={<Users />} path="/users/accounts" />
        <Route exact element={<AllOperators />} path="/users/operators" />
        <Route
          element={<SpecificOperator />}
          path="/users/operators/:operatorsID"
        />
        <Route exact element={<AllEngineers />} path="/users/engineers" />
        <Route element={<SpecificEngineer />} path="/users/engineers/:engID" />

        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </>
  );
}

export default App;
