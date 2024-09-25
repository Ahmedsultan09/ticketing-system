import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function EngineerSpareParts({
  handleSpareParts,
  handleWorking,
}) {
  const [chipData, setChipData] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleAddBtn = () => {
    if (inputText.trim() === "") {
      return;
    }
    const newKey = chipData.length;
    setChipData((prevChips) => {
      const updatedChips = [...prevChips, { key: newKey, label: inputText }];
      handleSpareParts(updatedChips); // Pass the updated chipData to the parent
      return updatedChips;
    });
    setInputText("");
  };

  function handleMachineWorking(e) {
    if (e.target.value === "false") {
      handleWorking(false);
    } else {
      handleWorking(true);
    }
  }

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        flexDirection: "column",
        gap: "4px",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <div className="w-full flex flex-col items-start !my-1 ">
        {" "}
        <div className=" bg-red-700 text-white rounded-2xl px-2">
          هل الماكينة تعمل؟
        </div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleMachineWorking}
          >
            <FormControlLabel value={false} control={<Radio />} label="لا" />
            <FormControlLabel value={true} control={<Radio />} label="نعم" />
          </RadioGroup>
        </FormControl>
      </div>
      <label
        htmlFor="spare-parts-needed"
        className="w-fit h-7 flex items-center bg-red-700 text-white rounded-2xl px-2"
      >
        قطع الغيار اللتي تحتاجها
      </label>
      <TextField
        id="input"
        label="أدخل قطع الغيار اللتي تحتاجها"
        variant="filled"
        value={inputText}
        onChange={handleInputText}
        size="small"
      />
      <Button
        onClick={handleAddBtn}
        variant="contained"
        className="!bg-black hover:!bg-gray-800"
      >
        إضافة قطعة غيار
      </Button>
      <div className="flex flex-row flex-wrap">
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip label={data.label} onDelete={handleDelete(data)} />
            </ListItem>
          );
        })}
      </div>
    </Paper>
  );
}
