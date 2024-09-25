import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InfoLabel from "../../../ui/components/infoLabel";
import GreenLabel from "../../../ui/type-labels/greenLabel";
import RedLabel from "../../../ui/type-labels/redLabel";
import axiosInstance from "../../../api/axiosInstance";
import { useParams } from "react-router-dom";
import ContractRules from "../../../ui/contractRules";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../index.css";
import contract from "../../../assets/contracts/contract.pdf";
import { DataGrid } from "@mui/x-data-grid";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Link as Direct } from "react-router-dom";
import YellowLabel from "../../../ui/type-labels/yellowLabel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ListIcon from "@mui/icons-material/List";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
function SpecificMachine() {
  const params = useParams();
  const serialNumber = params.serialNumber;
  const [specificMachine, setSpecificMachine] = useState(null);
  const [rows, setRows] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [client, setClient] = useState("");
  const [changeClient, setChangeClient] = useState(false);
  const [area, setArea] = useState("");
  const [changeArea, setChangeArea] = useState(false);
  const [branch, setBranch] = useState("");
  const [brand, setBrand] = useState("");
  const [changeBrand, setChangeBrand] = useState(false);
  const [changeSerial, setChangeSerial] = useState(false);
  const [newSerialNumber, setNewSerialNumber] = useState(serialNumber);
  const [changeModel, setChangeModel] = useState(false);
  const [machineModel, setMachineModel] = useState(
    specificMachine?.machineModel
  );
  const [ownership, setOwnership] = useState("");
  const [changeOwnership, setChangeOwnership] = useState(false);
  const [changeBranch, setChangeBranch] = useState(false);
  const [meterReading, setMeterReading] = useState("");
  const [changeMeterReading, setChangeMeterReading] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "Ticket Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Direct
          to={`/tickets/${params.value}`}
          className="w-full text-blue-500 flex items-center justify-center"
        >
          {params.value}
        </Direct>
      ),
      headerAlign: "center",
    },
    {
      field: "branch",
      headerName: "Branch",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <LocationOnOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "machineModel",
      headerName: "Machine Model",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <PrintOutlinedIcon />
          <span className="mx-auto">{specificMachine.machineModel}</span>
        </div>
      ),
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SubtitlesOutlinedIcon />
          <span className="mx-auto">
            {serialNumber.toString().toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      field: "ticketDate",
      headerName: "Ticket Date",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <CalendarMonthOutlinedIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "ticketType",
      headerName: "Ticket Type",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {params.value === "open" ? <GreenLabel text="open" /> : null}
          {params.value === "pending" ? <YellowLabel text="pending" /> : null}
          {params.value === "closed" ? <RedLabel text="closed" /> : null}
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function fetchSpecificMachine() {
      const response = await axiosInstance.get("/machines");
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

  // edit this to show tickets opened on the same machine serial number not all tickets
  useEffect(() => {
    async function fetchAllTickets() {
      const response = await axiosInstance.get("http://localhost:3000/tickets");
      const allTickets = response.data;
      setTickets(allTickets.splice(0, 4));
    }
    fetchAllTickets();
  }, []);

  // edit this too
  useEffect(() => {
    if (tickets.length > 0) {
      const rows = tickets.map((ticket) => ({
        id: ticket.id,
        branch: ticket.branch,
        machineModel: ticket.machineModel,
        serialNumber: ticket.serialNumber,
        ticketDate: ticket.ticketDate,
        ticketType: ticket.ticketType,
      }));
      setRows(rows);
    }
  }, [tickets]);

  useEffect(() => {
    if (!isEdit) {
      setChangeOwnership(false);
      setChangeBranch(false);
      setChangeBrand(false);
      setChangeClient(false);
      setChangeArea(false);
    }
  }, [isEdit]);

  useEffect(() => {
    if (changeSerial) {
      setChangeModel(false);
      setChangeMeterReading(false);
    }
  }, [changeSerial]);
  useEffect(() => {
    if (changeModel) {
      setChangeSerial(false);
      setChangeMeterReading(false);
    }
  }, [changeModel]);
  useEffect(() => {
    if (changeMeterReading) {
      setChangeSerial(false);
      setChangeModel(false);
    }
  }, [changeMeterReading]);

  function handleEdit() {
    setIsEdit(true);
  }
  function handleSave() {
    setIsEdit(false);
    setChangeSerial(false);
    setChangeModel(false);
    setChangeMeterReading(false);
  }
  function handleClient(e) {
    setClient(e.target.value);
    setChangeClient(false);
  }

  function handleChangeClient() {
    setChangeClient(true);
  }

  function handleArea(e) {
    setArea(e.target.value);
    setChangeArea(false);
  }

  function handleChangeArea() {
    setChangeArea(true);
  }

  function handleBranch(e) {
    setBranch(e.target.value);
    setChangeBranch(false);
  }

  function handleChangeBranch() {
    setChangeBranch(true);
  }
  const handleNewSerial = useCallback((event) => {
    setNewSerialNumber(event.target.value.toUpperCase());
  }, []);

  const handleChangeSerial = useCallback(() => {
    setChangeSerial(true);
  }, []);

  const handleMachineModel = useCallback((event) => {
    setMachineModel(event.target.value);
  }, []);

  const handleChangeModel = useCallback(() => {
    setChangeModel(true);
  }, []);
  const handleMeterReading = useCallback((event) => {
    setMeterReading(event.target.value);
  }, []);

  const handleChangeMeterReading = useCallback(() => {
    setChangeMeterReading(true);
  }, []);

  function handleBrand(e) {
    setBrand(e.target.value);
    setChangeBrand(false);
  }

  function handleChangeBrand() {
    setChangeBrand(true);
  }

  function handleOwnership(e) {
    setOwnership(e.target.value);
    setChangeOwnership(false);
  }

  function handleChangeOwnership() {
    setChangeOwnership(true);
  }

  const serialNumberDetails = useMemo(
    () =>
      newSerialNumber.toString().toUpperCase() ||
      specificMachine?.serialNumber.toString().toUpperCase(),
    [newSerialNumber, specificMachine]
  );
  const modelDetails = useMemo(
    () => machineModel || specificMachine?.machineModel,
    [machineModel, specificMachine]
  );
  const meterReadingDetails = useMemo(
    () => meterReading || specificMachine?.meterReading,
    [meterReading, specificMachine]
  );

  const serialNumberTextField = useMemo(
    () => (
      <TextField
        id="serialNumber"
        key="serialNumberField"
        label="New S/N"
        value={newSerialNumber}
        onChange={handleNewSerial}
        autoFocus
      />
    ),
    [newSerialNumber, handleNewSerial]
  );
  const modelTextField = useMemo(
    () => (
      <TextField
        id="model"
        key="machineModelField"
        label="Model"
        value={machineModel}
        onChange={handleMachineModel}
        autoFocus
      />
    ),
    [machineModel, handleMachineModel]
  );
  const meterReadingTextField = useMemo(
    () => (
      <TextField
        id="meter-reading"
        key="meterReadingField"
        label="Meter Reading"
        value={meterReading}
        onChange={handleMeterReading}
        autoFocus
      />
    ),
    [meterReading, handleMeterReading]
  );

  const rules = [
    { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
  ];
  return (
    <div className="px-4">
      {" "}
      <ContractRules rules={rules} />{" "}
      <Accordion className="my-4">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="rtl-text"
        >
          عرض تفاصيل العقد
        </AccordionSummary>
        <AccordionDetails>
          <object data={contract} width="100%" height="500">
            View Contract
          </object>
        </AccordionDetails>
      </Accordion>
      <Grid
        container
        spacing={1}
        alignItems="stretch"
        className="border border-gray-300 rounded-xl !my-6 py-2 pt-4 relative"
      >
        {!isEdit ? (
          <Button
            variant="contained"
            color="warning"
            className="!absolute -top-3 right-2 h-6 "
            size="small"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        ) : (
          // handle save button here to manage post request and render the new status
          <Button
            variant="contained"
            color="success"
            className="!absolute -top-3 right-2 h-6 "
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        )}
        {isEdit && !changeClient ? (
          <InfoLabel
            title="Client"
            details={client ? client.toUpperCase() : specificMachine?.client}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeClient}
              >
                <ChangeCircleIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeClient ? (
          <InfoLabel
            title="Client"
            details={client ? client.toUpperCase() : specificMachine?.client}
            xs={4}
          />
        ) : (
          changeClient && (
            <InfoLabel
              title="Choose client"
              details={
                <FormControl fullWidth size="small">
                  <InputLabel id="client">Client</InputLabel>
                  <Select
                    labelId="client"
                    id="client"
                    value={client}
                    label="Client"
                    onChange={handleClient}
                    required
                  >
                    <MenuItem value="qnb">QNB</MenuItem>
                    <MenuItem value="cib">CIB</MenuItem>
                    <MenuItem value="nbk">NBK</MenuItem>
                    <MenuItem value="fab">FAB</MenuItem>
                  </Select>
                </FormControl>
              }
            />
          )
        )}

        {isEdit && !changeArea ? (
          <InfoLabel
            title="Area"
            details={area ? area : specificMachine?.area}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeArea}
              >
                <ListIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeArea ? (
          <InfoLabel
            title="Area"
            details={area ? area : specificMachine?.area}
          />
        ) : (
          changeArea && (
            <InfoLabel
              title={"Choose Area"}
              details={
                <FormControl fullWidth size="small">
                  <InputLabel id="area">Area</InputLabel>
                  <Select
                    labelId="Area"
                    id="area"
                    value={area}
                    label="Area"
                    onChange={handleArea}
                    required
                  >
                    <MenuItem value={"القاهرة"}>القاهرة</MenuItem>
                    <MenuItem value={"الاسكندرية"}>الاسكندرية</MenuItem>
                    <MenuItem value={"السويس"}>السويس</MenuItem>
                  </Select>
                </FormControl>
              }
            />
          )
        )}

        {isEdit && !changeBranch ? (
          <InfoLabel
            title="Branch"
            details={branch ? branch : specificMachine?.branch}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeBranch}
              >
                <ListIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeBranch ? (
          <InfoLabel
            title="Branch"
            details={branch ? branch : specificMachine?.branch}
            xs={4}
          />
        ) : (
          changeBranch && (
            <InfoLabel
              title="Choose branch"
              details={
                <FormControl fullWidth size="small">
                  <InputLabel id="branch">Branch</InputLabel>
                  <Select
                    labelId="branch"
                    id="branch"
                    value={branch}
                    label="Branch"
                    onChange={handleBranch}
                    required
                  >
                    <MenuItem value="هليوبوليس">هليوبوليس - 452 </MenuItem>
                    <MenuItem value="وسط البلد">وسط البلد - 302 </MenuItem>
                    <MenuItem value="اول مكرم">اول مكرم عبيد - 101 </MenuItem>
                  </Select>
                </FormControl>
              }
            />
          )
        )}

        {isEdit && !changeSerial ? (
          <InfoLabel
            title="Serial Number"
            details={serialNumberDetails}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeSerial}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeSerial ? (
          <InfoLabel
            title="Serial Number"
            details={serialNumberDetails}
            xs={4}
          />
        ) : (
          changeSerial && <InfoLabel details={serialNumberTextField} />
        )}

        {isEdit && !changeBrand ? (
          <InfoLabel
            title="Brand"
            details={brand ? brand : specificMachine?.machineBrand}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeBrand}
              >
                <ListIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeBrand ? (
          <InfoLabel
            title="Brand"
            details={brand ? brand : specificMachine?.machineBrand}
            xs={4}
          />
        ) : (
          changeBrand && (
            <InfoLabel
              title="Choose Brand"
              details={
                <FormControl fullWidth size="small">
                  <InputLabel id="brand">Brand</InputLabel>
                  <Select
                    labelId="brand"
                    id="brand"
                    value={brand}
                    label="Brand"
                    onChange={handleBrand}
                    required
                  >
                    <MenuItem value="HP">HP</MenuItem>
                    <MenuItem value="Samsung">Samsung</MenuItem>
                    <MenuItem value="Xerox">Xerox</MenuItem>
                  </Select>
                </FormControl>
              }
            />
          )
        )}
        {isEdit && !changeModel ? (
          <InfoLabel
            title="Model"
            details={modelDetails}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeModel}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeModel ? (
          <InfoLabel title="Model" details={modelDetails} xs={4} />
        ) : (
          changeModel && <InfoLabel details={modelTextField} />
        )}

        <InfoLabel
          title="Last visited Engnieer"
          details={specificMachine?.lastVisitEng}
        />
        <InfoLabel
          title="Last visit date"
          details={specificMachine?.lastVisitDate}
        />

        {isEdit && !changeOwnership ? (
          <InfoLabel
            title="Ownership"
            details={
              ownership.length > 0 ? (
                ownership === "property" ? (
                  <GreenLabel text="property" />
                ) : (
                  ownership === "non-ownership" && (
                    <RedLabel text="non-ownership" />
                  )
                )
              ) : specificMachine?.ownership === "property" ? (
                <GreenLabel text="property" />
              ) : (
                <RedLabel text="non-ownership" />
              )
            }
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeOwnership}
              >
                <ListIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeOwnership ? (
          <InfoLabel
            title="Ownership"
            details={
              ownership.length > 0 ? (
                ownership === "property" ? (
                  <GreenLabel text="property" />
                ) : (
                  ownership === "non-ownership" && (
                    <RedLabel text="non-ownership" />
                  )
                )
              ) : specificMachine?.ownership === "property" ? (
                <GreenLabel text="property" />
              ) : (
                <RedLabel text="non-ownership" />
              )
            }
          />
        ) : (
          changeOwnership && (
            <InfoLabel
              title="Choose ownership"
              details={
                <FormControl fullWidth size="small">
                  <InputLabel id="ownership">Ownership</InputLabel>
                  <Select
                    labelId="ownership"
                    id="ownership"
                    value={ownership}
                    label="Ownership"
                    onChange={handleOwnership}
                    required
                  >
                    <MenuItem value="property">
                      {" "}
                      <GreenLabel text="property" />
                    </MenuItem>
                    <MenuItem value="non-ownership">
                      {" "}
                      <RedLabel text="non-ownership" />
                    </MenuItem>
                  </Select>
                </FormControl>
              }
            />
          )
        )}

        {isEdit && !changeMeterReading ? (
          <InfoLabel
            title="Meter reading"
            details={meterReadingDetails}
            xs={4}
            icon={
              <IconButton
                color="warning"
                variant="contained"
                className="!rounded-full !bg-blue-400 !text-white"
                size="small"
                onClick={handleChangeMeterReading}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            }
          />
        ) : !isEdit && !changeMeterReading ? (
          <InfoLabel
            title="Meter reading"
            details={meterReadingDetails}
            xs={4}
          />
        ) : (
          changeMeterReading && <InfoLabel details={meterReadingTextField} />
        )}
      </Grid>
      <div className="w-full h-12 flex items-center justify-center mt-3 border border-gray-300 rounded-t-xl">
        <Typography className="w-fit bg-blue-700 text-white rounded-xl px-4 ">
          Machine History
        </Typography>
      </div>
      <DataGrid
        sx={{
          boxShadow: 2,
          mb: 3,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={(row) => row.id}
        autoHeight
        autoWidth
      />
    </div>
  );
}

export default SpecificMachine;
