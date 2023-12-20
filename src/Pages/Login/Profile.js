import React, { useEffect, useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import { useAuth } from "../../AuthContext";
import * as Avatar from "@radix-ui/react-avatar";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleOpenDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const getUserDetails = async (uid) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getUserById/${uid}`
      );
      setAccount(response.data);
      setEditedUser({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        password: response.data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails(user.uid);
  }, [user.uid]);

  const editProfile = async (uid, editedUser) => {
    try {
      const updatedUser = {
        fname: editedUser.fname,
        lname: editedUser.lname,
        email: editedUser.email,
        password: editedUser.password,
      };
      const response = await axios.put(
        `http://localhost:8080/user/updateUser?uid=${uid}`,
        updatedUser
      );
      alert("Account successfully updated!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (uid) => {
    try {
      await axios.delete(`http://localhost:8080/user/deleteUser/${uid}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidenav user={user} />
      <div className="dashboard-options d-flex flex-column">
        <div className="mx-3">
          <h2 className="fw-bold" style={{ marginBottom: "0" }}>
            Account Settings
          </h2>
          <p>Edit your name, password etc.</p>
        </div>
        <div className="profile-page bg-light d-flex flex-row justify-content-between">
          <div
            className="avatar-profile d-flex flex-column justify-content-start align-items-center"
            style={{ width: "30%" }}
          >
            <Avatar.Root className="AvatarRoot-profile">
              <Avatar.Fallback
                className="AvatarFallback-profile"
                style={{ backgroundColor: "#B3B3B3" }}
              >
                {`${user.fname.charAt(0)}${user.lname.charAt(0)}`}
              </Avatar.Fallback>
            </Avatar.Root>
            <h4 className="my-3">Profile Picture</h4>
          </div>
          <div className="d-flex flex-column" style={{ width: "80%" }}>
            <div
              className="d-flex flex-column align-items-start justify-content-start"
              style={{ marginBottom: "15px" }}
            >
              <label className="Label" htmlFor="event-title">
                First Name
              </label>
              <TextField
                className="dialog-input"
                id="event-title"
                name="fname"
                value={editedUser.fname}
                size="small"
                onChange={handleInputChange}
                // autoComplete="off"
                required
              />
            </div>
            <div
              className="d-flex flex-column align-items-start justify-content-start"
              style={{ marginBottom: "15px" }}
            >
              <label className="Label" htmlFor="description">
                Last Name
              </label>
              <TextField
                className="dialog-input"
                id="outlined-multiline-static"
                name="lname"
                value={editedUser.lname}
                size="small"
                onChange={handleInputChange}
                // autoComplete="off"
                required
              />
            </div>
            <div
              className="d-flex flex-column align-items-start justify-content-start"
              style={{ marginBottom: "15px" }}
            >
              <label className="Label" htmlFor="location">
                Email
              </label>
              <TextField
                className="dialog-input"
                id="location"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                size="small"
                // autoComplete="off"
                required
              />
            </div>
            <div
              className="d-flex flex-column align-items-start justify-content-start"
              style={{ marginBottom: "15px" }}
            >
              <label className="Label" htmlFor="participants">
                Password
              </label>
              <TextField
                type="password"
                className="dialog-input"
                id="participants"
                name="password"
                value={editedUser.password}
                onChange={handleInputChange}
                size="small"
                // autoComplete="off"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <p
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleOpenDialog}
              >
                Delete Account?
              </p>
            </div>
            <div className="profile-buttons d-flex flex-row justify-content-between align-items-center my-4">
              <button
                className="Button green"
                id="cancel-button"
                style={{ width: "40%" }}
              >
                Cancel
              </button>
              <button
                className="Button green"
                style={{ width: "40%" }}
                onClick={() => editProfile(user.uid, editedUser)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

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
              account and remove its data from our servers.
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
                    deleteUser(user.uid);
                    navigate("/login");
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

export default Profile;
