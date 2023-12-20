import React, { useState } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import TextField from "@mui/material/TextField";

const ContextMenuPortalPosts = ({ entity, editPost, deletePost, text, id }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [editedPosts, setEditedPosts] = useState({
    title: entity.title,
    content: entity.content,
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
              {`Edit ${text}`}
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
                  value={editedPosts.title}
                  onChange={(e) =>
                    setEditedPosts({
                      ...editedPosts,
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
                  Content
                </label>
                <TextField
                  className="dialog-input"
                  name="description"
                  id="outlined-multiline-static"
                  value={editedPosts.content}
                  onChange={(e) =>
                    setEditedPosts({
                      ...editedPosts,
                      content: e.target.value,
                    })
                  }
                  multiline
                  rows={3}
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
                    editPost(id, editedPosts);
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
              post and remove its data from our servers.
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
                    deletePost(id);
                    handleCloseDialog();
                  }}
                >
                  Yes, delete post
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default ContextMenuPortalPosts;
