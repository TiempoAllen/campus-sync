import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import "../Dashboard/Dashboard.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { DialogActions, DialogContent, Dialog } from "@mui/material";
import dayjs from "dayjs";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleIcon from "@mui/icons-material/People";
import Divider from "@mui/material/Divider";

const AdminEvent = () => {
  const { user } = useAuth();
  const [events, setAllEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState([]);
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);

  const handleOpenDetails = (index) => {
    setOpenDetailsIndex(index);
  };

  const handleCloseDetails = () => {
    setOpenDetailsIndex(null);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/event/deleteEvent/${eventId}`
      );
      console.log(response.data);
      getAllEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/event/getAllEvents"
      );
      setAllEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <AdminSideNav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <div className="d-flex flex-row" id="header">
          <img
            src="/images/Event-dash.svg"
            alt="event-logo"
            className="img-dash"
          />
          <div className="titles d-flex flex-column">
            <h2>Event</h2>
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
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "0" }}
          >
            {events.map((event, index) => (
              <React.Fragment key={index}>
                <div
                  className="events my-3 d-flex flex-row align-items-center justify-content-start bg-light"
                  onClick={() => handleOpenDialog(index)}
                >
                  {openDetailsIndex === index ? (
                    <>
                      <div className="date d-flex flex-column justify-content-center mx-5">
                        <p style={{ fontSize: "24px", marginBottom: "0" }}>
                          {dayjs(event.date).format("DD")}
                        </p>
                        <p style={{ fontSize: "18px", marginBottom: "0" }}>
                          {dayjs(event.date).format("MMM")}
                        </p>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ width: "1px", backgroundColor: "#424242" }}
                      />
                      <div className="contents d-flex flex-row justify-content-between align-items-center ps-3">
                        <div className="event-info">
                          <p
                            style={{ fontSize: "15px", color: "#17A1FA" }}
                            className="fw-bold"
                          >
                            {event.location}
                          </p>
                          <p style={{ fontSize: "20px" }} className="fw-bold">
                            {event.title}
                          </p>
                          <p style={{ fontSize: "14px" }}>
                            {event.description}
                          </p>
                          <div
                            className="d-flex flex-row align-items-center"
                            style={{ marginTop: "5px" }}
                          >
                            <PeopleIcon sx={{ marginRight: "5px" }} />
                            <p style={{ fontSize: "14px" }}>
                              {event.participants}
                            </p>
                          </div>
                        </div>
                        {openDetailsIndex === index ? (
                          <div onClick={handleCloseDetails}>
                            <ArrowBackIosIcon sx={{ color: "#424242" }} />
                          </div>
                        ) : (
                          <div onClick={() => handleOpenDetails(index)}>
                            <ArrowForwardIosIcon sx={{ color: "#424242" }} />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="date d-flex flex-column justify-content-center mx-5">
                        <p style={{ fontSize: "24px", marginBottom: "0" }}>
                          {dayjs(event.date).format("DD")}
                        </p>
                        <p style={{ fontSize: "18px", marginBottom: "0" }}>
                          {dayjs(event.date).format("MMM")}
                        </p>
                      </div>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ width: "1px", backgroundColor: "#424242" }}
                      />
                      <div className="contents d-flex flex-row justify-content-between align-items-center ps-3">
                        <div className="event-info">
                          <p
                            style={{ fontSize: "15px", color: "#17A1FA" }}
                            className="fw-bold"
                          >
                            {event.location}
                          </p>
                          <p style={{ fontSize: "20px" }} className="fw-bold">
                            {event.title}
                          </p>
                          <p style={{ fontSize: "14px" }}>
                            {event.description
                              .split(" ")
                              .slice(0, 14)
                              .join(" ")}
                            {event.description &&
                              event.description.split(" ").length > 10 &&
                              "..."}
                          </p>
                        </div>
                        {openDetailsIndex === index ? (
                          <div onClick={handleCloseDetails}>
                            <ArrowBackIosIcon
                              sx={{ color: "#424242", cursor: "pointer" }}
                            />
                          </div>
                        ) : (
                          <div onClick={() => handleOpenDetails(index)}>
                            <ArrowForwardIosIcon
                              sx={{ color: "#424242", cursor: "pointer" }}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <Dialog
                  open={dialogOpen[index] || false}
                  onClose={() => handleCloseDialog(index)}
                  fullWidth="lg"
                >
                  <DialogContent sx={{ padding: "24px 24px 0 24px" }}>
                    <div
                      className="d-flex flex-column align-items-start justify-content-start"
                      style={{ marginBottom: "15px" }}
                    >
                      <label className="Label" htmlFor="announcement-title">
                        Event Title
                      </label>
                      <TextField
                        className="dialog-input"
                        id="title"
                        required
                        defaultValue={event.title}
                        readOnly
                      />
                    </div>
                    <div
                      className="d-flex flex-column align-items-start justify-content-start"
                      style={{ marginBottom: "15px" }}
                    >
                      <label className="Label" htmlFor="description">
                        Description
                      </label>
                      <TextField
                        className="dialog-input"
                        id="content"
                        required
                        defaultValue={event.description}
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
                        Location
                      </label>
                      <TextField
                        className="dialog-input"
                        id="location"
                        required
                        defaultValue={event.location}
                        readOnly
                        size="small"
                      />
                    </div>
                    <div
                      className="d-flex flex-column align-items-start justify-content-start"
                      style={{ marginBottom: "15px" }}
                    >
                      <label className="Label" htmlFor="location">
                        Date
                      </label>
                      <TextField
                        className="dialog-input"
                        id="date"
                        defaultValue={event.date}
                        readOnly
                        size="small"
                      />
                    </div>
                    <div
                      className="d-flex flex-column align-items-start justify-content-start"
                      style={{ marginBottom: "15px" }}
                    >
                      <label className="Label" htmlFor="location">
                        Participants
                      </label>
                      <TextField
                        className="dialog-input"
                        id="participants"
                        defaultValue={event.participants}
                        readOnly
                        size="small"
                      />
                    </div>
                  </DialogContent>
                  <DialogActions sx={{ padding: "0 24px", margin: "10px 0" }}>
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
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => {
                            deleteEvent(event.eventID);
                            handleCloseDialog(index);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            ))}
            {events.length === 0 && (
              <h1 className="text-center my-3">No events</h1>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AdminEvent;
