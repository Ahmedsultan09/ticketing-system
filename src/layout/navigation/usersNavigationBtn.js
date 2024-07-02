import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Link as Direct } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function UsersNavigationBtn() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        className="text-gray-300 hover:text-white cursor-pointer font-medium"
        disableElevation
        onClick={handleClick}
        size="small"
      >
        Users
        <KeyboardArrowDownIcon />
      </div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Direct to="/users/accounts">
          {" "}
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon />
            Accounts
          </MenuItem>
        </Direct>

        <Divider sx={{ my: 0.5 }} />
        <Direct to="/users/operators">
          {" "}
          <MenuItem onClick={handleClose} disableRipple>
            <SupervisedUserCircleIcon />
            Operators
          </MenuItem>
        </Direct>
        <Direct to="/users/engineers">
          <MenuItem onClick={handleClose} disableRipple>
            <EngineeringIcon />
            Engineers
          </MenuItem>
        </Direct>
      </StyledMenu>
    </div>
  );
}
