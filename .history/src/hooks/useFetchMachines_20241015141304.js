import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchMachines = (serialNumber = undefined) => {
  const [allMachines, setAllMachines] = useState([]);

  useEffect(() => {
    async function fetchAllEngineers() {
      const response = await axiosInstance.get("/machines");
      const allMachines = await response.data;

      if (serialNumber !== undefined) {
        const filteredMachines = allMachines.filter(
          (machine) =>
            machine.serialNumber.toString().toUpperCase() ===
            serialNumber.toString().toUpperCase()
        );
        setAllMachines(filteredMachines);
      } else {
        setAllMachines(allMachines);
      }
    }
    fetchAllEngineers();
  }, [serialNumber]);

  return allMachines;
};

export default useFetchMachines;
