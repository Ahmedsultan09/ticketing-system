import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EngineerInfo from "./engineerInfo";
import EngineerRegularVisit from "./engineerRegularVisit";
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
  useEffect(() => {
    console.log(specificEng); // This will log whenever specificEng changes
  }, [specificEng]);

  const handleChange = (event, newValue) => {
    setTap(newValue);
  };

  return (
    <main className="w-full min-h-screen flex flex-row relative overflow-hidden">
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "44px",
          }}
        >
          {" "}
          <Tabs
            value={tap}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "orange",
              },
              "& .MuiTab-root": {
                color: "gray",
                "&.Mui-selected": {
                  color: "orange",
                },
              },
            }}
            className="text-[8px]"
          >
            <Tab value="info" label="Information" />
            <Tab value="regular-visit" label="Regular Visit" />
          </Tabs>
        </Box>
        {tap === "info" && specificEng && (
          <EngineerInfo
            name={specificEng.name}
            email={specificEng.email}
            phone={specificEng.phone}
            address={specificEng.address}
          />
        )}
        {tap === "regular-visit" && specificEng && (
          <EngineerRegularVisit name={specificEng.name} />
        )}{" "}
      </Box>
    </main>
  );
}

export default SpecificEngineer;
