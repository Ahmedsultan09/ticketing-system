import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/components/card";
import { Button } from "../../../ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../ui/components/dialog";
import { Label } from "../../../ui/components/label";
import { Input } from "../../../ui/components/input";
import {
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import RadioBullet from "../../../ui/radioBullets";
import EngineerSpareParts from "../../manager/users/engineers/engineerSpareParts";
import EditMachineCard from "./editMachineCard";
import useFetchRegularVisits from "../../../hooks/useFetchRegularVisits";
import Header from "../../..//ui/components/header";
import ContractRules from "../../../ui/contractRules";

export default function SpecificRv() {
  const [currentRv, setCurrentRv] = useState([]);
  const [doneMachines, setDoneMachines] = useState([]);
  const [renderedMachines, setRenderedRvs] = useState(currentRv);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [meterIsValid, setMeterIsValid] = useState(null);
  const [combinedReport, setCombinedReport] = useState("");
  const [machineRules, setMachineRules] = useState([
    { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
  ]);
  const id = useParams();
  const openSaveMachineModal = (machine) => {
    setCurrentMachine(machine);
    setSaveModalOpen(true);
  };
  const closeSaveMachineModal = () => {
    setCurrentMachine(null);
    setSaveModalOpen(false);
  };
  const regularVisits = useFetchRegularVisits(4);
  useEffect(() => {
    setCurrentRv(regularVisits[parseInt(id.visitID - 1)]);
  }, [id, regularVisits]);

  const saveMachineDetails = () => {
    closeSaveMachineModal();

    setCurrentMachine({
      ...currentMachine,
      meterReading: currentMachine.meterReading,
      status: currentMachine.status,
    });

    setDoneMachines((prev) => [...prev, currentMachine]);
  };

  const saveRegularVisit = () => {};

  const handleStatus = (e) => {
    setCurrentMachine({
      ...currentMachine,
      status: e.target.value,
    });
  };

  useEffect(() => {
    if (
      currentMachine?.status !== "" &&
      currentMachine?.meterReading !== "" &&
      meterIsValid
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [currentMachine, meterIsValid]);

  useEffect(() => {
    if (doneMachines && currentRv) {
      const renderedMachines = currentRv.machines?.filter((machine) => {
        return !doneMachines.some(
          (doneMachine) => parseInt(machine.id) === parseInt(doneMachine.id)
        );
      });
      setRenderedRvs(renderedMachines);
    }
  }, [doneMachines, currentRv]);

  function handleAddDoneMachines(addedMachine) {
    setDoneMachines((prev) => [...prev, addedMachine]);
  }
  function handleRemoveDoneMachines(removedMachine) {
    const filteredMachines = doneMachines.filter((machine) => {
      return machine.id !== removedMachine.id;
    });
    setDoneMachines(filteredMachines);
  }

  useEffect(() => {
    if (currentMachine) {
      if (
        parseInt(currentMachine?.meterReading) >
        parseInt(
          currentRv?.machines[parseInt(currentMachine?.id) - 1]?.meterReading
        )
      ) {
        setMeterIsValid(true);
      } else {
        setMeterIsValid(false);
      }
    }
  }, [currentMachine, currentRv]);

  function handleCombinedReport(e) {
    setCombinedReport(e.target.value);
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header
        title="Regular Visit"
        description="Here you can find all details for the client, branch, and machines you need to check."
        btnText="Back to visits"
        direction="/regular-visits"
      />
      <div className="mt-2">
        <ContractRules rules={machineRules} />
      </div>
      <main className="flex-1 py-8 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background shadow-sm rounded-lg lg:col-span-1">
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Client Name
                </span>
                <p className="text-muted-foreground">{currentRv?.client}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Branch
                </span>
                <p className="text-muted-foreground">{currentRv?.branch}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-stone-600 text-white w-fit px-1 rounded-sm">
                  Deadline Date
                </span>
                <p className="text-muted-foreground">{currentRv?.deadline}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-sm rounded-lg w-full overflow-auto ">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Assigned machines</CardTitle>
              <Typography
                className="text-muted-foreground"
                variant="overline"
                fontWeight="bold"
              >
                ( {renderedMachines?.length} )
              </Typography>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 lg:grid-cols-1 grid-cols-1">
                {renderedMachines?.map((machine) => (
                  <div
                    key={machine.id}
                    className="flex w-full flex-wrap gap-1 border rounded p-2"
                  >
                    <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                      {machine.serialNumber.toString().toUpperCase()}
                    </span>
                    <div className="flex flex-col flex-wrap items-center justify-between w-full">
                      <div className="text-muted-foreground flex flex-row items-center justify-around gap-2">
                        <span>{machine.machineBrand}</span>
                        <span>-</span> <span>{machine.machineModel}</span>
                        <span>-</span>{" "}
                        {machine.ownership === "property" ? (
                          <div className="inline-flex h-4 items-center justify-center rounded-md bg-green-500 px-3 text-xs font-medium text-white">
                            Big Data's
                          </div>
                        ) : (
                          <div className="inline-flex items-center h-4  justify-center rounded-md bg-red-500 px-3 text-xs font-medium text-white">
                            {machine.client}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => openSaveMachineModal(machine)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <EditMachineCard
            doneMachines={doneMachines}
            handleAddDoneMachines={handleAddDoneMachines}
            handleRemoveDoneMachines={handleRemoveDoneMachines}
            currentRv={currentRv}
          />
        </div>
        {isSaveModalOpen && (
          <Dialog open={isSaveModalOpen} onOpenChange={setSaveModalOpen}>
            <DialogContent className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Machine Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 p-6">
                <div className="grid gap-2">
                  <Label htmlFor="meter-reading">Meter Reading</Label>

                  <div>
                    <Input
                      id="meter-reading"
                      type="number"
                      placeholder="Enter meter reading"
                      className={`${
                        !meterIsValid &&
                        "focus:ring-0 border-input border-red-700 focus-visible:ring-0"
                      }`}
                      value={currentMachine.meterReading}
                      onChange={(e) =>
                        setCurrentMachine({
                          ...currentMachine,
                          meterReading: e.target.value,
                        })
                      }
                    />
                    {!meterIsValid && (
                      <div className="text-red-500">
                        The meter reading you entered is below the latest read
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="close-action">Status of the machine</Label>
                  <FormControl>
                    <RadioGroup
                      defaultValue=""
                      aria-labelledby="demo-customized-radios"
                      name="customized-radios"
                      value={currentMachine.status}
                      onChange={handleStatus}
                    >
                      <FormControlLabel
                        value="stable"
                        control={<RadioBullet />}
                        label="Stable"
                      />
                      <FormControlLabel
                        value="spare-parts"
                        control={<RadioBullet />}
                        label="Spare parts"
                      />
                      <FormControlLabel
                        value="scrabbed"
                        control={<RadioBullet />}
                        label="Scrabbed / Replacement"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                {currentMachine?.status === "spare-parts" && (
                  <div className="grid gap-2">
                    <Label htmlFor="spare-parts-needed">
                      Spare Parts Needed
                    </Label>
                    <EngineerSpareParts saveBtn={false} />
                  </div>
                )}

                {currentMachine?.status === "scrabbed" && (
                  <div className="grid gap-2">
                    <Label htmlFor="scrabbed-reason">
                      Reason for scrabbing
                    </Label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="solution-details"
                      placeholder="Enter reason for scrabbing"
                      value={currentMachine.scrabbedReason}
                      onChange={(e) =>
                        setCurrentMachine({
                          ...currentMachine,
                          scrabbedReason: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                {formIsValid ? (
                  <Button className="w-full" onClick={saveMachineDetails}>
                    Save Machine Details
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={saveMachineDetails}
                    disabled
                  >
                    Save Machine Details
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <div className="container mx-auto mt-8">
          <Card className="bg-background shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle>Regular Visit Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-2">
                <Label className="required">Upload Combined Report</Label>
                <Input
                  id="combined-pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleCombinedReport}
                  required
                />
              </div>
              {combinedReport === "" || renderedMachines.length !== 0 ? (
                <Button className="w-full" disabled={true}>
                  Save Regular Visit
                </Button>
              ) : (
                <Button className="w-full" onClick={saveRegularVisit}>
                  Save Regular Visit
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
