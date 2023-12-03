import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import "../Dashboard/Dashboard.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminAnnouncement = () => {
  const { user } = useAuth();
  const [announcements, setAllAnnouncements] = useState([]);

  const getAllPendingAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/announcement/getAllAnnouncements"
      );
      console.log(response.data);
      setAllAnnouncements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPendingAnnouncements();
  }, []);

  return (
    <>
      <AdminSideNav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <div className="d-flex flex-row" id="header">
          <img
            src="/images/Announcement-dash.svg"
            alt="announcement-logo"
            className="img-dash"
          />
          <div className="titles d-flex flex-column">
            <h2>Announcement</h2>
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
                Pending
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Approved
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="announcement-list">
              {/* <h1 className="text-center">No users</h1> */}
              {announcements.map((announcement, index) => (
                <div
                  className="pending-announcement d-flex flex-row justify-content-between"
                  key={index}
                >
                  <p>{announcement.author}</p>
                  <p>
                    <span className="fw-bold">{announcement.title}</span> -{" "}
                    {announcement.content}
                  </p>
                  <p>{announcement.date_posted}</p>
                </div>
              ))}
            </div>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No posts</h1>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AdminAnnouncement;
