import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import GreenLabel from "./greenLabel";
import YellowLabel from "./yellowLabel";
import RedLabel from "./redLabel";

function InfoLabel({ title, details, icon, xs = 4 }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "start",
  }));

  if (title !== "Ticket Type") {
    return (
      <Grid item xs={xs}>
        <Item className="min-h-20">
          <Typography variant="subtitle1" className="opacity-50">
            {title}:
          </Typography>
          <Typography variant="body1">{details}</Typography>
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
          </Box>
        </Item>
      </Grid>
    );
  }
}

export default InfoLabel;
