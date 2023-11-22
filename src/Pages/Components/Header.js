import React from "react";
import "./Header.css";
import { Paper, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const Header = ({ title, src }) => {
  return (
    <>
      <div className="d-flex flex-row" id="header">
        <img src={src} alt="announcement-logo" className="img-dash" />
        <div className="titles d-flex flex-column">
          <h2>{title}</h2>
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
    </>
  );
};

export default Header;
