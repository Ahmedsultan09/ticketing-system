import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import React, { useEffect, useState } from "react";
import RadioBullet from "src/ui/radioBullets";
import { Label } from "../../../ui/components/label";
import { Input } from "../../../ui/components/input";
import { Button } from "../../../ui/components/button";
import EngineerSpareParts from "src/components/manager/users/engineers/engineerSpareParts";

function AddNewMachine({ handleAddMachine, addedMachines }) {
  const [newMachine, setNewMachine] = useState({
    id: 0,
    serialNumber: "",
    machineModel: "",
    machineBrand: "",
    meterReading: "",
    status: "",
    scrappedReason: "",
    working: false,
  });
  const [machineIdCounter, setMachineIdCounter] = useState(1);

  const [formIsValid, setFormIsValid] = useState(false);

  function handleStatus(e) {
    setNewMachine({ ...newMachine, status: e.target.value });
  }

  function handleSpareParts(data) {
    setNewMachine({ ...newMachine, spareParts: data });
  }

  function handleWorking(data) {
    setNewMachine({ ...newMachine, working: data });
  }

  // handling changes in working while changing status

  useEffect(() => {
    if (newMachine?.status === "scrapped") {
      setNewMachine({ ...newMachine, working: false });
    } else if (newMachine?.status === "solved") {
      setNewMachine({ ...newMachine, working: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMachine?.status]);

  useEffect(() => {
    if (
      newMachine?.status !== "" &&
      newMachine?.machineBrand !== "" &&
      newMachine?.machineModel !== "" &&
      newMachine?.serialNumber !== "" &&
      ((newMachine.working === true && newMachine.meterReading !== "") ||
        newMachine.working === false) &&
      (newMachine.status !== "spare-parts" ||
        (newMachine.status === "spare-parts" &&
          newMachine.spareParts?.length > 0)) &&
      (newMachine.status !== "scrapped" ||
        (newMachine.status === "scrapped" &&
          newMachine.scrappedReason !== "")) &&
      (newMachine.status !== "stable" ||
        (newMachine.status === "stable" && newMachine.meterReading !== ""))
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [newMachine]);

  function resetInputs() {
    setNewMachine({
      serialNumber: "",
      machineModel: "",
      machineBrand: "",
      meterReading: "",
      status: "",
      working: false,
    });
  }

  function handleNewMachine() {
    // Set the id for the new machine
    const machineWithId = { ...newMachine, id: machineIdCounter };

    // Pass the new machine with id to the parent handler
    handleAddMachine(machineWithId);

    // Increment the machine id counter for the next machine

    // Reset the form inputs
    resetInputs();
  }

  useEffect(() => {
    setMachineIdCounter(addedMachines.length + 1);
  }, [addedMachines]);
  return (
    <div className="container mx-auto mt-8" dir="rtl">
      <Card className="bg-background shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle>هل وجدت ماكينة غير مدرجة في القائمة السابقة؟</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 p-6">
          <div className="grid gap-2">
            <Label className="bg-red-700 text-white w-fit py-1 px-2 rounded-2xl ">
              الـ Serial number :
            </Label>
            <Input
              id="serialNumber"
              type="text"
              placeholder="e.g. V1S5272753"
              value={newMachine?.serialNumber}
              onChange={(e) => {
                setNewMachine({ ...newMachine, serialNumber: e.target.value });
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label className="bg-red-700 text-white w-fit py-1 px-2 rounded-2xl ">
              موديل الماكينة :
            </Label>
            <Input
              id="machineModel"
              type="text"
              value={newMachine?.machineModel}
              placeholder="e.g. B405"
              onChange={(e) => {
                setNewMachine({ ...newMachine, machineModel: e.target.value });
              }}
            />{" "}
          </div>
          <div className="grid gap-2">
            <Label className="bg-red-700 text-white w-fit py-1 px-2 rounded-2xl ">
              نوع الماكينة :
            </Label>
            <Input
              id="machineBrand"
              value={newMachine?.machineBrand}
              placeholder="e.g. Xerox"
              type="text"
              onChange={(e) => {
                setNewMachine({ ...newMachine, machineBrand: e.target.value });
              }}
            />
          </div>
          {newMachine?.status === "stable" || newMachine?.working === true ? (
            <div className="grid gap-2">
              <Label
                htmlFor="meter-reading"
                className="bg-red-700 text-white w-fit py-1 px-2 rounded-2xl "
              >
                قراءة العداد :
              </Label>
              <div>
                <Input
                  id="meter-reading"
                  value={newMachine?.meterReading}
                  type="number"
                  placeholder="أدخل قراءة العداد"
                  className="focus:ring-0 focus-visible:ring-0"
                  onChange={(e) =>
                    setNewMachine({
                      ...newMachine,
                      meterReading: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <FormControl>
            <RadioGroup
              defaultValue=""
              aria-labelledby="demo-customized-radios"
              name="customized-radios"
              value={newMachine?.status}
              onChange={handleStatus}
            >
              <FormControlLabel
                value="stable"
                control={<RadioBullet />}
                label="لاتوجد فيها مشكلة"
              />
              <FormControlLabel
                value="spare-parts"
                control={<RadioBullet />}
                label="تحتاج الى قطع غيار"
              />
              <FormControlLabel
                value="scrapped"
                control={<RadioBullet />}
                label="سحب الى مركز الخدمة"
              />
            </RadioGroup>
          </FormControl>
          {newMachine?.status === "spare-parts" && (
            <div className="grid gap-2" dir="rtl">
              <EngineerSpareParts
                saveBtn={false}
                handleSpareParts={handleSpareParts}
                handleWorking={handleWorking}
              />
            </div>
          )}

          {newMachine?.status === "scrapped" && (
            <div className="grid gap-2" dir="rtl">
              <label
                className="w-fit bg-red-700 text-white rounded-2xl px-2"
                htmlFor="scrapped-reason"
              >
                لماذا تريد سحب الماكينة لمركز الخدمة؟
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="solution-details"
                placeholder="ادخل السبب"
                value={newMachine.scrappedReason}
                onChange={(e) =>
                  setNewMachine({
                    ...newMachine,
                    scrappedReason: e.target.value,
                  })
                }
              />
            </div>
          )}
          {formIsValid ? (
            <Button className="w-full" onClick={handleNewMachine}>
              إضافة الماكينة
            </Button>
          ) : (
            <Button className="w-full" disabled>
              إضافة الماكينة
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewMachine;
