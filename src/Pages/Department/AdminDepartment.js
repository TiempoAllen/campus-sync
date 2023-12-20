import React, { useEffect, useState } from "react";
import AdminSideNav from "../Dashboard/AdminSideNav";
import { useAuth } from "../../AuthContext";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import * as Tabs from "@radix-ui/react-tabs";
import axios from "axios";

const AdminDepartment = () => {
  const currentDate = dayjs().format("MM/DD/YYYY");

  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [n_title, setN_title] = useState("");
  const [n_message, setN_message] = useState("");
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [dialogOpen, setDialogOpen] = useState([]);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleAlertDialogOpen = () => {
    setShowAlertDialog(true);
  };

  const handleAlertDialogClose = () => {
    setShowAlertDialog(false);
  };
  const handleDialogOpen = (index) => {
    const newDialogOpen = [...dialogOpen];
    newDialogOpen[index] = true;
    setDialogOpen(newDialogOpen);
  };

  const handleCloseDialog = (index) => {
    const newDialogOpen = [...dialogOpen];
    newDialogOpen[index] = false;
    setDialogOpen(newDialogOpen);
  };

  const addNotification = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/notification/addNotification",
        {
          title: n_title,
          message: n_message,
          date: currentDate,
          uid: userId,
        }
      );
      handleAlertDialogClose();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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

  const deleteDepartmentPost = async (deptID) => {
    try {
      await axios.delete(
        `http://localhost:8080/department/deleteDepartment/${deptID}`
      );
      getAllDepartmentPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const approveDepartmentPost = async (deptID) => {
    try {
      await axios.put(
        `http://localhost:8080/department/updateStatus?deptID=${deptID}`,
        {
          status: "Approved",
        }
      );
      getAllDepartmentPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const returnToPending = async (deptID) => {
    try {
      await axios.put(
        `http://localhost:8080/department/updateStatus?deptID=${deptID}`,
        {
          status: "Pending",
        }
      );
      getAllDepartmentPosts();
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

  const fetchUserDetails = async () => {
    const userDetailsPromises = departments.map(async (department) => {
      if (!userDetailsMap[department.uid]) {
        const userDetails = await getUserDetails(department.uid);
        return { uid: department.uid, userDetails };
      }
      return null;
    });

    const userDetailsArray = await Promise.all(userDetailsPromises);
    const userDetailsMapCopy = { ...userDetailsMap };

    userDetailsArray.forEach((userDetailsObj) => {
      if (userDetailsObj) {
        userDetailsMapCopy[userDetailsObj.uid] = userDetailsObj.userDetails;
      }
    });

    setUserDetailsMap(userDetailsMapCopy);
  };

  useEffect(() => {
    getAllDepartmentPosts();
    fetchUserDetails();
  }, [departments]);
  return (
    <>
      <AdminSideNav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <div className="d-flex flex-row" id="header">
          <img
            src="/images/Department-dash.svg"
            alt="department-logo"
            className="img-dash"
          />
          <div className="titles d-flex flex-column">
            <h2>Department</h2>
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
                Pending
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Approved
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content
            className="TabsContent"
            value="tab1"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="announcement-list">
              {/* <h1 className="text-center">No users</h1> */}

              {departments
                .filter((department) => department.status === "Pending")
                .map((department, index) => {
                  const userDetails = userDetailsMap[department.uid];
                  if (userDetails) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="pending-announcement d-flex flex-row justify-content-between"
                          onClick={() => {
                            handleDialogOpen(index);
                          }}
                        >
                          <p>
                            {userDetails &&
                              `${userDetails.fname} ${userDetails.lname}`}
                          </p>
                          <p>
                            <span className="fw-bold">{department.title}</span>{" "}
                            -{" "}
                            {department.content
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            {department.content.split(" ").length > 5 && "..."}
                            {department.content.split(" ").length > 5 && (
                              <span
                                style={{
                                  textDecoration: "none",
                                  color: "#17A1FA",
                                  cursor: "pointer",
                                }}
                              >
                                {" "}
                                See More
                              </span>
                            )}
                          </p>
                          <p>{department.date}</p>
                        </div>
                        <Dialog
                          fullWidth="lg"
                          open={dialogOpen[index] || false}
                          onClose={() => handleCloseDialog(index)}
                        >
                          <DialogContent sx={{ padding: "24px 24px 0 24px" }}>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label
                                className="Label"
                                htmlFor="department-title"
                              >
                                Title
                              </label>
                              <TextField
                                className="dialog-input"
                                id="title"
                                required
                                defaultValue={department.title}
                                readOnly
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
                                id="content"
                                required
                                defaultValue={department.content}
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
                                Author
                              </label>
                              <TextField
                                className="dialog-input"
                                id="author"
                                required
                                defaultValue={
                                  userDetails &&
                                  `${userDetails.fname} ${userDetails.lname}`
                                }
                                readOnly
                                size="small"
                              />
                            </div>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label className="Label" htmlFor="location">
                                Date Posted
                              </label>
                              <TextField
                                className="dialog-input"
                                id="date_posted"
                                defaultValue={department.date}
                                readOnly
                                size="small"
                              />
                            </div>
                          </DialogContent>
                          <DialogActions
                            sx={{ padding: "0 24px", margin: "10px 0" }}
                          >
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
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    deleteDepartmentPost(department.deptID);
                                    handleCloseDialog(index);
                                  }}
                                >
                                  Delete
                                </button>
                                <React.Fragment>
                                  <button
                                    className="Button green"
                                    onClick={() => {
                                      handleAlertDialogOpen();
                                    }}
                                  >
                                    Approve
                                  </button>

                                  <Dialog
                                    fullWidth="lg"
                                    open={showAlertDialog}
                                    onClose={handleAlertDialogClose}
                                  >
                                    <DialogTitle
                                      id="alert-dialog-title"
                                      className="fw-bold"
                                    >
                                      Create Notification
                                    </DialogTitle>
                                    <DialogContent
                                      sx={{ padding: "24px 24px 0 24px" }}
                                    >
                                      <div
                                        className="d-flex flex-column align-items-start justify-content-start"
                                        style={{ marginBottom: "15px" }}
                                      >
                                        <label
                                          className="Label"
                                          htmlFor="department-title"
                                        >
                                          Title
                                        </label>
                                        <TextField
                                          className="dialog-input"
                                          id="title"
                                          required
                                          value={n_title}
                                          onChange={(e) => {
                                            setN_title(e.target.value);
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="d-flex flex-column align-items-start justify-content-start"
                                        style={{ marginBottom: "15px" }}
                                      >
                                        <label
                                          className="Label"
                                          htmlFor="description"
                                        >
                                          Message
                                        </label>
                                        <TextField
                                          className="dialog-input"
                                          id="content"
                                          required
                                          value={n_message}
                                          onChange={(e) => {
                                            setN_message(e.target.value);
                                          }}
                                          multiline
                                          rows={3}
                                        />
                                      </div>
                                    </DialogContent>
                                    <DialogActions
                                      sx={{
                                        padding: "0 24px",
                                        margin: "10px 0",
                                      }}
                                    >
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
                                            onClick={handleAlertDialogClose}
                                          >
                                            Cancel
                                          </button>

                                          <button
                                            className="Button green"
                                            onClick={() => {
                                              addNotification(userDetails.uid);
                                              approveDepartmentPost(
                                                department.deptID
                                              );
                                              handleAlertDialogClose();
                                              handleCloseDialog(index);
                                            }}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </DialogActions>
                                  </Dialog>
                                </React.Fragment>
                              </div>
                            </div>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              {departments.filter(
                (department) => department.status === "Pending"
              ).length === 0 && (
                <h1 className="text-center">No pending posts</h1>
              )}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab2"
            style={{ padding: "20px 0 20px 0" }}
          >
            <div className="announcement-list">
              {departments
                .filter((department) => department.status === "Approved")
                .map((department, index) => {
                  const userDetails = userDetailsMap[department.uid];
                  if (userDetails) {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className="pending-announcement d-flex flex-row justify-content-between"
                          onClick={() => {
                            handleDialogOpen(index);
                          }}
                        >
                          <p>
                            {userDetails &&
                              `${userDetails.fname} ${userDetails.lname}`}
                          </p>
                          <p>
                            <span className="fw-bold">{department.title}</span>{" "}
                            -{" "}
                            {department.content
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            {department.content.split(" ").length > 5 && "..."}
                            {department.content.split(" ").length > 5 && (
                              <span
                                style={{
                                  textDecoration: "none",
                                  color: "#17A1FA",
                                  cursor: "pointer",
                                }}
                              >
                                {" "}
                                See More
                              </span>
                            )}
                          </p>
                          <p>{department.date}</p>
                        </div>
                        <Dialog
                          fullWidth="lg"
                          open={dialogOpen[index] || false}
                          onClose={() => handleCloseDialog(index)}
                        >
                          <DialogContent sx={{ padding: "24px 24px 0 24px" }}>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label
                                className="Label"
                                htmlFor="department-title"
                              >
                                Title
                              </label>
                              <TextField
                                className="dialog-input"
                                id="title"
                                required
                                defaultValue={department.title}
                                readOnly
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
                                id="content"
                                required
                                defaultValue={department.content}
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
                                Author
                              </label>
                              <TextField
                                className="dialog-input"
                                id="author"
                                required
                                defaultValue={
                                  userDetails &&
                                  `${userDetails.fname} ${userDetails.lname}`
                                }
                                readOnly
                                size="small"
                              />
                            </div>
                            <div
                              className="d-flex flex-column align-items-start justify-content-start"
                              style={{ marginBottom: "15px" }}
                            >
                              <label className="Label" htmlFor="location">
                                Date Posted
                              </label>
                              <TextField
                                className="dialog-input"
                                id="date_posted"
                                defaultValue={department.date}
                                readOnly
                                size="small"
                              />
                            </div>
                          </DialogContent>
                          <DialogActions
                            sx={{ padding: "0 24px", margin: "10px 0" }}
                          >
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
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    deleteDepartmentPost(department.deptID);
                                    handleCloseDialog(index);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="Button green"
                                  onClick={() => {
                                    returnToPending(department.deptID);
                                    handleCloseDialog(index);
                                  }}
                                >
                                  Return to Pending
                                </button>
                              </div>
                            </div>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
              {departments.filter(
                (department) => department.status === "Approved"
              ).length === 0 && (
                <h1 className="text-center">No approved posts</h1>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default AdminDepartment;
