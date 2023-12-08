import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import "../Dashboard/Dashboard.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AnnouncementDetails from "./AnnouncementDetails";

const AdminAnnouncement = () => {
  const { user } = useAuth();
  const [announcements, setAllAnnouncements] = useState([]);
  const navigate = useNavigate();

  const approveAnnouncement = async (aid) => {
    try {
      await axios.put(
        `http://localhost:8080/announcement/updateStatus?aid=${aid}`,
        {
          status: "Approved",
        }
      );
      getAllPendingAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPendingAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/announcement/getAllAnnouncements"
      );
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

              {announcements
                .filter((announcement) => announcement.status === "Pending")
                .map((announcement, index) => (
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <div
                        className="pending-announcement d-flex flex-row justify-content-between"
                        key={index}
                      >
                        <p>{announcement.author}</p>
                        <p>
                          <span className="fw-bold">{announcement.title}</span>{" "}
                          -{" "}
                          {announcement.content
                            .split(" ")
                            .slice(0, 10)
                            .join(" ")}
                          {announcement.content.split(" ").length > 10 && "..."}
                          {announcement.content.split(" ").length > 10 && (
                            <Link
                              to={{
                                pathname: "/adminAnnouncement/announcementName",
                                state: { announcement },
                              }}
                              style={{
                                textDecoration: "none",
                                color: "#17A1FA",
                                cursor: "pointer",
                              }}
                            >
                              {" "}
                              See More
                            </Link>
                          )}
                        </p>
                        <p>{announcement.date_posted}</p>
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="DialogOverlay" />
                      <Dialog.Content className="DialogContent">
                        {/* <Dialog.Title className="DialogTitle fw-bold">
                        {announcement.title}
                      </Dialog.Title>
                      <Dialog.Description className="DialogDescription">
                        {announcement.content}
                      </Dialog.Description> */}
                        <fieldset className="Fieldset">
                          <label className="Label" htmlFor="title">
                            Title
                          </label>
                          <input
                            className="Input"
                            id="title"
                            required
                            defaultValue={announcement.title}
                            readOnly
                          />
                        </fieldset>
                        <fieldset className="Fieldset">
                          <label className="Label" htmlFor="content">
                            Content
                          </label>
                          <input
                            className="Input"
                            id="content"
                            required
                            defaultValue={announcement.content}
                            readOnly
                          />
                        </fieldset>
                        <fieldset className="Fieldset">
                          <label className="Label" htmlFor="author">
                            Author
                          </label>
                          <input
                            className="Input"
                            id="author"
                            required
                            defaultValue={announcement.author}
                            readOnly
                          ></input>
                        </fieldset>
                        <fieldset className="Fieldset">
                          <label className="Label" htmlFor="date_posted">
                            Date Posted
                          </label>
                          <input
                            className="Input"
                            id="date_posted"
                            defaultValue={announcement.date_posted}
                            readOnly
                          />
                        </fieldset>
                        <fieldset className="Fieldset">
                          <label className="Label" htmlFor="expiry_date">
                            Expiry Date
                          </label>
                          <input
                            className="Input"
                            id="expiry_date"
                            defaultValue={announcement.expiry_date}
                            readOnly
                          />
                        </fieldset>
                        <div
                          style={{
                            display: "flex",
                            marginTop: 25,
                            justifyContent: "flex-end",
                          }}
                        >
                          <div className="dialog-buttons">
                            <Dialog.Close asChild>
                              <button
                                className="Button green"
                                id="cancel-button"
                              >
                                Cancel
                              </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                              <button
                                className="Button green"
                                onClick={() => {
                                  approveAnnouncement(announcement.aid);
                                }}
                              >
                                Approve
                              </button>
                            </Dialog.Close>
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                ))}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab2"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="announcement-list">
              {/* <h1 className="text-center">No posts</h1> */}
              {announcements
                .filter((announcement) => announcement.status === "Approved")
                .map((announcement, index) => (
                  <Link
                    to={{
                      pathname: `/adminAnnouncement/announcementDetails/${announcement.aid}`,
                    }}
                    key={index}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="pending-announcement d-flex flex-row justify-content-between"
                      key={index}
                    >
                      <p>{announcement.author}</p>
                      <p>
                        <span className="fw-bold">{announcement.title}</span> -{" "}
                        {announcement.content.split(" ").slice(0, 10).join(" ")}
                        {announcement.content.split(" ").length > 10 && "..."}
                        {announcement.content.split(" ").length > 10 && (
                          <span
                            style={{
                              textDecoration: "none",
                              color: "#17A1FA",
                              cursor: "pointer",
                            }}
                          >
                            {" "}
                            See More
                          </span>
                        )}
                      </p>
                      <p>{announcement.date_posted}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AdminAnnouncement;
