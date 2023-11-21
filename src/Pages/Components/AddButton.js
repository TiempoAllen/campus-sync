import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const AddButton = () => {
  return (
    <>
      <Fab
        aria-label="add"
        className="position-absolute bottom-0 end-0 "
        sx={{
          height: "70px",
          width: "70px",
          margin: "50px 80px",
        }}
      >
        <AddIcon sx={{ color: "#374151", height: "40px", width: "40px" }} />
      </Fab>
    </>
  );
};

export default AddButton;
