import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
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

function ClientInfo({ clients, isRvAllowed }) {
  const [isEdit, setIsEdit] = useState(false);
  const [operators, setOperators] = useState([]);
  const [currentClient, setCurrentClient] = useState(clients);

  const [currentClientRules, setCurrentClientRules] = useState(
    currentClient?.rules
  );
  const [currentClientName, setCurrentClientName] = useState(
    currentClient?.clientName
  );
  const [currentOperators, setCurrentOperators] = useState([
    currentClient?.operators,
  ]);

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

  useEffect(() => {
    setCurrentClientRules(currentClient?.rules);
    setCurrentClientName(currentClient?.clientName);
    setCurrentOperators(currentClient?.operators);
  }, [
    currentClient?.rules,
    currentClient?.clientName,
    currentClient?.operators,
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
    setCurrentOperators(data);
  }

  useEffect(() => {
    console.log(isRvAllowed);
  }, [isRvAllowed]);
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
            <span className="font-bold opacity-100">{currentClientName}</span>
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
              {currentOperators?.length > 0 &&
                currentOperators?.map((operator, index) => {
                  if (index === currentOperators.length - 1) {
                    return <span key={index}>{operator?.name}</span>;
                  } else {
                    return <span>{operator?.name}, </span>;
                  }
                })}
            </span>
          </Typography>
        </div>
      )}
      <div className="w-full h-1/5 border-b rounded-xl border-gray-400 p-3 font-normal flex items-center justify-start relative mt-2 ">
        <Typography className="w-auto h-full opacity-60 font-normal mr-1">
          Regular Visits allowed:{" "}
          <span className="font-bold opacity-100">
            {isRvAllowed ? "Yes" : "No"}
          </span>
        </Typography>
      </div>
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
