import React, { useEffect, useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import * as Tabs from "@radix-ui/react-tabs";
import { useAuth } from "../../AuthContext";
import "./Notification.css";
import axios from "axios";
import AddTaskIcon from "@mui/icons-material/AddTask";
import dayjs from "dayjs";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as ContextMenu from "@radix-ui/react-context-menu";

const Notification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsAlertDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAlertDialogOpen(false);
  };

  const deleteNotification = async (nid) => {
    try {
      await axios.delete(
        `http://localhost:8080/notification/deleteNotification/${nid}`
      );
      getAllNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const getAllNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/notification/getAllNotification"
      );
      setNotifications(response.data);
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
    getAllNotifications();
    const fetchUserDetails = async () => {
      const userDetailsMapCopy = { ...userDetailsMap };

      for (const notification of notifications) {
        if (!userDetailsMapCopy[notification.uid]) {
          const userDetails = await getUserDetails(notification.uid);
          userDetailsMapCopy[notification.uid] = userDetails;
        }
      }

      setUserDetailsMap(userDetailsMapCopy);
    };

    fetchUserDetails();
  }, [notifications]);

  return (
    <>
      <Sidenav user={user} />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Notification" src="./images/Notification-dash.svg" />
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
            style={{ padding: "20px 0" }}
          >
            <div className="notification-list">
              {notifications.map((notification) => {
                const userDetails = userDetailsMap[notification.uid];
                if (userDetails) {
                  return (
                    userDetails.uid === user.uid && (
                      <>
                        <ContextMenu.Root>
                          <ContextMenu.Trigger>
                            <div
                              key={notification.id}
                              className="notification d-flex flex-row"
                            >
                              <div
                                className="d-flex flex-row"
                                style={{ width: "100%" }}
                              >
                                <AddTaskIcon sx={{ marginRight: "10px" }} />
                                <div className="content d-flex flex-row justify-content-between">
                                  <div style={{ width: "90%" }}>
                                    <p>
                                      <span className="fw-bold">
                                        {notification.title}
                                      </span>{" "}
                                      : {notification.message}
                                    </p>
                                  </div>
                                  <p>
                                    {dayjs(notification.date).format(
                                      "MMM DD, YYYY"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ContextMenu.Trigger>
                          <ContextMenu.Portal>
                            <ContextMenu.Content
                              className="ContextMenuContent"
                              sideOffset={5}
                              align="end"
                            >
                              <ContextMenu.Item
                                className="ContextMenuItem"
                                id="ContextMenuItem-edit"
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
                        </ContextMenu.Root>

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
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialog.Description>
                              <div
                                style={{
                                  display: "flex",
                                  gap: 25,
                                  justifyContent: "flex-end",
                                }}
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
                                    style={{
                                      backgroundColor: "red",
                                      color: "white",
                                    }}
                                    onClick={() => {
                                      deleteNotification(notification.nid);
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
                    )
                  );
                }
                return null;
              })}
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent"
            value="tab2"
            style={{ padding: "20px 0" }}
          >
            <div className="notification-list">
              {notifications.map((notification) => {
                const userDetails = userDetailsMap[notification.uid];
                if (userDetails) {
                  return (
                    userDetails.uid === user.uid && (
                      <div
                        key={notification.id}
                        className="notification d-flex flex-row"
                      >
                        <div
                          className="d-flex flex-row"
                          style={{ width: "100%" }}
                        >
                          <AddTaskIcon sx={{ marginRight: "10px" }} />
                          <div className="content d-flex flex-row justify-content-between">
                            <div style={{ width: "90%" }}>
                              <p>
                                <span className="fw-bold">
                                  {notification.title}
                                </span>{" "}
                                : {notification.message}
                              </p>
                            </div>
                            <p>
                              {dayjs(notification.date).format("MMM DD, YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  );
                }
                return null;
              })}
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default Notification;
