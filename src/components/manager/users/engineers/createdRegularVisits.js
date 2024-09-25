import RegularVisitCard from "../../../../ui/cards/regularVisitCard";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CreateRegularVisitModal from "./createRegularVisitModal.js";

function CreatedRegularVisits({ name }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        {/* edit this to be dynamic and fetch a data from data base , after creating the database :D */}
        <RegularVisitCard
          client="بنك مصر"
          branch="اول مكرم عبيد"
          startDate={new Date().toDateString()}
          period="3 Months"
        />
      </Box>
    </Box>
  );
}

export default CreatedRegularVisits;
