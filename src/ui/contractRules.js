import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

// Create a theme with RTL direction
const theme = createTheme({
  direction: "rtl",
});

export default function ContractRules({ rules }) {
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
        {rules.map((rule) => {
          if (rule.type === "success") {
            return (
              <Alert
                severity="success"
                className="lg:w-[33%] w-[49%] flex-1 max-h-20 !text-xs"
              >
                <AlertTitle>مسموح</AlertTitle>
                {rule.text}{" "}
              </Alert>
            );
          } else if (rule.type === "warning") {
            return (
              <Alert
                severity="error"
                className="lg:w-[33%] w-[49%] flex-1 max-h-20 !text-xs"
              >
                <AlertTitle>غير مسموح</AlertTitle>
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
