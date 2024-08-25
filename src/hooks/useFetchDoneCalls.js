import { useEffect, useState } from "react";
import useFetchEngineers from "./useFetchEngineers";

function useFetchDoneCalls(engineerId) {
  const [doneCalls, setDoneCalls] = useState([]);
  const specificEngineer = useFetchEngineers(engineerId);
  useEffect(() => {
    setDoneCalls(specificEngineer?.history?.doneCalls);
  }, [specificEngineer]);
  return doneCalls;
}

export default useFetchDoneCalls;
