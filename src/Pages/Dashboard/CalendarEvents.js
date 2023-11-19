import React from "react";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import * as Separator from "@radix-ui/react-separator";

const CalendarEvents = () => {
  return (
    <header class="calendar-events p-3 mb-3 border-bottom">
      <div class="container">
        <div class="child d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Paper
            component="form"
            sx={{
              p: "0px 5px",
              display: "flex",
              alignItems: "center",
              borderRadius: "20px",
              width: "75%",
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
                style={{ height: "40px", width: "40px", marginLeft: "45px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CalendarEvents;
