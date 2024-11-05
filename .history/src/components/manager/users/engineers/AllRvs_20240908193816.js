import RegularVisitCard from "../../../../ui/cards/regularVisitCard";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import CreateRegularVisitModal from "./createRegularVisitModal.js";
import CreatedRegularVisits from "./createdRegularVisits";
import DoneRegularVisits from "./doneRegularVisits";

function AllRvs({ name }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("created-rvs");

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
        <div className="flex justify-center my-6">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              activeTab === "created-rvs"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => setActiveTab("created-rvs")}
          >
            Created Regular Visits
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              activeTab === "done-rvs"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/50"
            }`}
            onClick={() => {
              setActiveTab("done-rvs");
            }}
          >
            Done Regular Visits
          </button>
        </div>
        {/* edit this to be dynamic and fetch a data from data base , after creating the database :D */}
        {activeTab === "done-rvs" ? (
          <DoneRegularVisits />
        ) : (
          <CreatedRegularVisits />
        )}
      </Box>
      <CreateRegularVisitModal open={open} handleClose={handleClose} />
    </Box>
  );
}

export default AllRvs;
