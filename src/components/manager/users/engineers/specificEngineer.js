import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EngineerInfo from "./engineerInfo";
import EngineerRegularVisit from "./doneRegularVisits";
import axiosInstance from "../../../../api/axiosInstance";

function SpecificEngineer() {
  const [tap, setTap] = useState("info");
  const [specificEng, setSpecificEng] = useState(null);

  const params = useParams();
  const engID = params.engID;

  useEffect(() => {
    async function fetchSepecificEng() {
      const response = await axiosInstance.get("/engineers");
      const allEngineers = response.data;
      if (allEngineers) {
        const specificEngineer = allEngineers.find(
          (eng) => parseInt(eng?.id) === parseInt(engID)
        );
        setSpecificEng(specificEngineer);
      }
    }
    fetchSepecificEng();
  }, [engID]);

  const handleChange = (event, newValue) => {
    setTap(newValue);
  };

  return (
    <main className="w-full min-h-screen flex flex-row relative overflow-hidden">
      <Box sx={{ width: "100%" }}>
        <EngineerInfo
          name={specificEng?.name}
          userName={specificEng?.username}
          phone={specificEng?.phone}
          address={specificEng?.address}
        />
      </Box>
    </main>
  );
}

export default SpecificEngineer;
