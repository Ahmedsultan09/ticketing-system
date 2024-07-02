import React, { useEffect, useState } from "react";
import { Box, TextField, Chip, Button } from "@mui/material";

const EngineerSpareParts = () => {
  const [inputValue, setInputValue] = useState("");
  const [labels, setLabels] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setLabels([...labels, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDelete = (labelToDelete) => () => {
    setLabels((labels) => labels.filter((label) => label !== labelToDelete));
  };

  useEffect(() => {
    console.log(labels);
  }, [labels]);

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Add Spare part"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
      />
      <Box sx={{ marginTop: 2 }}>
        {labels.map((label, index) => (
          <Chip
            key={index}
            label={label}
            onDelete={handleDelete(label)}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          {labels.length !== 0 && (
            <Button variant="outlined" color="success" size="small">
              Save
            </Button>
          )}
          {labels.length === 0 && (
            <Button variant="outlined" color="success" size="small" disabled>
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EngineerSpareParts;
