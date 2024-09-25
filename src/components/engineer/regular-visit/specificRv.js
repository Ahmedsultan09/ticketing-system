import { useEffect, useRef, useState } from "react";
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
import AddNewMachine from "./addNewMachine";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Font,
  pdf,
  PDFDownloadLink,
  PDFViewer,
  renderToStream,
} from "@react-pdf/renderer";
import ReportPDF from "./reportPDF";
import * as FileSaver from "file-saver";

export default function SpecificRv() {
  const [currentRv, setCurrentRv] = useState([]);
  const [doneMachines, setDoneMachines] = useState([]);
  const [renderedMachines, setRenderedRvs] = useState(currentRv);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [combinedReport, setCombinedReport] = useState("");
  const [addedMachines, setAddedMachines] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
      meterReading: parseInt(currentMachine.meterReading),
      status: currentMachine.status,
      spareParts: currentMachine.spareParts,
    });

    setDoneMachines((prev) => [...prev, currentMachine]);
  };

  const handleStatus = (e) => {
    setCurrentMachine({
      ...currentMachine,
      status: e.target.value,
    });
  };

  function handleSpareParts(data) {
    setCurrentMachine({ ...currentMachine, spareParts: data });
  }

  useEffect(() => {
    if (currentMachine?.status !== "" && currentMachine?.meterReading !== "") {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [currentMachine]);

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

  function handleCombinedReport(e) {
    setCombinedReport(e.target.value);
  }

  function handleWorking(data) {
    setCurrentMachine({ ...currentMachine, working: data });
  }

  function handleAddMachine(data) {
    setAddedMachines((prev) => [...prev, data]);
  }

  function handleRemoveMachine(id) {
    const filteredMachines = addedMachines.filter((machine) => {
      return machine.id !== id;
    });
    setAddedMachines(filteredMachines);
  }

  Font.register({
    family: "Cairo",
    src: "../../../assets/fonts/Cairo-Regular.ttf",
  });

  const generatePdfDocument = async (currentRv, fileName) => {
    const blob = await pdf(<ReportPDF client={currentRv?.client} />).toBlob();
    FileSaver.saveAs(blob, fileName);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]" id="doc">
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
            <CardHeader dir="rtl">
              <CardTitle>بيانات العميل</CardTitle>
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
            <CardHeader
              className="flex flex-row justify-between items-center"
              dir="rtl"
            >
              <CardTitle>الماكينات اللتي يجب عليك مراجعتها </CardTitle>
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
                      S/N: {machine.serialNumber.toString().toUpperCase()}
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
            handleSpareParts={handleSpareParts}
          />
        </div>
        {isSaveModalOpen && (
          <Dialog open={isSaveModalOpen} onOpenChange={setSaveModalOpen}>
            <DialogContent
              className="bg-background shadow-sm rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto"
              dir="rtl"
            >
              <DialogHeader>
                <DialogTitle>بيانات الماكينة</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 p-6">
                {currentMachine?.status !== "not-found" &&
                  currentMachine?.status !== "scrapped" && (
                    <div className="grid gap-2" dir="rtl">
                      <Label htmlFor="meter-reading">قراءة العداد</Label>
                      <div>
                        <Input
                          id="meter-reading"
                          type="number"
                          placeholder="أدخل قراءة العداد"
                          className="focus:ring-0 focus-visible:ring-0"
                          value={currentMachine.meterReading}
                          onChange={(e) =>
                            setCurrentMachine({
                              ...currentMachine,
                              meterReading: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                <div className="grid gap-2" dir="rtl">
                  <Label
                    htmlFor="close-action"
                    className="w-fit h-7 flex items-center bg-red-700 text-white rounded-2xl px-2"
                  >
                    حالة الماكينة
                  </Label>
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
                      <FormControlLabel
                        value="not-found"
                        control={<RadioBullet />}
                        label="الماكينة غير موجودة"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                {currentMachine?.status === "spare-parts" && (
                  <div className="grid gap-2" dir="rtl">
                    <EngineerSpareParts
                      saveBtn={false}
                      handleSpareParts={handleSpareParts}
                      handleWorking={handleWorking}
                    />
                  </div>
                )}

                {currentMachine?.status === "scrapped" && (
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
        <Card
          className="lg:w-1/2 sm:w-3/5 bg-background shadow-sm rounded-lg my-4 overflow-auto container "
          dir="rtl"
        >
          <CardHeader className="flex flex-row justify-between items-center">
            <Typography>الماكينات المضافة بواسطتك</Typography>
            <Typography
              className="text-muted-foreground"
              variant="overline"
              fontWeight="bold"
            >
              ( {addedMachines?.length} )
            </Typography>
          </CardHeader>
          {addedMachines.map((machine) => (
            <CardContent
              className="p-6 flex justify-center items-center"
              key={machine.id}
            >
              <div className="flex w-full flex-wrap gap-4 border rounded p-2 justify-center relative">
                <div
                  className="absolute -top-2 -right-2 text-red-700 cursor-pointer"
                  onClick={() => handleRemoveMachine(machine.id)}
                >
                  <RemoveCircleIcon />
                </div>
                <span className="text-sm font-medium bg-green-600 text-white w-fit px-1 rounded-sm">
                  S/N: {machine.serialNumber.toString().toUpperCase()}
                </span>
                <div className="flex flex-col flex-wrap items-center justify-between w-full">
                  <div className="text-muted-foreground flex flex-row items-center justify-around gap-2">
                    <span>{machine.machineBrand}</span>
                    <span>-</span> <span>{machine.machineModel}</span>
                    <span>-</span>{" "}
                    {machine.status === "stable" && (
                      <span>لا توجد بها مشكلة</span>
                    )}
                    {machine.status === "spare-parts" && (
                      <span>تحتاج الى قطع غيار</span>
                    )}
                    {machine.status === "scrapped" && (
                      <span>سحب الى مركز الخدمة</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          ))}
        </Card>

        <AddNewMachine
          handleAddMachine={handleAddMachine}
          addedMachines={addedMachines}
        />
        {doneMachines.length === currentRv?.machines?.length && (
          <div className="w-full my-4 flex items-center justify-center">
            <PDFDownloadLink
              document={
                <ReportPDF
                  currentRv={currentRv}
                  doneMachines={doneMachines}
                  addedMachines={addedMachines}
                />
              }
              fileName={`${currentRv?.id}`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <Button disabled>Loading document...</Button>
                ) : (
                  <Button>تحميل التقرير المجمع</Button>
                )
              }
            </PDFDownloadLink>
          </div>
        )}
        <div className="container mx-auto mt-8">
          <Card className="bg-background shadow-sm rounded-lg" dir="rtl">
            <CardHeader>
              <CardTitle>برجاء رفع الـ Reports المطلوبة</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="grid gap-2">
                <label
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                  htmlFor="engineer-pdf"
                >
                  التقرير
                  <span className="underline underline-offset-2">
                    المجمع{" "}
                  </span>{" "}
                  <span className="underline underline-offset-2">
                    بعد إمضاء الموظف المسؤول بصيغة{" "}
                  </span>{" "}
                  <span className="underline underline-offset-2">PDF</span> :
                </label>
                <Input
                  id="combined-pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleCombinedReport}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                  htmlFor="engineer-pdf"
                >
                  التقارير
                  <span className="underline underline-offset-2">
                    المستخرجة من الماكينة
                  </span>{" "}
                  <span className="underline underline-offset-2">
                    مجمعة في PDF واحد
                  </span>{" "}
                  :
                </label>{" "}
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
                <Button className="w-full">Save Regular Visit</Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
