import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  div,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MultipleSelect from "src/ui/components/multipleSelect";
import ContractRules from "src/ui/contractRules";
import axiosInstance from "src/api/axiosInstance";
import DateLayout from "src/ui/components/datePicker";

function ClientInfo({ clients, isRvAllowed, timeline }) {
  const [isEdit, setIsEdit] = useState(false);
  const [operators, setOperators] = useState([]);
  const [currentClient, setCurrentClient] = useState(clients);
  const [updatedTimeline, setUpdatedTimeline] = useState([]);
  const [currentClientRules, setCurrentClientRules] = useState(
    currentClient?.rules
  );
  const [currentClientName, setCurrentClientName] = useState(
    currentClient?.clientName
  );
  const [currentOperators, setCurrentOperators] = useState([
    currentClient?.operators,
  ]);
  const [rvAllowed, setRvAllowed] = useState(true);
  const [period, setPeriod] = useState("annually");
  const [validTimeline, setValidTimeline] = useState(false);

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
  }
  useEffect(() => {
    setCurrentClient(clients);
  }, [clients]);
  const handleNewName = useCallback((event) => {
    setCurrentClientName(event.target.value.toUpperCase());
  }, []);

  const clientName = useMemo(
    () => (
      <TextField
        id="clientName"
        key="clientNameField"
        label="New Client Name"
        value={currentClientName}
        onChange={handleNewName}
        autoFocus
      />
    ),
    [currentClientName, handleNewName]
  );

  useEffect(() => {
    setCurrentClientRules(currentClient?.rules);
    setCurrentClientName(currentClient?.clientName);
    setCurrentOperators(currentClient?.operators);
    setUpdatedTimeline(timeline);
  }, [
    currentClient?.rules,
    currentClient?.clientName,
    currentClient?.operators,
    timeline,
  ]);

  useEffect(() => {
    async function fetchOperators() {
      const response = await axiosInstance.get("/operators");
      const allOperators = await response.data;
      setOperators(allOperators);
    }
    fetchOperators();
  }, []);
  const ruleTextInputRef = useRef("");

  const ruleTypeInputRef = useRef("");
  const [rule, setRule] = useState({ id: 0, type: "", text: "" });

  function handleRuleType(e) {
    setRule({ ...rule, type: e.target.value });
  }

  function handleRuleText(e) {
    setRule({ ...rule, text: e.target.value });
  }

  function handleEdit() {
    setIsEdit(true);
  }

  function handleSave() {
    setIsEdit(false);
  }
  function handleRemoveRule(id) {
    setCurrentClientRules((prev) => prev.filter((rule) => rule.id !== id));
  }

  function handleChangeOperator(data) {
    if (data.length > 0) {
      setCurrentOperators(data);
    } else {
      setCurrentOperators(currentClient?.operators);
    }
  }
  function handleChangeRvAllowed(e) {
    if (e.target.value === "true") {
      setRvAllowed(true);
    } else {
      setRvAllowed(false);
    }
  }

  function handlePeriod(e) {
    setPeriod(e.target.value);
  }

  function handleTimeline(data) {
    setUpdatedTimeline(data);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  // edit this tomorrow to reflect the idea of validation

  useEffect(() => {
    const invalidTimes = updatedTimeline?.filter((time) => {
      return time.startDate === "" || time.endDate === "";
    });
    if (invalidTimes?.length > 0) {
      setValidTimeline(false);
    } else {
      setValidTimeline(true);
    }
  }, [updatedTimeline]);

  return (
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
     
          {" "}
          <Button
            variant="contained"
            color="success"
            size="small"
            className="!absolute -top-3 right-7 h-6 "
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!validTimeline}
          >
            Save
          </Button>
        
 
      )}
      <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start relative mt-2 ">
        <div className="w-auto h-full opacity-60 font-normal mr-1">
          Client:{" "}
          {isEdit ? (
            <span className="font-bold opacity-100">{clientName}</span>
          ) : (
            <span className="font-bold opacity-100">{currentClientName}</span>
          )}
        </div>
      </div>
      {isEdit ? (
        <MultipleSelect
          data={operators}
          required={false}
          currentOperators={currentClient.operators}
          handleChangeOperator={handleChangeOperator}
        />
      ) : (
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start">
          <div className="w-auto h-full opacity-60 font-normal mr-1">
            Operator:{" "}
            <span className="font-bold opacity-100">
              {currentOperators?.length > 0 &&
                currentOperators?.map((operator, index) => {
                  if (index === currentOperators.length - 1) {
                    return <span key={index}>{operator?.name}</span>;
                  } else {
                    return <span key={index}>{operator?.name}, </span>;
                  }
                })}
            </span>
          </div>
        </div>
      )}
      {!isEdit && (
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start relative mt-2 ">
          <div className="w-auto h-full opacity-60 font-normal mr-1">
            Regular Visits allowed:{" "}
            <span className="font-bold opacity-100">
              {rvAllowed || isRvAllowed ? "Yes" : "No"}
            </span>
          </div>
        </div>
      )}

      {!isEdit && isRvAllowed && (
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start relative mt-2 ">
          <div className="w-auto h-full opacity-60 font-normal mr-1">
            Type of Visits:{" "}
            <span className="font-bold opacity-100">
              {updatedTimeline?.length === 4
                ? "ربع سنوية"
                : updatedTimeline?.length === 2
                ? "نصف سنوية"
                : "سنوية"}
            </span>
          </div>
        </div>
      )}

      {!isEdit && isRvAllowed && (
        <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal  relative mt-2 ">
          <div className="w-auto h-full opacity-60 font-normal flex flex-col lg:flex-row items-start justify-start gap-2">
            Timeline:{" "}
            {updatedTimeline?.map((ele, index) => {
              return (
                <span
                  className="font-bold opacity-100 border border-gray-400 rounded-lg p-2 "
                  key={index}
                >
                  {new Date(ele.startDate).toLocaleDateString()} -{" "}
                  {new Date(ele.endDate).toLocaleDateString()}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {isEdit && (
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
              value={rvAllowed}
              onChange={handleChangeRvAllowed}
              sx={{ width: "50%", display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel value={true} control={<Radio />} label="نعم" />
              <FormControlLabel value={false} control={<Radio />} label="لا" />
            </RadioGroup>
          </FormControl>
        </div>
      )}

      {isEdit && rvAllowed && (
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
              <MenuItem value="quarterly">ربع سنوية</MenuItem>
              <MenuItem value="semi-annually">نصف سنوية</MenuItem>
              <MenuItem value="annually">سنوية</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {isEdit && rvAllowed && (
        <DateLayout period={period} handleTimeline={handleTimeline} />
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
              <Button variant="contained" color="error" onClick={handleAddRule}>
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
            rules={currentClientRules}
            isEdit={false}
            handleRemoveRule={handleRemoveRule}
          />
        </div>
      )}
    </div>
  );
}

export default ClientInfo;
