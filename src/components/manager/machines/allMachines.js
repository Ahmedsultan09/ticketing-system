import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import AddMachineModal from "./addMachineModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosInstance from "../../../api/axiosInstance";
import { TailSpin } from "react-loader-spinner";

function AllMachines() {
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [machines, setMachines] = useState([]);
  const [matchedMachines, setMatchedMachines] = useState([]);
  const [search, setSearch] = useState("");
  const [client, setClient] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchByModel, setSearchByModel] = useState(false);

  const LazyMachineCard = lazy(() =>
    import("../../../ui/cards/machineCard.js")
  );
  const memoMachines = useMemo(
    () => (
      <div className="w-full flex flex-1 flex-row flex-wrap justify-center items-center gap-2 mt-2">
        {matchedMachines.map((machine) => (
          <LazyMachineCard
            key={machine.id}
            serialNumber={machine.serialNumber}
            qrCode={machine.qrCode}
            client={machine.client}
            branch={machine.branch}
            model={machine.machineModel}
            area={machine.area}
            property={machine.ownership === "property"}
          />
        ))}
      </div>
    ),
    [matchedMachines]
  );
  useEffect(() => {
    async function fetchAllMachines() {
      try {
        const response = await axiosInstance.get("/machines");
        const allMachines = response.data;
        if (client === 0) {
          setMachines(allMachines);
        } else {
          const clientMachines = allMachines.filter((machine) => {
            return machine.client
              .toString()
              .toLowerCase()
              .includes(client.toLowerCase());
          });
          setMachines(clientMachines);
        }
        setMatchedMachines(allMachines);
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      }
    }
    fetchAllMachines();
  }, [client]);

  useEffect(() => {
    if (!searchByModel) {
      const filteredMachines = machines.filter((machine) => {
        return machine.serialNumber
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setMatchedMachines(filteredMachines);
      if (filteredMachines.length === 0 && search !== "") {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    } else {
      const filteredMachines = machines.filter((machine) => {
        return machine.machineModel
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase());
      });
      setMatchedMachines(filteredMachines);
      if (filteredMachines.length === 0 && search !== "") {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    }
  }, [machines, search, searchByModel]);

  const handleOpenAddMachine = () => {
    setOpenCreateUser(true);
  };
  const handleCloseAddMachine = () => {
    setOpenCreateUser(false);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClient = (event) => {
    setClient(event.target.value);
  };

  const handleSearchBy = (e) => {
    setSearchByModel((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full h-16 bg-white flex flex-row items-center justify-between p-4 border-b border-gray-400">
        <div className="flex flex-row gap-2">
          <Typography className="text-orange-600 !font-bold border-r border-gray-400 pr-3">
            All Machines
          </Typography>
          <Typography component="span" className=" ml-1 text-black opacity-70">
            {machines.length}
          </Typography>
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={handleOpenAddMachine}
        >
          Add new machine
          <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
        </Button>
      </div>

      <div className="w-full flex flex-col lg:flex-row justify-between px-4 py-2 items-center !mt-0">
        <FormControl
          sx={{ minWidth: 120, fontSize: "10px" }}
          size="small"
          className="!text-sm"
        >
          <InputLabel id="demo-select-small-label" className="!text-xs">
            Machines
          </InputLabel>
          <Select
            labelId="selected-machines"
            id="selected-machines"
            value={client}
            label="Client"
            onChange={handleClient}
            className="!text-xs"
          >
            <MenuItem value={0} className="!text-xs">
              <em>All Machines</em>
            </MenuItem>
            <MenuItem value="QNB" className="!text-xs">
              QNB
            </MenuItem>
            <MenuItem value="BDC" className="!text-xs">
              BDC
            </MenuItem>
            <MenuItem value="Alex Bank" className="!text-xs">
              Alex Bank
            </MenuItem>
          </Select>
        </FormControl>
        <div className="w-fit flex flex-col justify-center lg:flex-row">
          {" "}
          <FormControlLabel
            control={<Checkbox />}
            label="Search by model"
            onChange={handleSearchBy}
            value={searchByModel}
          />
          <TextField
            id="search"
            label="Search"
            variant="standard"
            onChange={handleSearch}
            className="flex items-center justify-center h-full !m-0 -translate-y-2"
          />
        </div>
      </div>
      {!isEmpty ? (
        <Suspense
          fallback={
            <div className="absolute top-1/2 left-1/2">
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="orange"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          }
        >
          {memoMachines}
        </Suspense>
      ) : (
        <div className="w-full h-[70vh] flex justify-center items-center">
          There is no machine matching this serial
        </div>
      )}

      <AddMachineModal
        open={openCreateUser}
        handleOpen={handleOpenAddMachine}
        handleClose={handleCloseAddMachine}
      />
    </div>
  );
}

export default AllMachines;
