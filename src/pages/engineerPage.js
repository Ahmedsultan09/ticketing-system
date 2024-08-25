import { Route, Routes } from "react-router-dom";
import EngineerNav from "../layout/navigation/engineerNav";
import AllCalls from "src/components/engineer/calls/allCalls";
import History from "src/components/engineer/history/history";
import SpecificCall from "src/components/engineer/calls/specificCall";
import SpecificRv from "../components/engineer/regular-visit/specificRv";
import AllRvs from "../components/engineer/regular-visit/allRvs";

function EngineerPage() {
  const engineerId = 4;

  return (
    <>
      <EngineerNav id={engineerId} />
      <Routes>
        <Route element={<AllCalls id={engineerId} />} path="/" />
        <Route element={<SpecificCall />} path="/calls/:callID" />
        <Route element={<AllRvs />} path="/regular-visits" />
        <Route element={<SpecificRv />} path="/regular-visits/:visitID" />
        <Route element={<History id={engineerId} />} path="/history" />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default EngineerPage;
