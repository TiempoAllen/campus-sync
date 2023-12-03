import React, { useEffect, useState } from "react";
import AdminSideNav from "./AdminSideNav";
import { useAuth } from "../../AuthContext";
import "../Components/Header.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Users = () => {
  const { user } = useAuth();
  const [users, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/getAllUsers"
      );
      setAllUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <AdminSideNav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <div className="d-flex flex-row" id="header">
          <img
            src="/images/user-admin.svg"
            alt="announcement-logo"
            className="img-dash"
          />
          <div className="titles d-flex flex-column">
            <h2>Users</h2>
            <Paper
              component="form"
              sx={{
                p: "0px 5px",
                display: "flex",
                alignItems: "center",
                borderRadius: "20px",
                width: "100%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="options-tablist">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                All
              </Tabs.Trigger>
              {/* <Tabs.Trigger className="TabsTrigger" value="tab2">
                Today
              </Tabs.Trigger> */}
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="user-list d-flex flex-row justify-content-around">
              {/* <h1 className="text-center">No users</h1> */}
              <div>
                <p style={{ marginBottom: "8px" }} className="fw-bold">
                  First Name
                </p>
                {users.map((user, index) => (
                  <p key={index} className="my-2">
                    {user.fname}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ marginBottom: "8px" }} className="fw-bold">
                  Last Name
                </p>
                {users.map((user, index) => (
                  <p key={index} className="my-2">
                    {user.lname}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ marginBottom: "8px" }} className="fw-bold">
                  Email
                </p>
                {users.map((user, index) => (
                  <p key={index} className="my-2">
                    {user.email}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ marginBottom: "8px" }} className="fw-bold">
                  Role
                </p>
                {users.map((user, index) => (
                  <p key={index} className="my-2">
                    {user.role}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ marginBottom: "8px" }} className="fw-bold">
                  Operation
                </p>
                {users.map((user, index) => (
                  <div key={index} className="operation text-center">
                    <DeleteIcon sx={{ color: "#374151" }} />
                    <EditIcon sx={{ color: "#374151" }} />
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>
          {/* <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No posts</h1>
          </Tabs.Content> */}
        </Tabs.Root>
      </div>
    </>
  );
};

export default Users;
