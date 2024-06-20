import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import InfoLabel from "../ui/infoLabel";
import GreenLabel from "../ui/greenLabel";
import RedLabel from "../ui/redLabel";
import axios from "axios";
import { useParams } from "react-router-dom";
import ContractRules from "../ui/contractRules";

function SpecificMachine() {
  const [specificMachine, setSpecificMachine] = useState(null);
  const params = useParams();
  const serialNumber = params.serialNumber;
  useEffect(() => {
    async function fetchSpecificMachine() {
      const response = await axios.get("http://localhost:3000/machines");
      const allMachines = response.data;
      const specificMachine = allMachines.find((machine) => {
        return (
          machine.serialNumber.toString().toUpperCase() ===
          serialNumber.toUpperCase()
        );
      });
      setSpecificMachine(specificMachine);
    }
    fetchSpecificMachine();
  }, [serialNumber]);

  console.log(specificMachine);

  const rules = [
    { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
  ];
  return (
    <div className="px-4">
      {" "}
      <ContractRules rules={rules} />{" "}
      <Grid container spacing={2} alignItems="stretch">
        <InfoLabel title="Client" details={specificMachine?.client} xs={4} />
        <InfoLabel title="Branch" details={specificMachine?.branch} />
        <InfoLabel
          title="Serial Number"
          details={specificMachine?.serialNumber}
          xs={4}
        />
        {/* edit this */}
        <InfoLabel
          title="Machine brand"
          details={specificMachine?.machineBrand}
        />
        <InfoLabel
          title="Machine model"
          details={specificMachine?.machineModel}
        />
        <InfoLabel title="Area" details={specificMachine?.area} />
        <InfoLabel
          title="Last visited Engnieer"
          details={specificMachine?.lastVisitEng}
        />
        <InfoLabel
          title="Last visit date"
          details={specificMachine?.lastVisitDate}
        />
        {/* Edit visibaility here based on ticket type */}
        <InfoLabel
          title="Ownership"
          details={
            specificMachine?.ownership === "property" ? (
              <GreenLabel text="property" />
            ) : (
              <RedLabel text="non-ownership" />
            )
          }
        />
        <InfoLabel
          title="Latest meter reading"
          details={specificMachine?.meterReading}
        />

        {/* Edit visibaility here based on ticket type */}
      </Grid>
    </div>
  );
}

export default SpecificMachine;
