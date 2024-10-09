import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSpecificTicket from "src/hooks/useFetchSpecificTicket";
import {
  Divider,
  FormControl,
  FormControlLabel,
  RadioGroup,
  styled,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import EngineerSpareParts from "../../manager/users/engineers/engineerSpareParts";
import Header from "../../../ui/components/header";
import ContractRules from "../../../ui/contractRules";
import ConfirmCallModal from "./confirmCallModal";

export default function SpecificCall() {
  const params = useParams();
  const specificTicket = useFetchSpecificTicket(params.callID);
  const [callDetails, setCallDetails] = useState({
    status: "",
    meterReading: null,
    signedReport: "",
    configrationReport: "",
    solutionDetails: "",
    spareParts: [],
    scrappedReason: "",
    working: false,
    missuse: false,
    missusePhoto: "",
  });
  const [currentCall, setCurrentCall] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [machineRules, setMachineRules] = useState([
    { id: 1, type: "success", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 2, type: "warning", text: "تركيب قطع غيار بدون مقايسة" },
    { id: 3, type: "warning", text: "بتغير السخان في حالة سوء الاستخدام" },
  ]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    setCurrentCall(specificTicket);
  }, [specificTicket]);

  function handleStatus(e) {
    setCallDetails((prev) => ({ ...prev, status: e.target.value }));
  }

  function handleSignedReport(e) {
    setCallDetails((prev) => ({ ...prev, signedReport: e.target.value }));
  }
  function handleConrigrationReport(e) {
    setCallDetails((prev) => ({ ...prev, configrationReport: e.target.value }));
  }

  function handleMeterReading(e) {
    setCallDetails((prev) => ({
      ...prev,
      meterReading: parseInt(e.target.value),
    }));
  }

  function handleSolution(e) {
    setCallDetails((prev) => ({ ...prev, solutionDetails: e.target.value }));
  }

  function handleSpareParts(data) {
    setCallDetails((prev) => ({ ...prev, spareParts: data }));
  }

  function handleScarppedReason(e) {
    setCallDetails((prev) => ({ ...prev, scrappedReason: e.target.value }));
  }

  function handleOpenCallModal() {
    setConfirmModalOpen(true);
  }

  function handleCloseCallModal() {
    setConfirmModalOpen(false);
  }

  function handleWorking(data) {
    setCallDetails((prev) => ({ ...prev, working: data }));
  }

  function handleMissusePhoto(e) {
    setCallDetails((prev) => ({ ...prev, missusePhoto: e.target.value }));
  }

  function handleMissuse(e) {
    setCallDetails((prev) => ({ ...prev, missuse: e.target.value }));
  }

  useEffect(() => {
    if (
      callDetails.status !== "" &&
      callDetails.signedReport !== "" &&
      callDetails.configrationReport !== ""
    ) {
      if (
        callDetails.status === "solved" &&
        callDetails.solutionDetails === "" &&
        callDetails.meterReading !== null
      ) {
        setFormIsValid(false);
      } else if (
        callDetails.status === "scrapped" &&
        callDetails.scrappedReason === ""
      ) {
        setFormIsValid(false);
      } else if (
        callDetails.status === "spare-parts" &&
        callDetails.spareParts.length === 0
      ) {
        setFormIsValid(false);
      } else {
        setFormIsValid(true);
      }
    }
  }, [callDetails]);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header
        title="Ticket Details"
        description={`Ticket #${currentCall?.id} - ${currentCall?.client}`}
        btnText="Back to calls"
        direction="/"
      />
      <div className="mt-2">
        <ContractRules rules={machineRules} />
      </div>
      <main className="flex-1 py-8 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Printer Details
              </h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Serial Number
                </span>
                <p>{currentCall?.serialNumber}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Machine Model
                </span>
                <p>
                  {currentCall?.machineBrand} - {currentCall?.machineModel}
                </p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Last Visit Date
                </span>
                <p>{currentCall?.lastVisitDate}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Last Visited Engineer
                </span>
                <p>{currentCall?.lastEng}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Latest Meter Reading
                </span>
                <p>{currentCall?.lastMeterReading}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-slate-600 text-white w-fit px-1 rounded-sm">
                  Ownership
                </span>
                {currentCall?.ownership === "property" ? (
                  <div className="inline-flex items-center justify-center rounded-md bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    Big Data's
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white">
                    {currentCall?.client}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Ticket Details
              </h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-amber-800 text-white w-fit px-1 rounded-sm">
                  Ticket Date
                </span>
                <p>{currentCall?.ticketDate}</p>
              </div>

              <div className="grid gap-1">
                <span className="text-sm font-medium bg-amber-800 text-white w-fit px-1 rounded-sm">
                  Issue
                </span>
                <p>{currentCall?.issue}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-amber-800 text-white w-fit px-1 rounded-sm">
                  Priority
                </span>

                {currentCall?.priority === "high" && (
                  <div className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white">
                    High
                  </div>
                )}
                {currentCall?.priority === "normal" && (
                  <div className="inline-flex items-center justify-center rounded-md bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
                    Normal
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Operator Details
              </h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-teal-800 text-white w-fit px-1 rounded-sm">
                  Operator Name
                </span>
                <p>{currentCall?.operator}</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-teal-800 text-white w-fit px-1 rounded-sm">
                  Operator Phone
                </span>
                <p>01111236361</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-teal-800 text-white w-fit px-1 rounded-sm">
                  Operator Suggestion
                </span>
                <p>{currentCall?.suggestion}</p>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                End user Details{" "}
              </h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-teal-800 text-white w-fit px-1 rounded-sm">
                  End user name
                </span>
                <p>Mohammed Ahmed</p>
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-medium bg-teal-800 text-white w-fit px-1 rounded-sm">
                  End user phone
                </span>
                <p>01122255466</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-8" dir="rtl">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Close Ticket
              </h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                  htmlFor="close-action"
                >
                  Close Ticket As
                </label>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="status"
                    name="status"
                    value={callDetails?.status}
                    onChange={handleStatus}
                  >
                    <FormControlLabel
                      value="solved"
                      control={<BpRadio />}
                      label="تم إصلاحها"
                    />
                    <FormControlLabel
                      value="spare-parts"
                      control={<BpRadio />}
                      label="تحتاج الى قطع غيار"
                    />
                    <FormControlLabel
                      value="scrapped"
                      control={<BpRadio />}
                      label="سحب الى مركز الصيانة"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {callDetails.status !== "" &&
                callDetails?.status === "solved" && (
                  <div className="grid gap-2">
                    <label
                      className="w-fit bg-red-700 text-white rounded-2xl px-2"
                      htmlFor="solution-details"
                    >
                      كيف قمت بحل المشكلة؟{" "}
                    </label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="solution-details"
                      placeholder="أدخل الحل باختصار"
                      onChange={handleSolution}
                    ></textarea>
                  </div>
                )}
              {callDetails.status !== "" &&
                callDetails?.status === "spare-parts" && (
                  <div className="grid gap-2">
                    <EngineerSpareParts
                      saveBtn={false}
                      handleSpareParts={handleSpareParts}
                      handleWorking={handleWorking}
                    />
                  </div>
                )}
              {callDetails.status !== "" &&
                callDetails?.status === "scrapped" && (
                  <div className="grid gap-2">
                    <label
                      className="w-fit bg-red-700 text-white rounded-2xl px-2"
                      htmlFor="scrapped-reason"
                    >
                      لماذا تريد سحب الماكينة لمركز الخدمة؟
                    </label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="scrapped-reason"
                      placeholder="ادخل السبب"
                      onChange={handleScarppedReason}
                    ></textarea>
                  </div>
                )}

              <div className="grid gap-2">
                <label
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                  htmlFor="meter-reading"
                >
                  قراءة العداد :
                </label>
                <input
                  className={`flex h-10 w-full rounded-md border  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`}
                  id="meter-reading"
                  placeholder="أدخل قراءة العداد"
                  type="number"
                  onChange={handleMeterReading}
                />
              </div>
              <FormControl>
                <label
                  id="is-missused"
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                >
                  هل لاحظت اي نوع من أنواع سوء الإستخدام؟
                </label>
                <RadioGroup
                  row
                  aria-labelledby="is-missused"
                  name="row-radio-buttons-group"
                  onChange={handleMissuse}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio value={true} />}
                    label="نعم"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio value={false} />}
                    label="لأ"
                  />
                </RadioGroup>
              </FormControl>
              {callDetails?.missuse && (
                <div className="grid gap-2">
                  <label
                    className="w-fit bg-red-700 text-white rounded-2xl px-2"
                    htmlFor="missuse-photo"
                  >
                    برجاء ارفاق صورة توضيحة لسوء استخدام العميل :
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="missuse-photo"
                    accept="image/*"
                    type="file"
                    onChange={handleMissusePhoto}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <label
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                  htmlFor="engineer-pdf"
                >
                  التقرير
                  <span className="underline underline-offset-2">
                    الموقع من العميل
                  </span>{" "}
                  بصيغة{" "}
                  <span className="underline underline-offset-2">PDF</span> :
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="engineer-pdf"
                  accept="application/pdf"
                  type="file"
                  onChange={handleSignedReport}
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="w-fit bg-red-700 text-white rounded-2xl px-2"
                  htmlFor="engineer-pdf"
                >
                  التقرير
                  <span className="underline underline-offset-2">
                    المستخرج من الماكينة
                  </span>{" "}
                  بصيغة{" "}
                  <span className="underline underline-offset-2">PDF</span> :
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="engineer-pdf"
                  accept="application/pdf"
                  type="file"
                  onChange={handleConrigrationReport}
                />
              </div>

              <button
                className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                disabled={!formIsValid}
                onClick={handleOpenCallModal}
              >
                {callDetails?.status === "spare-parts" ? "Revoke" : "Close"}{" "}
                Call
              </button>
            </div>
          </div>
        </div>
      </main>
      {confirmModalOpen && (
        <ConfirmCallModal
          callDetails={callDetails}
          confirmModalOpen={confirmModalOpen}
          setConfirmModalOpen={setConfirmModalOpen}
          closeConfirmCallModal={handleCloseCallModal}
        />
      )}
    </div>
  );
}
