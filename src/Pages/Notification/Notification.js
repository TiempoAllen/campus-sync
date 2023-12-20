import React, { useEffect, useState } from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import * as Tabs from "@radix-ui/react-tabs";
import { useAuth } from "../../AuthContext";
import "./Notification.css";
import axios from "axios";
import AddTaskIcon from "@mui/icons-material/AddTask";
import dayjs from "dayjs";

const Notification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

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
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No notifications for today</h1>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default Notification;
