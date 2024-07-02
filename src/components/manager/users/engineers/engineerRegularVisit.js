import RegularVisitCard from "../../../../ui/cards/regularVisitCard";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CreateRegularVisitModal from "./createRegularVisitModal.js";

function EngineerRegularVisit({ name }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <div className="w-full lg:h-16 h-24 bg-white flex lg:flex-row flex-col items-center justify-between gap-2 p-4 border-b border-gray-400">
          <div className="flex flex-row gap-2">
            <Typography className="text-orange-600 !font-bold border-r border-gray-400 pr-3 ">
              Manage regular visit
            </Typography>
            <Typography
              component="span"
              className=" ml-1 text-black opacity-70"
            >
              {name}
            </Typography>
          </div>
          <Button
            color="success"
            variant="contained"
            onClick={handleOpen}
            className="h-9 "
          >
            Create regular visit{" "}
            <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
          </Button>
        </div>
      </Box>

      <Box sx={{ width: "100%" }}>
        {/* edit this to be dynamic and fetch a data from data base , after creating the database :D */}
        <RegularVisitCard
          client="بنك مصر"
          branch="اول مكرم عبيد"
          startDate={new Date().toDateString()}
          period="3 Months"
        />
      </Box>
      <CreateRegularVisitModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default EngineerRegularVisit;
