import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import axios from "axios";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const [spareParts, setSpareParts] = useState([]);

  useEffect(() => {
    async function fetchSpareParts() {
      const response = await axios.get("http://localhost:3000/machines");
      const sparePartsData = await response.data;
      setSpareParts(sparePartsData);
    }
    fetchSpareParts();
  }, []);

  return (
    <Autocomplete
      multiple
      id="spare-parts"
      options={
        spareParts?.map((sparePart) => ({
          id: sparePart.id,
          name: sparePart.name,
        })) || []
      }
      disableCloseOnSelect
      getOptionLabel={(option) => option.name} // Use option's name as label
      renderOption={(props, option, { selected }) => (
        <li {...props} key={`${option.id}-${option.name}`}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose spare parts needed"
          placeholder="Favorites"
        />
      )}
    />
  );
}
