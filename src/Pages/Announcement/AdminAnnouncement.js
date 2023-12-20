import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import "../Dashboard/Dashboard.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
} from "@mui/material";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import dayjs from "dayjs";

const AdminAnnouncement = () => {
  const currentDate = dayjs().format("MM/DD/YYYY");

  const { user } = useAuth();
  const [announcements, setAllAnnouncements] = useState([]);
  const [n_title, setN_title] = useState("");
  const [n_message, setN_message] = useState("");
  const [dialogOpen, setDialogOpen] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleAlertDialogOpen = () => {
    setShowAlertDialog(true);
  };

  const handleAlertDialogClose = () => {
    setShowAlertDialog(false);
  };

  const handleOpenDialog = (index) => {
    const newDialogOpen = [...dialogOpen];
    newDialogOpen[index] = true;
    setDialogOpen(newDialogOpen);
  };

  const handleCloseDialog = (index) => {
    const newDialogOpen = [...dialogOpen];
    newDialogOpen[index] = false;
    setDialogOpen(newDialogOpen);
  };

  const deleteAnnouncement = async (aid) => {
    try {
      await axios.delete(
        `http://localhost:8080/announcement/deleteAnnouncement/${aid}`
      );
      getAllPendingAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };

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

  const addNotification = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/notification/addNotification",
        {
          title: n_title,
          message: n_message,
          date: currentDate,
          uid: userId,
        }
      );
      handleAlertDialogClose();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const returnToPending = async (aid) => {
    try {
      await axios.put(
        `http://localhost:8080/announcement/updateStatus?aid=${aid}`,
        {
          status: "Pending",
        }
      );
      getAllPendingAnnouncements();
    } catch (error) {
      console.error(error);
    }
  };

  const getUserDetails = async (uid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getUserById/${uid}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchUserDetails = async () => {
    const userDetailsPromises = announcements.map(async (announcement) => {
      if (!userDetailsMap[announcement.uid]) {
        const userDetails = await getUserDetails(announcement.uid);
        return { uid: announcement.uid, userDetails };
      }
      return null;
    });

    const userDetailsArray = await Promise.all(userDetailsPromises);
    const userDetailsMapCopy = { ...userDetailsMap };

    userDetailsArray.forEach((userDetailsObj) => {
      if (userDetailsObj) {
        userDetailsMapCopy[userDetailsObj.uid] = userDetailsObj.userDetails;
      }
    });

    setUserDetailsMap(userDetailsMapCopy);
  };

  useEffect(() => {
    getAllPendingAnnouncements();
    fetchUserDetails();
  }, [announcements]);

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
            <ScrollArea.Root className="ScrollAreaRoot">
              <ScrollArea.Viewport className="ScrollAreaViewport">
                <div className="announcement-list">
                  {/* <h1 className="text-center">No users</h1> */}

                  {announcements
                    .filter((announcement) => announcement.status === "Pending")
                    .map((announcement, index) => {
                      const userDetails = userDetailsMap[announcement.uid];
                      if (userDetails) {
                        return (
                          <React.Fragment key={index}>
                            <div
                              className="pending-announcement d-flex flex-row justify-content-between"
                              onClick={() => handleOpenDialog(index)}
                            >
                              <p>
                                {userDetails &&
                                  `${userDetails.fname} ${userDetails.lname}`}
                              </p>
                              <p>
                                <span className="fw-bold">
                                  {announcement.title}
                                </span>{" "}
                                -{" "}
                                {announcement.content
                                  .split(" ")
                                  .slice(0, 10)
                                  .join(" ")}
                                {announcement.content.split(" ").length > 10 &&
                                  "..."}
                                {announcement.content.split(" ").length >
                                  10 && (
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
                              <p>{announcement.date}</p>
                            </div>
                            <Dialog
                              open={dialogOpen[index] || false}
                              onClose={() => handleCloseDialog(index)}
                              fullWidth="lg"
                            >
                              <DialogContent
                                sx={{ padding: "24px 24px 0 24px" }}
                              >
                                <div
                                  className="d-flex flex-column align-items-start justify-content-start"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <label
                                    className="Label"
                                    htmlFor="announcement-title"
                                  >
                                    Announcement Title
                                  </label>
                                  <TextField
                                    className="dialog-input"
                                    id="title"
                                    required
                                    defaultValue={announcement.title}
                                    readOnly
                                  />
                                </div>
                                <div
                                  className="d-flex flex-column align-items-start justify-content-start"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <label
                                    className="Label"
                                    htmlFor="description"
                                  >
                                    Content
                                  </label>
                                  <TextField
                                    className="dialog-input"
                                    id="content"
                                    required
                                    defaultValue={announcement.content}
                                    readOnly
                                    multiline
                                    rows={3}
                                  />
                                </div>
                                <div
                                  className="d-flex flex-column align-items-start justify-content-start"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <label className="Label" htmlFor="location">
                                    Author
                                  </label>
                                  <TextField
                                    className="dialog-input"
                                    id="author"
                                    required
                                    defaultValue={
                                      userDetails &&
                                      `${userDetails.fname} ${userDetails.lname}`
                                    }
                                    readOnly
                                    size="small"
                                  />
                                </div>
                                <div
                                  className="d-flex flex-column align-items-start justify-content-start"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <label className="Label" htmlFor="location">
                                    Date Posted
                                  </label>
                                  <TextField
                                    className="dialog-input"
                                    id="date"
                                    defaultValue={announcement.date}
                                    readOnly
                                    size="small"
                                  />
                                </div>
                              </DialogContent>
                              <DialogActions
                                sx={{ padding: "0 24px", margin: "10px 0" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    marginTop: 25,
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <div className="dialog-buttons">
                                    <button
                                      className="Button green"
                                      id="cancel-button"
                                      onClick={() => handleCloseDialog(index)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="Button green"
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                      onClick={() => {
                                        deleteAnnouncement(announcement.aid);
                                        handleCloseDialog(index);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <React.Fragment>
                                      <button
                                        className="Button green"
                                        onClick={() => {
                                          handleAlertDialogOpen();
                                        }}
                                      >
                                        Approve
                                      </button>
                                      <Dialog
                                        fullWidth="lg"
                                        open={showAlertDialog}
                                        onClose={handleAlertDialogClose}
                                      >
                                        <DialogTitle
                                          id="alert-dialog-title"
                                          className="fw-bold"
                                        >
                                          Create Notification
                                        </DialogTitle>
                                        <DialogContent
                                          sx={{ padding: "24px 24px 0 24px" }}
                                        >
                                          <div
                                            className="d-flex flex-column align-items-start justify-content-start"
                                            style={{ marginBottom: "15px" }}
                                          >
                                            <label
                                              className="Label"
                                              htmlFor="department-title"
                                            >
                                              Title
                                            </label>
                                            <TextField
                                              className="dialog-input"
                                              id="title"
                                              required
                                              value={n_title}
                                              onChange={(e) => {
                                                setN_title(e.target.value);
                                              }}
                                            />
                                          </div>
                                          <div
                                            className="d-flex flex-column align-items-start justify-content-start"
                                            style={{ marginBottom: "15px" }}
                                          >
                                            <label
                                              className="Label"
                                              htmlFor="description"
                                            >
                                              Message
                                            </label>
                                            <TextField
                                              className="dialog-input"
                                              id="content"
                                              required
                                              value={n_message}
                                              onChange={(e) => {
                                                setN_message(e.target.value);
                                              }}
                                              multiline
                                              rows={3}
                                            />
                                          </div>
                                        </DialogContent>
                                        <DialogActions
                                          sx={{
                                            padding: "0 24px",
                                            margin: "10px 0",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 25,
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <div className="dialog-buttons">
                                              <button
                                                className="Button green"
                                                id="cancel-button"
                                                onClick={handleAlertDialogClose}
                                              >
                                                Cancel
                                              </button>

                                              <button
                                                className="Button green"
                                                onClick={() => {
                                                  addNotification(
                                                    userDetails.uid
                                                  );
                                                  approveAnnouncement(
                                                    announcement.aid
                                                  );
                                                  handleAlertDialogClose();
                                                  handleCloseDialog(index);
                                                }}
                                              >
                                                Save
                                              </button>
                                            </div>
                                          </div>
                                        </DialogActions>
                                      </Dialog>
                                    </React.Fragment>
                                  </div>
                                </div>
                              </DialogActions>
                            </Dialog>
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
                  {announcements.filter(
                    (announcement) => announcement.status === "Pending"
                  ).length === 0 && (
                    <h1 className="text-center">No pending announcements</h1>
                  )}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                className="ScrollAreaScrollbar"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="ScrollAreaThumb" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Scrollbar
                className="ScrollAreaScrollbar"
                orientation="horizontal"
              >
                <ScrollArea.Thumb className="ScrollAreaThumb" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>
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
                .map((announcement, index) => {
                  const userDetails = userDetailsMap[announcement.uid];
                  if (userDetails) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="pending-announcement d-flex flex-row justify-content-between"
                          key={index}
                          onClick={() => {
                            handleOpenDialog(index);
                          }}
                        >
                          <p>
                            {userDetails &&
                              `${userDetails.fname} ${userDetails.lname}`}
                          </p>
                          <p>
                            <span className="fw-bold">
                              {announcement.title}
                            </span>{" "}
                            -{" "}
                            {announcement.content
                              .split(" ")
                              .slice(0, 10)
                              .join(" ")}
                            {announcement.content.split(" ").length > 10 &&
                              "..."}
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
                          <p>{announcement.date}</p>
                        </div>
                        <Dialog
                          fullWidth="lg"
                          open={dialogOpen[index] || false}
                          onClose={() => handleCloseDialog(index)}
                        >
                          <DialogContent sx={{ padding: "24px 24px 0 24px" }}>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label
                                className="Label"
                                htmlFor="department-title"
                              >
                                Title
                              </label>
                              <TextField
                                className="dialog-input"
                                id="title"
                                required
                                defaultValue={announcement.title}
                                readOnly
                              />
                            </div>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label className="Label" htmlFor="description">
                                Content
                              </label>
                              <TextField
                                className="dialog-input"
                                id="content"
                                required
                                defaultValue={announcement.content}
                                readOnly
                                multiline
                                rows={3}
                              />
                            </div>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label className="Label" htmlFor="location">
                                Author
                              </label>
                              <TextField
                                className="dialog-input"
                                id="author"
                                required
                                defaultValue={
                                  userDetails &&
                                  `${userDetails.fname} ${userDetails.lname}`
                                }
                                readOnly
                                size="small"
                              />
                            </div>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label className="Label" htmlFor="location">
                                Date Posted
                              </label>
                              <TextField
                                className="dialog-input"
                                id="date"
                                defaultValue={announcement.date}
                                readOnly
                                size="small"
                              />
                            </div>
                          </DialogContent>
                          <DialogActions
                            sx={{ padding: "0 24px", margin: "10px 0" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                marginTop: 25,
                                justifyContent: "flex-end",
                              }}
                            >
                              <div className="dialog-buttons">
                                <button
                                  className="Button green"
                                  id="cancel-button"
                                  onClick={() => handleCloseDialog(index)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="Button green"
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    deleteAnnouncement(announcement.aid);
                                    handleCloseDialog(index);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="Button green"
                                  onClick={() => {
                                    returnToPending(announcement.aid);
                                    handleCloseDialog(index);
                                  }}
                                >
                                  Return to Pending
                                </button>
                              </div>
                            </div>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              {announcements.filter(
                (announcement) => announcement.status === "Approved"
              ).length === 0 && (
                <h1 className="text-center">No approved announcements</h1>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AdminAnnouncement;
