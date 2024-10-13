import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Button as BlackButton } from "src/ui/components/button";
import MultipleSelect from "../../../ui/components/multipleSelect";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import ContractRules from "../../../ui/contractRules";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axiosInstance from "../../../api/axiosInstance";
import useFetchClients from "src/hooks/useFetchClients";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 3,
};

export default function AddClientModal({
  handleClose,
  open,
  handleClientChange,
}) {
  const [operators, setOperators] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const ruleTextInputRef = useRef("");
  const ruleTypeInputRef = useRef("");
  const [rule, setRule] = useState({ id: 0, type: "", text: "" });
  const [clientName, setclientName] = useState("");
  const [isRvAllowed, setIsRvAllowed] = useState(false);
  const [period, setPeriod] = useState("quarterly");
  const [dateValue, setDateValue] = useState(dayjs(new Date()));

  const clients = useFetchClients();
  function handleRemoveRule(id) {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  }

  function handleRuleType(e) {
    setRule({ ...rule, type: e.target.value });
  }

  function handleRuleText(e) {
    setRule({ ...rule, text: e.target.value });
  }

  function handleChangeOperator(data) {
    setSelectedOperators(data);
  }

  function handleClientName(e) {
    setclientName(e.target.value);
  }

  function handleAddRule() {
    let latestID;
    if (rules.length === 0) {
      latestID = 0;
    } else {
      latestID = rules[rules.length - 1].id;
    }

    if (rule.text !== "") {
      setRules((prev) => [
        ...prev,
        { id: latestID + 1, type: rule.type, text: rule.text },
      ]);
    }

    // Reset rule state
  }

  function handlePeriod(e) {
    setPeriod(e.target.value);
  }

  function handleCreateClient() {
    axiosInstance
      .post("/clients", {
        clientName: clientName,
        rules: rules,
        operators: selectedOperators,
        isRvAllowed: isRvAllowed,
        areas: [],
      })
      .then((res) => handleClientChange(res.data));
    handleClose();
  }

  useEffect(() => {
    async function fetchOperators() {
      const response = await axiosInstance.get("/operators");
      const allOperators = response.data;
      setOperators(allOperators);
    }
    fetchOperators();
  }, []);

  function handleIsRegularVisit(e) {
    if (e.target.value === "true") {
      setIsRvAllowed(true);
    } else {
      setIsRvAllowed(false);
    }
  }

  useEffect(() => {
    console.log(isRvAllowed);
  }, [isRvAllowed]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "80%",
            maxWidth: 800,
            minHeight: 350,
            maxHeight: "80vh",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            overflow: "auto",
          }}
          className="scrollbar-hide"
        >
          <div className="w-full flex flex-row flex-wrap gap-3 items-end justify-end">
            <TextField
              id="client-name"
              label="Client Name"
              size="small"
              onChange={handleClientName}
              fullWidth
              required
            />
            <MultipleSelect
              data={operators}
              required={true}
              handleChangeOperator={handleChangeOperator}
            />
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
              rules={rules}
              isEdit={true}
              handleRemoveRule={handleRemoveRule}
            />
          </div>
          <Divider />
          <div
            className="w-full h-full my-3 border border-gray-400 rounded-lg  px-4"
            dir="rtl"
          >
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <label className="w-full ">
                هل تريد تفعيل الزيارات الدورية لهذا العميل؟
              </label>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={isRvAllowed}
                onChange={handleIsRegularVisit}
                sx={{ width: "50%", display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="نعم"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="لا"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {isRvAllowed && (
            <div
              className="w-full h-full mb-3 border border-gray-400 rounded-lg  px-4 py-2"
              dir="rtl"
            >
              {" "}
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <label className="w-full ">نوع الزيارة الدورية : </label>
                </div>
                <InputLabel id="demo-simple-select-label">النوع</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={period}
                  label="النوع"
                  onChange={handlePeriod}
                  size="small"
                >
                  <MenuItem value="quarterly">ربع سنوى</MenuItem>
                  <MenuItem value="semi-annually">نصف سنوى</MenuItem>
                  <MenuItem value="annually">سنوي</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {isRvAllowed && (
            <div className="h-full flex flex-row flex-wrap justify-between w-full gap-3 border border-gray-400 p-2 rounded-lg">
              {" "}
              {period === "annually" && (
                <>
                  <div className="w-full flex flex-row gap-2">
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      A
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </>
              )}
              {period === "semi-annually" && (
                <>
                  <div className="w-full flex flex-row gap-2">
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      P1
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full flex flex-row gap-2">
                    {" "}
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      P2
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </>
              )}
              {period === "quarterly" && (
                <>
                  <div className="w-full flex flex-row gap-2">
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      Q1
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full flex flex-row gap-2">
                    {" "}
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      Q2
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full flex flex-row gap-2">
                    {" "}
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      Q3
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full flex flex-row gap-2">
                    {" "}
                    <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
                      Q4
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="Start Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%" }}
                      >
                        <DatePicker
                          label="End Date"
                          value={dateValue}
                          onChange={(newValue) => setDateValue(newValue)}
                          sx={{ width: "100%", pt: 0 }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </>
              )}
            </div>
          )}

          <BlackButton className="w-full mt-4" onClick={handleCreateClient}>
            Create
          </BlackButton>
        </Box>
      </Modal>
    </div>
  );
}
