import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../Dashboard/Dashboard.css";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PeopleIcon from "@mui/icons-material/People";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const getDate = () => {
  const today = new Date();

  const options = {
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-us", options);
};

const day = new Date().toLocaleDateString("en-US", { day: "numeric" });

const weekday = new Date().toLocaleDateString("en-US", { weekday: "long" });

const date = getDate();

const Body = ({ user }) => {
  const [events, setEvents] = useState([]);
  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  const [combinedPosts, setCombinedPosts] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

  const getAllRecentPosts = async () => {
    try {
      const announcementsResponse = await axios.get(
        "http://localhost:8080/announcement/getAllAnnouncements"
      );
      const departmentPostsResponse = await axios.get(
        "http://localhost:8080/department/getAllDepartment"
      );

      // Combine both sets of posts
      const combined = [
        ...announcementsResponse.data,
        ...departmentPostsResponse.data,
      ];
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));

      setCombinedPosts(combined);
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
    getAllRecentPosts();
    getEvents();

    const fetchUserDetails = async () => {
      const userDetailsMapCopy = { ...userDetailsMap };

      for (const combinedPost of combinedPosts) {
        if (!userDetailsMapCopy[combinedPost.uid]) {
          const userDetails = await getUserDetails(combinedPost.uid);
          userDetailsMapCopy[combinedPost.uid] = userDetails;
        }
      }

      setUserDetailsMap(userDetailsMapCopy);
    };

    fetchUserDetails();
  }, [combinedPosts]);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/event/getAllEvents"
      );
      setEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = dayjs(event.date);
      return (
        !eventDate.isSame(today, "day") &&
        !eventDate.isSame(yesterday, "day") &&
        eventDate.isAfter(today)
      );
    })
    .slice(0, 1);

  return (
    <div
      className="body d-flex flex-row flex-grow-1"
      style={{ minHeight: "100vh", maxHeight: "100%" }}
    >
      <div className="center" style={{ height: "100%" }}>
        <div className="greetings">
          <div id="first-half">
            <div className="date">
              <p style={{ marginBottom: "0px" }}>
                <CalendarTodayIcon
                  sx={{
                    height: "20px",
                    width: "20px",
                    margin: "0px 5px 3px 0px",
                  }}
                />
                {date} {weekday}
              </p>
            </div>
            <p style={{ marginBottom: "0", wordWrap: "break-word" }}>
              <span className="h2 fw-bold">Good Day, {user.fname}!</span>
              <br />
              <span>Have a nice {weekday}!</span>
            </p>
          </div>
          <div id="second-half">
            <img
              src="/images/student.svg"
              alt="student-logo"
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        </div>

        <div className="recent-posts my-3" style={{ height: "100%" }}>
          <p className="fs-5 fw-bold my-3">Most recent posts</p>
          <div className="temp-posts" style={{ height: "100%" }}>
            {combinedPosts.length === 0 ? (
              <h1>No posts</h1>
            ) : (
              combinedPosts
                .filter((combinedPost) => combinedPost.status === "Approved")
                .map((combinedPost, index) => {
                  const userDetails = userDetailsMap[combinedPost.uid];
                  if (userDetails) {
                    return (
                      <ScrollArea.Root className="ScrollAreaRoot">
                        <ScrollArea.Viewport className="ScrollAreaViewport">
                          <div
                            className="post d-flex flex-row flex-nowrap"
                            key={index}
                            style={{ height: "100%" }}
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
                                <p>{combinedPost.date}</p>
                              </div>
                              <p className="fw-bold">{combinedPost.title}</p>
                              <p>{combinedPost.content}</p>
                            </div>
                          </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                          className="ScrollAreaScrollbar"
                          orientation="vertical"
                        >
                          <ScrollArea.Thumb className="ScrollAreaThumb" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Scrollbar
                          className="ScrollAreaScrollbar"
                          orientation="horizontal"
                        >
                          <ScrollArea.Thumb className="ScrollAreaThumb" />
                        </ScrollArea.Scrollbar>
                        <ScrollArea.Corner className="ScrollAreaCorner" />
                      </ScrollArea.Root>
                    );
                  }
                  return null;
                })
            )}
          </div>
        </div>
      </div>

      <div className="sides">
        <header className="calendar-events mb-3">
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

          <div className="calendar">
            <p className="h4 fw-bold">Calendar</p>
            <p>No event this month</p>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </div>
          </div>

          <div className="upcoming-events mt-3">
            <p className="h5 fw-bold">Upcoming Events</p>
            {upcomingEvents.length === 0 ? (
              <h1 className="text-center">No upcoming events</h1>
            ) : (
              upcomingEvents.map((event, index) => (
                <Link
                  to="/event"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="events my-3 d-flex flex-row align-items-center justify-content-start bg-light"
                    key={index}
                  >
                    <div className="date d-flex flex-column justify-content-center mx-5">
                      <p style={{ fontSize: "24px", marginBottom: "0" }}>
                        {dayjs(event.date).format("DD")}
                      </p>
                      <p style={{ fontSize: "18px", marginBottom: "0" }}>
                        {dayjs(event.date).format("MMM")}
                      </p>
                    </div>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ width: "1px", backgroundColor: "#424242" }}
                    />
                    <div className="contents d-flex flex-row justify-content-between align-items-center ps-3">
                      <div className="event-info">
                        <p
                          style={{ fontSize: "15px", color: "#17A1FA" }}
                          className="fw-bold"
                        >
                          {event.location}
                        </p>
                        <p style={{ fontSize: "20px" }} className="fw-bold">
                          {event.title}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          {event.description.split(" ").slice(0, 4).join(" ")}
                          {event.description &&
                            event.description.split(" ").length > 10 &&
                            "..."}
                        </p>
                        <div
                          className="d-flex flex-row align-items-center"
                          style={{ marginTop: "5px" }}
                        >
                          <PeopleIcon sx={{ marginRight: "5px" }} />
                          <p style={{ fontSize: "14px" }}>
                            {event.participants}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ArrowForwardIosIcon sx={{ color: "#424242" }} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Body;
