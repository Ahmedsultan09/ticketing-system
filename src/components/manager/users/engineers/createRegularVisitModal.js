import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  pt: 2,
  px: 2,
  pb: 3,
};

export default function CreateRegularVisitModal({ open, handleClose, name }) {
  const [client, setClient] = useState("");
  const [branch, setBranch] = useState("");
  const [dateValue, setDateValue] = useState(dayjs("2022-04-17"));
  const [period, setPeriod] = useState("");
  const [area, setArea] = useState("القاهرة");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if ((client && branch && dateValue && period) !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [client, branch, dateValue, period]);
  const handleClientChange = (event) => {
    setClient(event.target.value);
  };
  const handleChangeArea = (event) => {
    setArea(event.target.value);
  };
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Regular visit details {name}{" "}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              flexGrow: "1",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "8px",
                px: "10px",
              }}
            >
              <FormControl fullWidth size="small" className="!mt-3 !w-[49%]">
                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={client}
                  label="Client"
                  onChange={handleClientChange}
                >
                  <MenuItem value={1} className="!flex !justify-end">
                    بنك مصر
                  </MenuItem>
                  <MenuItem value={2} className="!flex !justify-end">
                    بنك القاهرة
                  </MenuItem>
                  <MenuItem value={3} className="!flex !justify-end">
                    بنك ابو ظبى الاول
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small" className="!mt-3 !w-[49%]">
                <InputLabel id="branch">Area</InputLabel>
                <Select
                  labelId="area"
                  id="area"
                  value={area}
                  label="Area"
                  onChange={handleChangeArea}
                  required
                >
                  <MenuItem value={"القاهرة"}>القاهرة</MenuItem>
                  <MenuItem value={"الاسكندرية"}>الاسكندرية</MenuItem>
                  <MenuItem value={"السويس"}>السويس</MenuItem>
                </Select>
              </FormControl>
              {client === "" ? (
                <FormControl fullWidth size="small" className="!mt-3" disabled>
                  <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    label="Branch"
                    onChange={handleBranchChange}
                  >
                    <MenuItem value={1} className="!flex !justify-end">
                      الميثاق - 102
                    </MenuItem>
                    <MenuItem value={2} className="!flex !justify-end">
                      وسط البلد - 251
                    </MenuItem>
                    <MenuItem value={3} className="!flex !justify-end">
                      هيليوبوليس - 153
                    </MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth size="small" className="!mt-3">
                  <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    label="Branch"
                    onChange={handleBranchChange}
                  >
                    <MenuItem value={1} className="!flex !justify-end">
                      الميثاق - 102
                    </MenuItem>
                    <MenuItem value={2} className="!flex !justify-end">
                      وسط البلد - 251
                    </MenuItem>
                    <MenuItem value={3} className="!flex !justify-end">
                      هيليوبوليس - 153
                    </MenuItem>
                  </Select>
                </FormControl>
              )}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "49%" }}
                >
                  <DatePicker
                    label="Start Date"
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    sx={{ width: "100%", pt: 0 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <FormControl fullWidth className="!w-[49%] !pt-2 ">
                <InputLabel id="demo-simple-select-label" className="!pt-2">
                  Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={period}
                  label="Period"
                  onChange={(event) => setPeriod(event.target.value)}
                >
                  <MenuItem value={1} className="!flex !justify-end">
                    1 Month
                  </MenuItem>
                  <MenuItem value={2} className="!flex !justify-end">
                    3 Months
                  </MenuItem>
                  <MenuItem value={3} className="!flex !justify-end">
                    Year
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className="w-full h-16 flex items-center justify-center gap-2">
            {isFormValid ? (
              <Button variant="contained" color="success" onClick={handleClose}>
                Confirm
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleClose}
                disabled
              >
                Confirm
              </Button>
            )}
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
