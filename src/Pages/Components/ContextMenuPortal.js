import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ContextMenuPortal = ({ event, editEvent, deleteEvent }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    participants: event.participants,
  });

  const handleOpenDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  return (
    <>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="ContextMenuContent"
          sideOffset={5}
          align="end"
        >
          <ContextMenu.Item
            className="ContextMenuItem"
            id="ContextMenuItem-edit"
            onClick={handleEditDialogOpen}
          >
            Edit{" "}
            <div className="Edit">
              <EditIcon />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Separator className="ContextMenuSeparator" />
          <ContextMenu.Item
            className="ContextMenuItem"
            id="ContextMenuItem-delete"
            onClick={handleOpenDialog}
          >
            Delete{" "}
            <div className="Delete">
              <DeleteIcon />
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>

      <AlertDialog.Root open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content
            className="AlertDialogContent"
            style={{ padding: "10px 0" }}
          >
            <AlertDialog.Title
              className="AlertDialogTitle"
              style={{ padding: "0 24px", fontSize: "20px", margin: "10px 0" }}
            >
              Edit Event
            </AlertDialog.Title>
            <div style={{ padding: "0 24px" }}>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="event-title">
                  Title
                </label>
                <TextField
                  className="dialog-input"
                  name="title"
                  id="event-title"
                  value={editedEvent.title}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      title: e.target.value,
                    })
                  }
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
                  name="description"
                  id="outlined-multiline-static"
                  value={editedEvent.description}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      description: e.target.value,
                    })
                  }
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
                  name="location"
                  id="outlined-multiline-static"
                  value={editedEvent.location}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      location: e.target.value,
                    })
                  }
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
                      value={editedEvent.date ? dayjs(editedEvent.date) : null}
                      name="date"
                      onChange={(date) =>
                        setEditedEvent({
                          ...editedEvent,
                          date: date,
                        })
                      }
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
                  name="participants"
                  id="outlined-multiline-static"
                  value={editedEvent.participants}
                  onChange={(e) =>
                    setEditedEvent({
                      ...editedEvent,
                      participants: e.target.value,
                    })
                  }
                  // autoComplete="off"
                  required
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 25,
                justifyContent: "flex-end",
                paddingRight: "24px",
              }}
            >
              <AlertDialog.Cancel asChild>
                <button
                  className="Button mauve"
                  onClick={handleEditDialogClose}
                  style={{
                    backgroundColor: "#212529",
                    color: "white",
                    width: "auto",
                  }}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="Button red"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() => {
                    editEvent(event.eventID, editedEvent);
                    handleEditDialogClose();
                  }}
                >
                  Save
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>

      <AlertDialog.Root
        open={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="AlertDialogOverlay" />
          <AlertDialog.Content className="AlertDialogContent">
            <AlertDialog.Title className="AlertDialogTitle fw-bold">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className="AlertDialogDescription">
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialog.Description>
            <div
              style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}
            >
              <AlertDialog.Cancel asChild>
                <button
                  className="Button mauve"
                  onClick={handleCloseDialog}
                  style={{
                    backgroundColor: "#212529",
                    color: "white",
                    width: "auto",
                  }}
                >
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="Button red"
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    deleteEvent(event.eventID);
                    handleCloseDialog();
                  }}
                >
                  Yes, delete task
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default ContextMenuPortal;
