import { useEffect, useState } from "react";
import useFetchEngineers from "./useFetchEngineers";

function useFetchRegularVisits(id) {
  const [regularVisits, setRegularVisits] = useState([]);
  const allEngineers = useFetchEngineers();

  useEffect(() => {
    if (allEngineers.length > 0) {
      const specificEngDetails = allEngineers.find((engineer) => {
        return parseInt(engineer?.id) === parseInt(id);
      });
      setRegularVisits(specificEngDetails?.regularVisits || []);
    }
  }, [id, allEngineers]);
  return regularVisits;
}

export default useFetchRegularVisits;
