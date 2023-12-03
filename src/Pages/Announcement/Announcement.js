import React, { useState } from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "../../AuthContext";
import axios from "axios";

const Announcement = () => {
  const { user } = useAuth();
  const [a_title, setA_title] = useState("");
  const [a_content, setA_content] = useState("");
  const [a_author, setA_Author] = useState("");
  const [date_posted, setDate_Posted] = useState("");
  const [expiry_date, setExpiry_Date] = useState("");

  const saveAnnouncement = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/announcement/addAnnouncement",
        {
          title: a_title,
          content: a_content,
          author: a_author,
          date_posted: date_posted,
          expiry_date: expiry_date,
        }
      );
      console.log(response.data);
      setA_title("");
      setA_content("");
      setA_Author("");
      setDate_Posted("");
      setExpiry_Date("");
    } catch (error) {
      console.error(error);
    }
  };
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
                Today
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content className="TabsContent" value="tab1">
            <h1 className="text-center">No announcements</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No announcements for today</h1>
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
                Create Announcement
              </Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Create a school announcement.
              </Dialog.Description>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="announcement-title">
                  Announcement Title
                </label>
                <input
                  className="Input"
                  id="announcement-title"
                  value={a_title}
                  onChange={(e) => {
                    setA_title(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="content">
                  Content
                </label>
                <input
                  className="Input"
                  id="content"
                  value={a_content}
                  onChange={(e) => {
                    setA_content(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="author">
                  Author
                </label>
                <input
                  className="Input"
                  id="author"
                  value={a_author}
                  onChange={(e) => {
                    setA_Author(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="date_posted">
                  Date Posted
                </label>
                <input
                  className="Input"
                  id="date_posted"
                  value={date_posted}
                  onChange={(e) => {
                    setDate_Posted(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="expiry_date">
                  Expiry Date
                </label>
                <input
                  className="Input"
                  id="expiry_date"
                  value={expiry_date}
                  onChange={(e) => {
                    setExpiry_Date(e.target.value);
                  }}
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
                    <button className="Button green" id="cancel-button">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button className="Button green" onClick={saveAnnouncement}>
                      Save
                    </button>
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

export default Announcement;
