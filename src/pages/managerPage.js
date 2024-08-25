import { Route, Routes } from "react-router-dom";
import "../App.css";
import Dashboard from "../components/manager/dashboard/dashboard";
import Nav from "../layout/navigation/nav";
import Tickets from "../components/manager/tickets/allTickets";
import SpecificTicket from "../components/manager/tickets/specificTicket";
import TicketType from "../components/manager/tickets/ticketType";
import Users from "../components/manager/users/user";
import AllOperators from "../components/manager/users/operators/allOperators";
import AllEngineers from "../components/manager/users/engineers/allEngineers";
import SpecificEngineer from "../components/manager/users/engineers/specificEngineer";
import SpecificOperator from "../components/manager/users/operators/specificOperator";
import AllMachines from "../components/manager/machines/allMachines";
import SpecificMachine from "../components/manager/machines/specificMachine";
import AllTroubleshooting from "../components/manager/troubleshooting/allTroubleshooting";
import SpecificTroubleshooting from "../components/manager/troubleshooting/specificTroubleshooting";
import AllClients from "../components/manager/clients/allClients";
function ManagerPage() {
  return (
    <>
      {" "}
      <Nav />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Tickets />} path="/tickets" />
        <Route element={<SpecificTicket />} path="/tickets/:ticketID" />
        <Route element={<TicketType />} path="/tickets/type/:ticketType" />
        <Route element={<AllTroubleshooting />} path="/troubleshooting" />
        <Route
          element={<SpecificTroubleshooting />}
          path="/troubleshooting/:issueID"
        />
        <Route element={<Users />} path="/users/accounts" />
        <Route element={<AllOperators />} path="/users/operators" />
        <Route
          element={<SpecificOperator />}
          path="/users/operators/:operatorsID"
        />
        <Route element={<AllEngineers />} path="/users/engineers" />
        <Route element={<SpecificEngineer />} path="/users/engineers/:engID" />

        <Route element={<AllMachines />} path="/machines" />
        <Route element={<SpecificMachine />} path="/machines/:serialNumber" />

        <Route element={<AllClients />} path="/clients" />
      </Routes>
    </>
  );
}

export default ManagerPage;
