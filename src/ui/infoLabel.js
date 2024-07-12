import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import GreenLabel from "./type-labels/greenLabel";
import YellowLabel from "./type-labels/yellowLabel";
import RedLabel from "./type-labels/redLabel";
import BlueLabel from "./type-labels/blueLabel";

function InfoLabel({ title, details, icon, xs = 4, size }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "start",
  }));

  if (title !== "Ticket Type" && title !== "Priority") {
    return (
      <Grid item xs={xs}>
        <Item className="min-h-20 flex flex-row justify-between items-center">
          <div className="w-full">
            {" "}
            {title ? (
              <Typography variant="subtitle1" className="opacity-50">
                {title}:
              </Typography>
            ) : null}
            <Typography variant="body1" className="w-3/5">
              {details}
            </Typography>
          </div>
          <span>{icon}</span>
        </Item>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={xs}>
        <Item className="min-h-20">
          <Typography variant="subtitle1" className="opacity-50">
            {title}:
          </Typography>
          <Box sx={{ width: "100%" }}>
            {details === "open" && <GreenLabel text={details} />}
            {details === "pending" && <YellowLabel text={details} />}
            {details === "closed" && <RedLabel text={details} />}
            {details === "high" && <RedLabel text={details} />}
            {details === "medium" && <BlueLabel text={details} />}
            {details === "low" && <GreenLabel text={details} />}
          </Box>
        </Item>
      </Grid>
    );
  }
}

export default InfoLabel;
