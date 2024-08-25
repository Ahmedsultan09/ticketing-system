import { useEffect, useState } from "react";
import useFetchEngineers from "./useFetchEngineers";

function useFetchDoneVisits(engineerId) {
  const [doneVisits, setDoneVisits] = useState([]);
  const specificEngineer = useFetchEngineers(engineerId);
  useEffect(() => {
    setDoneVisits(specificEngineer?.history?.doneRvs);
  }, [specificEngineer]);
  return doneVisits;
}

export default useFetchDoneVisits;
