import React, { useState } from "react";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateUserModal from "./createUserModal";
import EditUserModal from "./editUserModal";
import DeleteUserModal from "./deleteUserModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

// Custom styled button for small screens
const IconButton = styled(Button)(({ theme }) => ({
  height: "40px",
  minWidth: "40px",
  borderRadius: "50%",
  [theme.breakpoints.down("sm")]: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

function AllUsers() {
  const [allUsers] = useState([
    {
      name: "Ahmed Alaa",
      userName: "ahmed.alaa",
      role: "admin",
    },
    {
      name: "Osama Ahmed",
      userName: "osama.ahmed",
      role: "manager",
    },
    {
      name: "Rasha Ahmed",
      userName: "rasha.ahmed",
      role: "manager",
    },
    {
      name: "Mohammed Ragab",
      userName: "mohamed.ragab",
      role: "engineer",
    },
    {
      name: "Ahmed Abdullah",
      userName: "ahmed.abdullah",
      role: "engineer",
    },
    {
      name: "Mohammed Abdellah",
      userName: "mohammed.abdellah",
      role: "operator",
    },
    {
      name: "Mohammed Loly",
      userName: "mohammed.loly",
      role: "operator",
    },
    {
      name: "Mohammed Tarek",
      userName: "mohammed.tarek",
      role: "operator",
    },
  ]);

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleOpenCreateUser = () => {
    setOpenCreateUser(true);
  };
  const handleCloseCreateUser = () => {
    setOpenCreateUser(false);
  };
  const handleOpenEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditUser(true);
  };
  const handleCloseEditUser = () => {
    setOpenEditUser(false);
    setSelectedUser({});
  };
  const handleOpenDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteUser(true);
  };
  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
    setSelectedUser({});
  };

  return (
    <main className="w-full relative overflow-hidden">
      <div className="w-full h-16 bg-white flex flex-row items-center justify-between p-4 border-b border-gray-400">
        <div className="flex flex-row gap-2">
          <Typography className="text-orange-600 !font-bold border-r border-gray-400 pr-3">
            All Users
          </Typography>
          <Typography component="span" className=" ml-1 text-black opacity-70">
            {allUsers.length}
          </Typography>
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={handleOpenCreateUser}
        >
          Add new user
          <AddCircleSharpIcon sx={{ width: 18, height: 18, marginLeft: 1 }} />
        </Button>
      </div>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} className="mt-4">
          {allUsers.map((user, index) => (
            <Item key={index} className="!mb-4">
              <div className="flex flex-col w-1/3">
                <span className="font-bold !text-black">{user.name}</span>
                <span>{user.userName}</span>
              </div>
              <div>
                {user.role === "admin" && (
                  <div className="h-5 w-20 rounded-3xl text-white text-sm bg-red-600 flex items-center justify-center">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                )}
                {user.role === "manager" && (
                  <div className="h-5 w-20 rounded-3xl text-white text-sm bg-green-600 flex items-center justify-center">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                )}
                {user.role === "operator" && (
                  <div className="h-5 w-20 rounded-3xl text-white text-sm bg-orange-600 flex items-center justify-center">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                )}
                {user.role === "engineer" && (
                  <div className="h-5 w-20 rounded-3xl text-white text-sm bg-gray-600 flex items-center justify-center">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                )}
              </div>
              <div className="w-1/3 h-full flex flex-row gap-3 justify-end items-center sm:text-sm">
                <IconButton
                  variant="contained"
                  color="secondary"
                  className="h-7"
                  size="small"
                  onClick={() => handleOpenEditUser(user)}
                  disabled={user.role === "admin"}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="error"
                  className="h-7"
                  size="small"
                  onClick={() => handleOpenDeleteUser(user)}
                  disabled={user.role === "admin"}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Item>
          ))}
        </Stack>
      </Box>
      <EditUserModal
        open={openEditUser}
        handleOpen={handleOpenEditUser}
        handleClose={handleCloseEditUser}
        user={selectedUser}
      />
      <CreateUserModal
        open={openCreateUser}
        handleOpen={handleOpenCreateUser}
        handleClose={handleCloseCreateUser}
      />
      <DeleteUserModal
        open={openDeleteUser}
        handleOpen={handleOpenDeleteUser}
        handleClose={handleCloseDeleteUser}
        user={selectedUser}
      />
    </main>
  );
}

export default AllUsers;
