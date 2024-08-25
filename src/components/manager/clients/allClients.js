import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ClientCard from "../../../ui/cards/clientCard";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import qnbLogo from "../../../assets/clients/qnb-logo.png";
import nbeLogo from "../../../assets/clients/nbe-logo.png";
import nbkLogo from "../../../assets/clients/nbk-logo.png";
import bmLogo from "../../../assets/clients/bm-logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import contract from "../../../assets/contracts/contract.pdf";
import axiosInstance from "../../../api/axiosInstance";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ContractRules from "../../../ui/contractRules";
import { Link as Direct } from "react-router-dom";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GreenLabel from "../../../ui/type-labels/greenLabel";
import YellowLabel from "../../../ui/type-labels/yellowLabel";
import RedLabel from "../../../ui/type-labels/redLabel";
import BlueLabel from "../../../ui/type-labels/blueLabel";
import GreyLabel from "../../../ui/type-labels/greyLabel";
import PurpleLabel from "../../../ui/type-labels/purpleLabel";
import { DataGrid } from "@mui/x-data-grid";
import { TailSpin } from "react-loader-spinner";
import AddCllientModal from "./addClientModal";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MultipleSelect from "../../../ui/components/multipleSelect";

function AllClients() {
  const [clients] = useState([
    {
      id: 1,
      name: "QNB",
      logo: qnbLogo,
      operator: "Mohamed Loly",
      rules: [
        { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
      ],
      color: "violet",
    },
    {
      id: 2,
      name: "NBE",
      logo: nbeLogo,
      operator: "Ahmed Alaa",
      rules: [
        { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
      ],
      color: "green",
    },
    {
      id: 3,
      name: "NBK",
      logo: nbkLogo,
      operator: "Islam Mohamed",
      rules: [
        { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
      ],
      color: "blue",
    },
    {
      id: 4,
      name: "Banque Misr",
      logo: bmLogo,
      operator: "Amira Ahmed",
      rules: [
        { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 2, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
        { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
      ],
      color: "red",
    },
  ]);
  const [clientTickets, setClientTickets] = useState([]);
  const [clientTroubleshooting, setClientTroubleshooting] = useState([]);
  const [currentClient, setCurrentClient] = useState(clients[0]);
  const [machines, setMachines] = useState([]);
  const [operators, setOperators] = useState([]);
  const [isManager] = useState(true);
  const [search, setSearch] = useState("");
  const [matchedMachines, setMatchedMachines] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [end, setEnd] = useState(10);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentClientRules, setCurrentClientRules] = useState(
    currentClient.rules
  );
  const [currentClientName, setCurrentClientName] = useState(
    currentClient.name
  );
  const [currentOperators, setCurrentOperators] = useState([
    currentClient.operator,
  ]);
  const ruleTextInputRef = useRef("");
  const ruleTypeInputRef = useRef("");
  const [rule, setRule] = useState({ id: 0, type: "", text: "" });

  function handleRuleType(e) {
    setRule({ ...rule, type: e.target.value });
  }

  function handleRuleText(e) {
    setRule({ ...rule, text: e.target.value });
  }

  function handleAddRule() {
    let latestID;
    if (currentClientRules.length === 0) {
      latestID = 0;
    } else {
      latestID = currentClientRules[currentClientRules.length - 1].id;
    }

    if (rule.text !== "") {
      setCurrentClientRules((prev) => [
        ...prev,
        { id: latestID + 1, type: rule.type, text: rule.text },
      ]);
    }

    // Reset rule state
  }
  const handleNewName = useCallback((event) => {
    setCurrentClientName(event.target.value.toUpperCase());
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const LazyMachineCard = lazy(() =>
    import("../../../ui/cards/machineCard.js")
  );
  const memoMachines = useMemo(
    () => (
      <div className="w-full flex flex-1 flex-row flex-wrap justify-center items-center gap-2 mt-2">
        {matchedMachines.slice(0, end).map((machine) => (
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
    [matchedMachines, end]
  );

  const clientName = useMemo(
    () => (
      <TextField
        id="serialNumber"
        key="serialNumberField"
        label="New S/N"
        value={currentClientName}
        onChange={handleNewName}
        autoFocus
      />
    ),
    [currentClientName, handleNewName]
  );

  const ticketsColumns = [
    {
      field: "id",
      headerName: "T/N",
      width: 70,
      minWidth: 60,
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
      field: "client",
      headerName: "Client",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <BusinessIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
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
          <span className="mx-auto">{params.value}</span>
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
          <span className="mx-auto">{params.value}</span>
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
    {
      field: "status",
      headerName: "Status",
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
          {params.value === "solved" ? <GreenLabel text="solved" /> : null}
          {params.value === "spare-parts" ? (
            <BlueLabel text="spare parts" />
          ) : null}
          {params.value === "scrabed" ? <RedLabel text="scarbed" /> : null}
          {params.value === "on-going" ? <GreyLabel text="assigned" /> : null}
          {params.value === "not-assigned-yet" ? (
            <PurpleLabel text="not assigned yet" />
          ) : null}
        </div>
      ),
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          {params.value !== "" && <EngineeringIcon />}{" "}
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "operator",
      headerName: "Operator",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SupervisedUserCircleOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
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
          {params.value === "low" ? <GreenLabel text="low" /> : null}
          {params.value === "medium" ? <BlueLabel text="Medium" /> : null}
          {params.value === "high" ? <RedLabel text="High" /> : null}
        </div>
      ),
    },

    ...(isManager
      ? [
          {
            field: "assigningDelay",
            headerName: "Assigning Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
          {
            field: "operatorDelay",
            headerName: "Operator Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
        ]
      : []),
  ];
  const issuesColumns = [
    {
      field: "id",
      headerName: "Issue Number",
      flex: 1,
      width: 130,
      minWidth: 100,
      renderCell: (params) => (
        <Direct
          to={`/troubleshooting/${params.value}`}
          className="w-full text-blue-500 flex items-center justify-center"
        >
          {params.value}
        </Direct>
      ),

      headerAlign: "center",
    },
    {
      field: "client",
      headerName: "Client",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <BusinessIcon />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
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
          <span className="mx-auto">{params.value}</span>
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
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },

    {
      field: "issueDate",
      headerName: "Issue Date",
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
      field: "operator",
      headerName: "Solved By",
      flex: 1,
      width: 130,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div className="flex items-center justify-start gap-2">
          <SupervisedUserCircleOutlined />
          <span className="mx-auto">{params.value}</span>
        </div>
      ),
    },

    ...(isManager
      ? [
          {
            field: "operatorDelay",
            headerName: "Operator Delay",
            flex: 1,
            width: 130,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
          },
        ]
      : []),
  ];

  useEffect(() => {
    async function fetchMachines() {
      const response = await axiosInstance.get("/machines");
      const allMachines = await response.data;
      const filteredMachines = allMachines.filter((machine) => {
        return (
          machine.client.toString().toUpperCase() ===
          currentClient.name.toUpperCase()
        );
      });
      setMachines(filteredMachines);
    }
    fetchMachines();
  }, [currentClient.name]);

  useEffect(() => {
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
  }, [machines, search]);

  useEffect(() => {
    async function fetchTickets() {
      const response = await axiosInstance.get("/tickets");
      const allTickets = response.data;
      const filteredTickets = allTickets.filter((ticket) => {
        return ticket.client.toUpperCase() === currentClient.name.toUpperCase();
      });
      setClientTickets(filteredTickets);
    }
    fetchTickets();
  }, [currentClient.name]);
  useEffect(() => {
    async function fetchTroubleshooting() {
      const response = await axiosInstance.get("/troubleshooting");
      const allIssues = response.data;
      const filteredIssues = allIssues.filter((issue) => {
        return issue.client.toUpperCase() === currentClient.name.toUpperCase();
      });
      setClientTroubleshooting(filteredIssues);
    }
    fetchTroubleshooting();
  }, [currentClient.name]);

  useEffect(() => {
    setCurrentClientRules(currentClient.rules);
    setCurrentClientName(currentClient.name);
    setCurrentOperators([currentClient.operator]);
  }, [currentClient.rules, currentClient.name, currentClient.operator]);

  function handleSeeMore() {
    setEnd((prev) => prev + 5);
  }

  function handleChangeClient(data) {
    setCurrentClient({ ...data });
    setEnd(10);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  function handleEdit() {
    setIsEdit(true);
  }

  function handleSave() {
    setIsEdit(false);
  }
  function handleRemoveRule(id) {
    setCurrentClientRules((prev) => prev.filter((rule) => rule.id !== id));
  }

  useEffect(() => {
    async function fetchOperators() {
      const response = await axiosInstance.get("/operators");
      const allOperators = await response.data;
      setOperators(allOperators);
    }
    fetchOperators();
  }, []);

  function handleChangeOperator(data) {
    setCurrentOperators(data);
  }
  return (
    <div className="w-full h-full ">
      {" "}
      <div className="w-full h-16 bg-white flex flex-row items-center justify-between p-4 border-b border-gray-400">
        <div className="flex flex-row gap-2">
          <Typography className="text-orange-600 !font-bold">
            All Clients
          </Typography>
        </div>
        <Button color="success" variant="contained" onClick={handleOpen}>
          Add new client
          <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
        </Button>
      </div>
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {clients?.map((client) => {
          return (
            <div
              onClick={() =>
                handleChangeClient({
                  id: client.id,
                  name: client.name,
                  logo: client.logo,
                  operator: client.operator,
                  rules: client.rules,
                  color: client.color,
                })
              }
              className="w-full flex items-center flex-1"
              key={client.id}
            >
              <ClientCard
                name={client.name}
                logo={client.logo}
                clientId={client.id}
                color={client.color}
              />
            </div>
          );
        })}

        {/*SEPARTOR SEPARTOR SEPARTOR SEPARTOR */}

        <div className="w-full h-full p-3 border mt-2 border-gray-300 rounded-2xl relative">
          {!isEdit ? (
            <Button
              variant="contained"
              color="warning"
              size="small"
              className="!absolute -top-3 right-2 h-6 "
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
              size="small"
              className="!absolute -top-3 right-2 h-6 "
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
          <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start relative mt-2 ">
            <Typography className="w-auto h-full opacity-60 font-normal mr-1">
              Client:{" "}
              {isEdit ? (
                <span className="font-bold opacity-100">{clientName}</span>
              ) : (
                <span className="font-bold opacity-100">
                  {currentClientName}
                </span>
              )}
            </Typography>
          </div>
          {isEdit ? (
            <MultipleSelect
              data={operators}
              required={false}
              handleChangeOperator={handleChangeOperator}
            />
          ) : (
            <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
              <Typography className="w-auto h-full opacity-60 font-normal mr-1">
                Operator:{" "}
                <span className="font-bold opacity-100">
                  {currentOperators.length > 0 &&
                    currentOperators.map((operator, index) => {
                      if (index === currentOperators.length - 1) {
                        return <span key={index}>{operator}</span>;
                      } else {
                        return <span>{operator}, </span>;
                      }
                    })}
                </span>
              </Typography>
            </div>
          )}

          {isEdit && currentClient ? (
            <div className="w-full flex flex-row flex-wrap gap-3 items-end justify-end">
              <FormControl
                fullWidth
                sx={{
                  border: "1px solid rgb(209 213 219)",
                  p: 2,
                  borderRadius: 3,
                }}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="w-full flex justify-end"
                >
                  :نوع التحذير
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="w-full flex justify-end items-end"
                  onChange={handleRuleType}
                  ref={ruleTypeInputRef}
                >
                  <FormControlLabel
                    value="warning"
                    control={<Radio color="error" />}
                    label="غير مسموح"
                  />
                  <FormControlLabel
                    value="success"
                    control={<Radio color="success" />}
                    label="مسموح"
                  />
                </RadioGroup>
                <TextField
                  id="rule"
                  label="وصف التحذير"
                  variant="outlined"
                  fullWidth
                  className="flex justify-end items-end text-right"
                  inputProps={{ style: { direction: "rtl" } }}
                  size="small"
                  sx={{ my: 2 }}
                  onChange={handleRuleText}
                  ref={ruleTextInputRef}
                />
                {rule.type === "success" ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddRule}
                  >
                    add{" "}
                    <AddCircleSharpIcon
                      sx={{ width: 18, height: 18, marginLeft: 1 }}
                    />
                  </Button>
                ) : rule.type === "warning" ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleAddRule}
                  >
                    add{" "}
                    <AddCircleSharpIcon
                      sx={{ width: 18, height: 18, marginLeft: 1 }}
                    />
                  </Button>
                ) : (
                  <Button variant="contained" color="info">
                    add{" "}
                    <AddCircleSharpIcon
                      sx={{ width: 18, height: 18, marginLeft: 1 }}
                    />
                  </Button>
                )}
              </FormControl>
              <ContractRules
                rules={currentClientRules}
                isEdit={true}
                handleRemoveRule={handleRemoveRule}
              />
            </div>
          ) : (
            <div className="w-full h-full p-2">
              <ContractRules
                rules={[...currentClientRules]}
                isEdit={false}
                handleRemoveRule={handleRemoveRule}
              />
            </div>
          )}
          <Accordion className="my-4 w-full">
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
        </div>
        {/*SEPARTOR SEPARTOR SEPARTOR SEPARTOR SEPARTOR  */}
        <div className="w-full h-full p-2 flex flex-col justify-center items-center">
          <Typography className="w-fit h-6 font-bold text-2xl rounded-2xl bg-red-700 px-3 flex justify-end items-end self-end text-end text-white">
            : الماكينات الخاصة بالعميل
          </Typography>
          <TextField
            id="search"
            label="Search"
            variant="standard"
            onChange={handleSearch}
            className="flex items-center justify-center h-full !m-0 -translate-y-2"
          />
          <div className="w-full flex flex-col flex-wrap justify-center items-center gap-1 mt-2">
            <div className="w-full flex flex-1 flex-row flex-wrap justify-around items-center gap-2 mt-2">
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
            </div>
            {end < machines.length && (
              <Button
                onClick={handleSeeMore}
                color="warning"
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
              >
                See More
                <ExpandMoreIcon />
              </Button>
            )}
          </div>
          <div className="mt-2 w-full flex flex-col justify-center items-center">
            <Typography className="w-fit h-9 flex justify-center items-center bg-red-700 px-2 rounded-2xl text-white">
              Tickets created for{" "}
              <span className="font-bold mx-1">( {currentClient.name} )</span>
            </Typography>
            <DataGrid
              sx={{
                boxShadow: 2,
              }}
              rows={clientTickets}
              columns={ticketsColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              autoWidth
              pageSizeOptions={[5, 10]}
              className="w-full mt-2"
            />
          </div>
          <div className="mt-2 w-full flex flex-col justify-center items-center">
            <Typography className="w-fit h-9 flex justify-center items-center bg-red-700 px-2 rounded-2xl text-white">
              Troubleshooting managed for{" "}
              <span className="font-bold mx-1">( {currentClient.name} )</span>
            </Typography>
            <DataGrid
              sx={{
                boxShadow: 2,
              }}
              rows={clientTroubleshooting}
              columns={issuesColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              autoWidth
              pageSizeOptions={[5, 10]}
              className="w-full mt-2"
            />
          </div>
        </div>
      </Box>
      <AddCllientModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default AllClients;
