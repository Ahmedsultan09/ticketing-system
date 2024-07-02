import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link as Direct } from "react-router-dom";
export default function SideBarList({ drawerOpen }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Direct to="/users/accounts">
        <ListItemButton>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
        </ListItemButton>
      </Direct>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DisplaySettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Details" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Direct to="/users/operators">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Operators" />
              </ListItemButton>
            </Direct>
            <Direct to="/users/engineers">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <EngineeringIcon />
                </ListItemIcon>
                <ListItemText primary="Engineers" />
              </ListItemButton>
            </Direct>
          </List>
        </Collapse>
      )}
    </List>
  );
}
