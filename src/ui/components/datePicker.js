import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

function DateLayout({ period, handleTimeline }) {
  const [dateValue] = useState(dayjs(new Date()));
  const [annualPeriod, setAnnualPeriod] = useState([
    {
      periodNumber: 1,
      startDate: "",
      endDate: "",
    },
  ]);
  const [semiAnnualPeriods, setSemiAnnualPeriods] = useState([
    {
      periodNumber: 1,
      startDate: "",
      endDate: "",
    },
    {
      periodNumber: 2,
      startDate: "",
      endDate: "",
    },
  ]);
  const [quarterlyPeriods, setQuarterlyPeriods] = useState([
    {
      periodNumber: 1,
      startDate: "",
      endDate: "",
    },
    {
      periodNumber: 2,
      startDate: "",
      endDate: "",
    },
    {
      periodNumber: 3,
      startDate: "",
      endDate: "",
    },
    {
      periodNumber: 4,
      startDate: "",
      endDate: "",
    },
  ]);

  const updateStartDate = (newStartDate, periodNum) => {
    if (period === "semi-annually") {
      setSemiAnnualPeriods((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, startDate: newStartDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    } else if (period === "quarterly") {
      setQuarterlyPeriods((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, startDate: newStartDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    } else {
      setAnnualPeriod((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, startDate: newStartDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    }
  };
  const updateEndDate = (newEndDate, periodNum) => {
    if (period === "semi-annually") {
      setSemiAnnualPeriods((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, endDate: newEndDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    } else if (period === "quarterly") {
      setQuarterlyPeriods((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, endDate: newEndDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    } else {
      setAnnualPeriod((prevPeriods) =>
        prevPeriods.map(
          (period) =>
            period.periodNumber === periodNum
              ? { ...period, endDate: newEndDate } // Update the startDate of the matching period
              : period // Leave other periods unchanged
        )
      );
    }
  };

  useEffect(() => {
    function handleChangeTimeline() {
      if (period === "annually") {
        handleTimeline(annualPeriod);
      } else if (period === "semi-annually") {
        handleTimeline(semiAnnualPeriods);
      } else {
        handleTimeline(quarterlyPeriods);
      }
    }
    handleChangeTimeline();
  }, [
    period,
    annualPeriod,
    semiAnnualPeriods,
    quarterlyPeriods,
    handleTimeline,
  ]);

  return (
    <div className="h-full flex flex-row flex-wrap justify-between w-full gap-3 border border-gray-400 p-2 rounded-lg">
      {" "}
      {period === "annually" && (
        <>
          <div className="w-full flex flex-row gap-2">
            <span className="w-fit h-full px-2 flex flex-row items-center justify-center bg-emerald-700 text-white font-bold rounded-lg">
              P
            </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 1);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 1);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 1);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 1);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 2);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 2);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 1);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 1);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 2);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 2);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 3);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 3);
                  }}
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
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="Start Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateStartDate(newValue, 4);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  label="End Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    updateEndDate(newValue, 4);
                  }}
                  sx={{ width: "100%", pt: 0 }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </>
      )}
    </div>
  );
}

export default DateLayout;
