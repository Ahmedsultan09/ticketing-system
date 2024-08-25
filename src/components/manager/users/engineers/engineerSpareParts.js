import React, { useEffect, useState } from "react";
import { Box, TextField, Chip, Button } from "@mui/material";

const EngineerSpareParts = ({ saveBtn, handleSpareParts }) => {
  const [inputValue, setInputValue] = useState("");
  const [spareParts, setSpareParts] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setSpareParts([...spareParts, inputValue.trim()]);
      setInputValue("");
    }
  };

  useEffect(() => {
    handleSpareParts(spareParts);
  }, [spareParts, handleSpareParts]);

  const handleDelete = (labelToDelete) => () => {
    setSpareParts((spareParts) =>
      spareParts.filter((label) => label !== labelToDelete)
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TextField
        label="Add Spare part"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        fullWidth
      />
      <Box sx={{ marginTop: 2 }}>
        {spareParts.map((label, index) => (
          <Chip
            key={index}
            label={label}
            onDelete={handleDelete(label)}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
      {saveBtn && (
        <Box sx={{ marginTop: 2 }}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
            {spareParts.length !== 0 && (
              <Button variant="outlined" color="success" size="small">
                Save
              </Button>
            )}
            {spareParts.length === 0 && (
              <Button variant="outlined" color="success" size="small" disabled>
                Save
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EngineerSpareParts;
