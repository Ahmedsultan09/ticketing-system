import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchEngineers = (id = undefined) => {
  const [allEngineers, setAllEngineers] = useState([]);

  useEffect(() => {
    async function fetchAllEngineers() {
      const response = await axiosInstance.get("/engineers");
      const allEngineersData = await response.data;

      if (id !== undefined) {
        setAllEngineers(allEngineersData[parseInt(id) - 1]);
      } else {
        setAllEngineers(allEngineersData);
      }
    }
    fetchAllEngineers();
  }, [id]);

  return allEngineers;
};

export default useFetchEngineers;
