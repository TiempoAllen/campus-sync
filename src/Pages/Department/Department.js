import React, { useEffect, useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import * as Tabs from "@radix-ui/react-tabs";
import { useAuth } from "../../AuthContext";
import TextField from "@mui/material/TextField";
import * as Avatar from "@radix-ui/react-avatar";
import dayjs from "dayjs";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import ContextMenuPortalPosts from "../Components/ContextMenuPortalPosts";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Department = () => {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  const getAllDepartmentPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/department/getAllDepartment"
      );
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const editDepartment = async (deptID, editedDepartment) => {
    try {
      const updatedDepartment = {
        title: editedDepartment.title,
        content: editedDepartment.content,
      };
      const response = await axios.put(
        `http://localhost:8080/department/updateDepartment?deptID=${deptID}`,
        updatedDepartment
      );
      getAllDepartmentPosts();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (deptID) => {
    try {
      await axios.delete(
        `http://localhost:8080/department/deleteDepartment/${deptID}`
      );
      getAllDepartmentPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const addDepartment = async () => {
    try {
      await axios.post("http://localhost:8080/department/addDepartment", {
        title: title,
        content: content,
        date: currentDate,
        uid: user.uid,
      });
      setTitle("");
      setContent("");
      getAllDepartmentPosts();
      handleClose();
      setShowAlertDialog(true);
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

  useEffect(() => {
    getAllDepartmentPosts();

    const fetchUserDetails = async () => {
      const userDetailsMapCopy = { ...userDetailsMap };

      for (const department of departments) {
        if (!userDetailsMapCopy[department.uid]) {
          const userDetails = await getUserDetails(department.uid);
          userDetailsMapCopy[department.uid] = userDetails;
        }
      }

      setUserDetailsMap(userDetailsMapCopy);
    };

    fetchUserDetails();
  }, [departments]);

  return (
    <>
      <Sidenav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Department" src="./images/Department-dash.svg" />
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
            style={{ padding: "10px 0" }}
          >
            <div className="approved-list">
              {departments
                .filter((department) => department.status === "Approved")
                .map((department, index) => {
                  const userDetails = userDetailsMap[department.uid];
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
                              <span>@{userDetails && userDetails.email}</span>
                            </p>
                            <p>{department.date}</p>
                          </div>
                          <p className="fw-bold">{department.title}</p>
                          <p>{department.content}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              {departments.filter(
                (department) => department.status === "Approved"
              ).length === 0 && (
                <h1 className="text-center">No announcements</h1>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab2"
            style={{ padding: "10px 0" }}
          >
            <div className="approved-list">
              {departments
                .filter((department) => department.status === "Approved")
                .map((department) => {
                  const userDetails = userDetailsMap[department.uid];
                  if (userDetails) {
                    return (
                      userDetails.uid === user.uid && (
                        <ContextMenu.Root>
                          <ContextMenu.Trigger>
                            <div
                              className="approved-announcement d-flex flex-row flex-nowrap"
                              key={department.deptID}
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
                                  <p>{department.date}</p>
                                </div>
                                <p className="fw-bold">{department.title}</p>
                                <p>{department.content}</p>
                              </div>
                            </div>
                          </ContextMenu.Trigger>
                          <ContextMenuPortalPosts
                            text="Department"
                            entity={department}
                            id={department.deptID}
                            deletePost={deleteDepartment}
                            editPost={editDepartment}
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
              Create Department Post
            </DialogTitle>
            <DialogContent sx={{ padding: "0 24px" }}>
              <div
                className="d-flex flex-column align-items-start justify-content-start"
                style={{ marginBottom: "15px" }}
              >
                <label className="Label" htmlFor="event-title">
                  Title
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
                  Content
                </label>
                <TextField
                  className="dialog-input"
                  id="outlined-multiline-static"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
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
              <button className="Button green" onClick={addDepartment}>
                Save
              </button>
              {/* </div>
              </div> */}
            </DialogActions>
          </Dialog>
        </React.Fragment>

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
                Your post has been submitted for verification. We'll notify you
                once it's approved and live. Thank you for your patience!
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
      </div>
    </>
  );
};

export default Department;
