import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect, useState } from "react";

// Create a theme with RTL direction
const theme = createTheme({
  direction: "rtl",
});

export default function ContractRules({ rules, isEdit, handleRemoveRule }) {
  if (!isEdit) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "2px",
          }}
          dir="rtl"
        >
          {rules.map((rule, index) => {
            if (rule.type === "success") {
              return (
                <Alert
                  severity="success"
                  className="min-w-[33%] flex-1 max-h-20 !text-xs !scrollbar-hide"
                  key={index}
                >
                  <AlertTitle className="!scrollbar-hide">مسموح</AlertTitle>
                  {rule.text}{" "}
                </Alert>
              );
            } else if (rule.type === "warning") {
              return (
                <Alert
                  severity="error"
                  className="min-w-[33%] flex-1 max-h-20 !text-xs !scrollbar-hide"
                  key={index}
                >
                  <AlertTitle className="!scrollbar-hide">غير مسموح</AlertTitle>
                  {rule.text}{" "}
                </Alert>
              );
            } else {
              return null;
            }
          })}
        </Stack>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "2px",
          }}
          dir="rtl"
          className="!scrollbar-hide"
        >
          {rules.map((rule, index) => {
            if (rule.type === "success") {
              return (
                <Alert
                  severity="success"
                  className="min-w-[33%] flex-1 max-h-20 !text-xs relative !scrollbar-hide"
                  key={index}
                >
                  <span
                    className="absolute -top-2 -right-2 text-red-700 cursor-pointer "
                    onClick={() => handleRemoveRule(rule.id)}
                  >
                    <RemoveCircleOutlineIcon className="border rounded-full" />
                  </span>
                  <AlertTitle className="!scrollbar-hide">مسموح</AlertTitle>
                  {rule.text}{" "}
                </Alert>
              );
            } else if (rule.type === "warning") {
              return (
                <Alert
                  severity="error"
                  className="min-w-[33%] flex-1 max-h-20 !text-xs relative !scrollbar-hide"
                  key={index}
                >
                  <span
                    className="absolute -top-2 -right-2 text-red-700 cursor-pointer"
                    onClick={() => handleRemoveRule(rule.id)}
                  >
                    <RemoveCircleOutlineIcon className="border rounded-full" />
                  </span>
                  <AlertTitle className="!scrollbar-hide">غير مسموح</AlertTitle>
                  {rule.text}{" "}
                </Alert>
              );
            } else {
              return null;
            }
          })}
        </Stack>
      </ThemeProvider>
    );
  }
}
