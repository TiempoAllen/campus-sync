import React, { useEffect, useState } from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import * as Avatar from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ContextMenuPortalPosts from "../Components/ContextMenuPortalPosts";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Announcement = () => {
  const { user } = useAuth();
  const [a_title, setA_title] = useState("");
  const [a_content, setA_content] = useState("");
  const [announcements, setAnnouncement] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const currentDate = dayjs().format("MM/DD/YYYY");

  const handleAlertDialogClose = () => {
    setShowAlertDialog(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editAnnouncement = async (aid, editedAnnouncement) => {
    try {
      const updatedAnnouncement = {
        title: editedAnnouncement.title,
        content: editedAnnouncement.content,
      };
      const response = await axios.put(
        `http://localhost:8080/announcement/updateAnnouncement?aid=${aid}`,
        updatedAnnouncement
      );
      approvedAnnouncement();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAnnouncement = async (aid) => {
    try {
      await axios.delete(
        `http://localhost:8080/announcement/deleteAnnouncement/${aid}`
      );
      approvedAnnouncement();
    } catch (error) {
      console.error(error);
    }
  };

  const saveAnnouncement = async () => {
    if (!a_title || !a_content) {
      console.error("All fields are required");
      alert("All fields are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/announcement/addAnnouncement",
        {
          title: a_title,
          content: a_content,
          date: currentDate,
          uid: user.uid,
        }
      );
      console.log(response.data);
      setA_title("");
      setA_content("");
      handleClose();
      setShowAlertDialog(true);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const approvedAnnouncement = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/announcement/getAllAnnouncements"
      );

      setAnnouncement(response.data);
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
    approvedAnnouncement();
    fetchUserDetails();
  }, [announcements]);

  return (
    <>
      <Sidenav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Announcement" src="./images/Announcement-dash.svg" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="options-tablist">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                All
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Your Posts
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "15px 0", height: "100%" }}
          >
            <ScrollArea.Root className="ScrollAreaRoot">
              <ScrollArea.Viewport className="ScrollAreaViewport">
                <div className="approved-list">
                  {announcements
                    .filter(
                      (announcement) => announcement.status === "Approved"
                    )
                    .map((announcement, index) => {
                      const userDetails = userDetailsMap[announcement.uid];
                      if (userDetails) {
                        return (
                          <div
                            className="approved-announcement d-flex flex-row flex-nowrap"
                            key={index}
                          >
                            <div className="avatar">
                              <Avatar.Root className="AvatarRoot-ann">
                                <Avatar.Fallback
                                  className="AvatarFallback-ann"
                                  style={{ backgroundColor: "#B3B3B3" }}
                                >
                                  {`${userDetails.fname.charAt(
                                    0
                                  )}${userDetails.lname.charAt(0)}`}
                                </Avatar.Fallback>
                              </Avatar.Root>
                            </div>
                            <div
                              className="d-flex flex-column"
                              style={{ width: "100%" }}
                            >
                              <div className="name d-flex flex-row justify-content-between">
                                <p className="fw-bold">
                                  {userDetails &&
                                    `${userDetails.fname} ${userDetails.lname} `}
                                  <span>
                                    @{userDetails && userDetails.email}
                                  </span>
                                </p>
                                <p>{announcement.date}</p>
                              </div>
                              <p className="fw-bold">{announcement.title}</p>
                              <p>{announcement.content}</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
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
            style={{ padding: "15px 0", height: "100%" }}
          >
            <div className="approved-list">
              {announcements
                .filter((announcement) => announcement.status === "Approved")
                .map((announcement) => {
                  const userDetails = userDetailsMap[announcement.uid];
                  if (userDetails) {
                    return (
                      userDetails.uid === user.uid && (
                        <ContextMenu.Root>
                          <ContextMenu.Trigger>
                            <div
                              className="approved-announcement d-flex flex-row flex-nowrap"
                              key={announcement.aid}
                            >
                              <div className="avatar">
                                <Avatar.Root className="AvatarRoot-ann">
                                  <Avatar.Fallback
                                    className="AvatarFallback-ann"
                                    style={{ backgroundColor: "#B3B3B3" }}
                                  >
                                    {`${userDetails.fname.charAt(
                                      0
                                    )}${userDetails.lname.charAt(0)}`}
                                  </Avatar.Fallback>
                                </Avatar.Root>
                              </div>
                              <div
                                className="d-flex flex-column"
                                style={{ width: "100%" }}
                              >
                                <div className="name d-flex flex-row justify-content-between">
                                  <p className="fw-bold">
                                    {userDetails &&
                                      `${userDetails.fname} ${userDetails.lname} `}
                                    <span>
                                      @{userDetails && userDetails.email}
                                    </span>
                                  </p>
                                  <p>{announcement.date}</p>
                                </div>
                                <p className="fw-bold">{announcement.title}</p>
                                <p>{announcement.content}</p>
                              </div>
                            </div>
                          </ContextMenu.Trigger>
                          <ContextMenuPortalPosts
                            text="Announcement"
                            entity={announcement}
                            id={announcement.aid}
                            deletePost={deleteAnnouncement}
                            editPost={editAnnouncement}
                          />
                        </ContextMenu.Root>
                      )
                    );
                  }
                  return null;
                })}
            </div>
          </Tabs.Content>
        </Tabs.Root>
        <Fab
          aria-label="add"
          className="position-absolute bottom-0 end-0 m-5"
          sx={{
            height: "70px",
            width: "70px",
          }}
          onClick={handleClickOpen}
        >
          <AddIcon sx={{ color: "#374151", height: "40px", width: "40px" }} />
        </Fab>
        <React.Fragment>
          <Dialog open={open} onClose={handleClose} fullWidth="lg">
            <DialogTitle id="alert-dialog-title" className="fw-bold">
              Create Announcement
            </DialogTitle>
            <DialogContent sx={{ padding: "0 24px" }}>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="announcement-title">
                  Announcement Title
                </label>
                <TextField
                  className="dialog-input"
                  id="announcement-title"
                  value={a_title}
                  onChange={(e) => {
                    setA_title(e.target.value);
                  }}
                  size="small"
                  // autoComplete="off"
                  required
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
                  value={a_content}
                  onChange={(e) => {
                    setA_content(e.target.value);
                  }}
                  multiline
                  rows={3}
                  // autoComplete="off"
                  required
                />
              </div>
            </DialogContent>

            <DialogActions sx={{ padding: "0 24px", margin: "10px 0" }}>
              <button
                className="Button green"
                id="cancel-button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="Button green" onClick={saveAnnouncement}>
                Save
              </button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>

      <React.Fragment>
        <Dialog
          open={showAlertDialog}
          onClose={handleAlertDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Reminder</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your announcement has been submitted for verification. We'll
              notify you once it's approved and live. Thank you for your
              patience!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="Button-alert mauve"
              onClick={handleAlertDialogClose}
              autoFocus
            >
              Okay
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Announcement;
