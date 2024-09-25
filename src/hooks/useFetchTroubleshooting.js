import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchTroubleshooting = (arrOfIds = undefined) => {
  const [specificTroubleshooting, setSpecificTroubleshooting] = useState([]);
  const [allTroubleshooting, setAllTroubleshooting] = useState([]);

  useEffect(() => {
    if (arrOfIds === undefined) {
      async function fetchAllTroubleshooting() {
        const response = await axiosInstance.get("/troubleshooting");
        const allTroubleshooting = await response.data;
        setAllTroubleshooting(allTroubleshooting); // Update ref instead of state
      }
      fetchAllTroubleshooting();
    }
  }, [arrOfIds]);

  useEffect(() => {
    if (arrOfIds !== undefined) {
      async function fetchSpecificTroubleshooting() {
        const response = await axiosInstance.get("/troubleshooting");
        const allTroubleshooting = await response.data;
        const specificTroubleshooting = allTroubleshooting.filter((issue) =>
          arrOfIds?.includes(parseInt(issue.id))
        );
        setSpecificTroubleshooting(specificTroubleshooting);
      }
      fetchSpecificTroubleshooting();
    }
  }, [arrOfIds]);

  return arrOfIds === undefined ? allTroubleshooting : specificTroubleshooting;
};

export default useFetchTroubleshooting;
