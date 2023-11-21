import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

const Body = ({ name }) => {
  return (
    <div className="body">
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
            <span className="h2 fw-bold">Good Day, {name}!</span>
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
  );
};

export default Body;
