import React, { useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import TextField from "@mui/material/TextField";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import "./Event.css";
import { useAuth } from "../../AuthContext";
import * as Separator from "@radix-ui/react-separator";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const getDate = () => {
  const today = new Date();

  const options = {
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-us", options);
};

const Event = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [participants, setParticipants] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addEvent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/event/addEvent",
        {
          title: title,
          desc: desc,
          location: location,
          date: date?.format("MM/DD/YYYY"),
          // date: date,
          participants: participants,
        }
      );
      console.log(response.data);
      setTitle("");
      setDesc("");
      setLocation("");
      setDate(null);
      setParticipants("");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <>
      <Sidenav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Event" src="./images/Event-dash.svg" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="options-tablist">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                All
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Today
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                Upcoming
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "0" }}
          >
            {/* <h1 className="text-center">No scheduled events</h1> */}
            <div className="events my-3 px-3 d-flex flex-row align-items-center justify-content-start bg-light">
              <div className="date d-flex flex-column justify-content-center mx-2">
                <p style={{ fontSize: "20px", marginBottom: "0" }}>16</p>
                <p style={{ fontSize: "16px", marginBottom: "0" }}>Nov</p>
              </div>
              <Separator.Root
                className="SeparatorRoot"
                id="separator-event"
                decorative
                orientation="vertical"
                style={{ margin: "0 15px" }}
              />
              <div className="contents d-flex flex-row justify-content-between ps-3">
                <div className="event-info">
                  <p style={{ fontSize: "18px" }} className="fw-bold">
                    Acquaintance Party
                  </p>
                  <p style={{ fontSize: "13px" }}>University Gymnasium</p>
                </div>
                <img
                  src="/images/options.svg"
                  alt="options-image"
                  style={{
                    height: "40px",
                    width: "40px",
                  }}
                />
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No scheduled events for today</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab3">
            <h1 className="text-center">No upcoming events</h1>
          </Tabs.Content>
        </Tabs.Root>
        <React.Fragment>
          <Fab
            aria-label="add"
            className="position-absolute bottom-0 end-0"
            sx={{
              height: "70px",
              width: "70px",
              margin: "50px 80px",
            }}
            onClick={handleClickOpen}
          >
            <AddIcon sx={{ color: "#374151", height: "40px", width: "40px" }} />
          </Fab>
          <Dialog open={open} onClose={handleClose} fullWidth="lg">
            <DialogTitle id="alert-dialog-title" className="fw-bold">
              Create Event
            </DialogTitle>
            <DialogContent sx={{ padding: "0 24px" }}>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="event-title">
                  Event Title
                </label>
                <TextField
                  className="dialog-input"
                  id="event-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
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
                  Description
                </label>
                <TextField
                  className="dialog-input"
                  id="outlined-multiline-static"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  multiline
                  rows={3}
                  // autoComplete="off"
                  required
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
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
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
                <label className="Label" htmlFor="date">
                  Date
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker"]}
                    sx={{ width: "100%", margin: "0" }}
                  >
                    <DatePicker
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="participants">
                  Participants
                </label>
                <TextField
                  className="dialog-input"
                  id="participants"
                  value={participants}
                  onChange={(e) => {
                    setParticipants(e.target.value);
                  }}
                  size="small"
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
              <button className="Button green" onClick={addEvent}>
                Save
              </button>
              {/* </div>
              </div> */}
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </>
  );
};

export default Event;
