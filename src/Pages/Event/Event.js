import React, { useEffect, useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import * as ContextMenu from "@radix-ui/react-context-menu";
import TextField from "@mui/material/TextField";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import "./Event.css";
import { useAuth } from "../../AuthContext";
import Divider from "@mui/material/Divider";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleIcon from "@mui/icons-material/People";
import ContextMenuPortal from "../Components/ContextMenuPortal";

const Event = () => {
  const today = dayjs();
  const yesterday = today.subtract(1, "day");

  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [participants, setParticipants] = useState("");
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [openDetailsIndex, setOpenDetailsIndex] = useState(null);

  const handleOpenDetails = (index) => {
    setOpenDetailsIndex(index);
  };

  const handleCloseDetails = () => {
    setOpenDetailsIndex(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/event/getAllEvents"
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const addEvent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/event/addEvent",
        {
          title: title,
          description: description,
          location: location,
          date: date?.format("MM/DD/YYYY"),
          participants: participants,
          uid: "1",
        }
      );
      console.log(response.data);
      setTitle("");
      setDesc("");
      setLocation("");
      setDate(null);
      setParticipants("");
      getEvents();
      handleClose();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const editEvent = async (eventID, editedEvent) => {
    try {
      const updatedEvent = {
        title: editedEvent.title,
        description: editedEvent.description,
        location: editedEvent.location,
        date: dayjs(editedEvent.date).format("MM/DD/YYYY"),
        participants: editedEvent.participants,
      };
      const response = await axios.put(
        `http://localhost:8080/event/updateEvent?eventID=${eventID}`,
        updatedEvent
      );
      getEvents();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (eventID) => {
    try {
      await axios.delete(`http://localhost:8080/event/deleteEvent/${eventID}`);
      getEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const todayEvents = events.filter((event) => {
    const eventDate = dayjs(event.date);
    return (
      eventDate.isSame(today, "day") ||
      (eventDate.isAfter(today.startOf("day")) &&
        eventDate.isBefore(today.endOf("day")))
    );
  });

  const upcomingEvents = events.filter((event) => {
    const eventDate = dayjs(event.date);
    return (
      !eventDate.isSame(today, "day") &&
      !eventDate.isSame(yesterday, "day") &&
      eventDate.isAfter(today)
    );
  });

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
            {events.map((event, index) => (
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <div
                    className="events my-3 d-flex flex-row align-items-center justify-content-start bg-light"
                    key={index}
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
                </ContextMenu.Trigger>
                <ContextMenuPortal
                  event={event}
                  deleteEvent={deleteEvent}
                  editEvent={editEvent}
                />
              </ContextMenu.Root>
            ))}
            {events.length === 0 && (
              <h1 className="text-center" style={{ marginTop: "20px" }}>
                No events
              </h1>
            )}
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab2"
            style={{ padding: "0" }}
          >
            {todayEvents.length === 0 ? (
              <h1 className="text-center">No events today</h1>
            ) : (
              todayEvents.map((event, index) => (
                <ContextMenu.Root>
                  <ContextMenu.Trigger>
                    <div
                      className="events my-3 d-flex flex-row align-items-center justify-content-start bg-light"
                      key={index}
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
                              <p
                                style={{ fontSize: "20px" }}
                                className="fw-bold"
                              >
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
                                <ArrowForwardIosIcon
                                  sx={{ color: "#424242" }}
                                />
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
                              <p
                                style={{ fontSize: "20px" }}
                                className="fw-bold"
                              >
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
                  </ContextMenu.Trigger>
                  <ContextMenuPortal
                    event={event}
                    deleteEvent={deleteEvent}
                    editEvent={editEvent}
                  />
                </ContextMenu.Root>
              ))
            )}
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab3"
            style={{ padding: "0" }}
          >
            {upcomingEvents.length === 0 ? (
              <h1 className="text-center">No upcoming events</h1>
            ) : (
              upcomingEvents.map((event, index) => (
                <ContextMenu.Root>
                  <ContextMenu.Trigger>
                    <div
                      className="events my-3 d-flex flex-row align-items-center justify-content-start bg-light"
                      key={index}
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
                              <p
                                style={{ fontSize: "20px" }}
                                className="fw-bold"
                              >
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
                                <ArrowForwardIosIcon
                                  sx={{ color: "#424242" }}
                                />
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
                              <p
                                style={{ fontSize: "20px" }}
                                className="fw-bold"
                              >
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
                  </ContextMenu.Trigger>
                  <ContextMenuPortal
                    event={event}
                    deleteEvent={deleteEvent}
                    editEvent={editEvent}
                  />
                </ContextMenu.Root>
              ))
            )}
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
                  value={description}
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
