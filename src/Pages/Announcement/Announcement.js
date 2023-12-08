import React, { useEffect, useState } from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import * as Avatar from "@radix-ui/react-avatar";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const Announcement = () => {
  const { user } = useAuth();
  const [a_title, setA_title] = useState("");
  const [a_content, setA_content] = useState("");
  const [a_author, setA_Author] = useState("");
  const [date_posted, setDate_Posted] = useState("");
  const [expiry_date, setExpiry_Date] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [announcements, setAnnouncement] = useState([]);

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

  useEffect(() => {
    approvedAnnouncement();
  }, []);

  const saveAnnouncement = async () => {
    if (!a_title || !a_content || !a_author || !date_posted || !expiry_date) {
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
      setIsAlertDialogOpen(true);
    } catch (error) {
      console.error(error.response.data.message);
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
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "15px 0" }}
          >
            {/* <h1 className="text-center">No announcements</h1> */}
            <div className="approved-list">
              {announcements
                .filter((announcement) => announcement.status === "Approved")
                .map((announcement, index) => (
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
                          JD
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </div>
                    <div
                      className="d-flex flex-column"
                      style={{ width: "100%" }}
                    >
                      <div className="name d-flex flex-row justify-content-between">
                        <p className="fw-bold">
                          {announcement.author}{" "}
                          <span>@{announcement.author}</span>
                        </p>
                        <p>{announcement.date_posted}</p>
                      </div>
                      <p className="fw-bold">{announcement.title}</p>
                      <p>{announcement.content}</p>
                      <div
                        className="d-flex justify-content-end"
                        style={{ width: "100%" }}
                      >
                        <img
                          src="/images/comment.svg"
                          alt="comment"
                          style={{ width: "20px", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
      <AlertDialog.Root
        open={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
      >
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle fw-bold">
            Reminder
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Your announcement has been submitted for verification. We'll notify
            you once it's approved and live. Thank you for your patience!
          </AlertDialog.Description>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <button
                className="Button-alert mauve"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Okay
              </button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default Announcement;
