import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import * as Separator from "@radix-ui/react-separator";

const getDate = () => {
  const today = new Date();

  const options = {
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-us", options);
};

const weekday = new Date().toLocaleDateString("en-US", { weekday: "long" });

const date = getDate();

const Body = ({ user }) => {
  return (
    <div className="body d-flex flex-row flex-grow-1">
      <div className="center">
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
        <div className="recent-posts my-3">
          <p className="fs-5 fw-bold">Most recent posts</p>
          <div className="temp-posts d-flex justify-content-center align-items-center">
            <h1>No posts</h1>
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
            <div className="todo-events my-3">
              <div className="date">
                <p style={{ fontSize: "18px", marginBottom: "0" }}>16</p>
                <p style={{ fontSize: "14px", marginBottom: "0" }}>Nov</p>
              </div>
              <Separator.Root
                className="SeparatorRoot"
                decorative
                orientation="vertical"
                style={{ margin: "0 15px" }}
              />
              <div className="event-info">
                <p style={{ fontSize: "18px" }} className="fw-bold">
                  Acquaintance Party
                </p>
                <p style={{ fontSize: "13px" }}>University Gymnasium</p>
              </div>
              <img
                src="/images/options.svg"
                alt="options-image"
                style={{
                  height: "40px",
                  width: "40px",
                  marginLeft: "45px",
                }}
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Body;
