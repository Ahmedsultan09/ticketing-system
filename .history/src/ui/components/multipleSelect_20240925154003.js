import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";

function getStyles(name, operatorData, theme) {
  return {
    fontWeight:
      operatorData.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  data,
  required,
  handleChangeOperator,
}) {
  const theme = useTheme();
  const [operatorData, setOperatorData] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8; // Add some padding for better touch usability
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: "100%",
        minWidth: 250, // Ensure a minimum width for tablet screens
      },
    },
  };

  const handleChange = (event) => {
    const operatorDetails = event.target.value;
    setOperatorData(operatorDetails);
  };

  useEffect(() => {
    handleChangeOperator(operatorData);
  }, [operatorData, handleChangeOperator]);

  return (
    <div className="w-full">
      <FormControl
        sx={{ width: "100%", mt: 1 }}
        size="small"
        fullWidth
        required={required}
      >
        <InputLabel id="demo-multiple-chip-label">Select Operator/s</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={operatorData}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Select Operator/s"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((ele) => (
            <MenuItem
              key={ele.id}
              value={ele}
              style={getStyles(ele.name, operatorData, theme)}
            >
              {ele.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
