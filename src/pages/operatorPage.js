import { Route, Routes } from "react-router-dom";
import "../App.css";
import OperatorTickets from "../components/operator/tickets/operatorTickets";
import SpecificTicket from "../components/operator/tickets//specificTicket";
import AllMachines from "../components/operator/machines/allMachines";
import SpecificMachine from "../components/operator/machines/specificMachine";
import SpecificTroubleshooting from "../components/operator/troubleshooting/specificTroubleshooting";
import OperatorNav from "src/layout/navigation/operatorNav";
import EngineerRegularVisit from "src/components/manager/users/engineers/doneRegularVisits";
import OperatorTroubleshooting from "../components/operator/troubleshooting/operatorTroubleshooting";
function OperatorPage({ id }) {
  return (
    <>
      {" "}
      <OperatorNav />
      <Routes>
        <Route element={<OperatorTickets operatorId={id} />} path="/" />
        <Route element={<OperatorTickets operatorId={id} />} path="/tickets" />
        <Route element={<SpecificTicket />} path="/tickets/:ticketID" />
        <Route
          element={<OperatorTroubleshooting operatorId={id} />}
          path="/troubleshooting"
        />
        <Route
          element={<SpecificTroubleshooting />}
          path="/troubleshooting/:issueID"
        />
        <Route element={<AllMachines id={id} />} path="/machines" />
        <Route element={<SpecificMachine />} path="/machines/:serialNumber" />
        <Route element={<EngineerRegularVisit />} path="/regular-visit" />
      </Routes>
    </>
  );
}

export default OperatorPage;
