import React from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import "./Event.css";
import { useAuth } from "../../AuthContext";

const Event = () => {
  const { user } = useAuth();
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
          <Tabs.Content className="TabsContent" value="tab1">
            <h1 className="text-center">No scheduled events</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No scheduled events for today</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab3">
            <h1 className="text-center">No upcoming events</h1>
          </Tabs.Content>
        </Tabs.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Fab
              aria-label="add"
              className="position-absolute bottom-0 end-0"
              sx={{
                height: "70px",
                width: "70px",
                margin: "50px 80px",
              }}
            >
              <AddIcon
                sx={{ color: "#374151", height: "40px", width: "40px" }}
              />
            </Fab>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle fw-bold">
                Create Event
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Create and schedule a school event.
              </Dialog.Description>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="event-title">
                  Event Title
                </label>
                <input className="Input" id="event-title" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="description">
                  Description
                </label>
                <input className="Input" id="description" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="location">
                  Location
                </label>
                <input className="Input" id="location" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="date-time">
                  Date and Time
                </label>
                <input className="Input" id="date-time" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="participants">
                  Participants
                </label>
                <input className="Input" id="participants" />
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
                    <button className="Button green" id="cancel-button">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button className="Button green">Save</button>
                  </Dialog.Close>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
};

export default Event;
