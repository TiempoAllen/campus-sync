import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Announcement.css";
import * as Avatar from "@radix-ui/react-avatar";

const AnnouncementDetails = () => {
  const { user } = useAuth();
  const { aid } = useParams();
  const [announcement, setAnnouncement] = useState({});
  const navigate = useNavigate();

  const fetchAnnouncementDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/announcement/getAnnouncement/${aid}`
      );
      setAnnouncement(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchAnnouncementDetails();
  }, [aid]);

  return (
    <>
      <AdminSideNav user={user} />
      <div className="announcement-details">
        <div className="header d-flex flex-row align-items-start">
          <img
            src="/images/back.svg"
            alt="back"
            style={{ width: "30px", height: "auto", margin: "2px 20px 0 0" }}
            onClick={() => {
              navigate("/adminAnnouncement");
            }}
          />
          <h3>Announcement</h3>
        </div>
        <div className="body">
          <div className="approved-announcement d-flex flex-row">
            <div className="avatar">
              <Avatar.Root className="AvatarRoot-ann">
                <Avatar.Fallback
                  className="AvatarFallback-ann"
                  style={{ backgroundColor: "#B3B3B3" }}
                >
                  JD
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
            <div className="d-flex flex-column" style={{ width: "100%" }}>
              <div className="name d-flex flex-row justify-content-between">
                <p className="fw-bold">
                  {announcement.author}{" "}
                  <span style={{ color: "#838383" }}>
                    @{announcement.author}
                  </span>
                </p>
                <p>{announcement.date_posted}</p>
              </div>
              <p className="fw-bold" style={{ marginBottom: "10px" }}>
                {announcement.title}
              </p>
              <p>{announcement.content}</p>
              <div
                className="d-flex justify-content-end"
                style={{ width: "100%" }}
              >
                <img
                  src="/images/comment.svg"
                  alt="comment"
                  style={{ width: "20px", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnouncementDetails;
