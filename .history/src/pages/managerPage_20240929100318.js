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
import SpecificTroubleshooting from "../components/operator/troubleshooting/specificTroubleshooting";
import AllClients from "../components/manager/clients/allClients";
import TroubleShooting from "src/components/manager/troubleshooting/allTroubleshooting";
import AllRvs from "src/components/manager/users/engineers/AllRvs";
import SpecificClient from "src/components/manager/clients/specificClient";
import SpecificGov from "src/components/manager/clients/specificGov";
import SpecificArea from "src/components/manager/clients/specificArea";
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
        <Route element={<TroubleShooting />} path="/troubleshooting" />
        <Route
          element={<SpecificTroubleshooting />}
          path="/troubleshooting/:issueID"
        />
        <Route element={<Users />} path="/users/accounts" />
        <Route element={<AllRvs />} path="/regular-visits" />
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
        <Route element={<SpecificClient />} path="/client/:clientID" />
        <Route element={<SpecificGov />} path="/client/:clientID/gov/:govID" />
        <Route
          element={<SpecificArea />}
          path="/client/:clientID/gov/:govID/area/:areaID"
        />
      </Routes>
    </>
  );
}

export default ManagerPage;
