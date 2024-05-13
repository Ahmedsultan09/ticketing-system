import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

function InfoLabel({ title, details, icon, xs = 4 }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "start",
  }));

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
}

export default InfoLabel;
