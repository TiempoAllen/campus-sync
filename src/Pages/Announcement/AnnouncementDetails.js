import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import AdminSideNav from "../Dashboard/AdminSideNav";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnnouncementDetails = () => {
  const { user } = useAuth();
  const { aid } = useParams();
  const [announcement, setAnnouncement] = useState({});

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
      <div className="dashboard-options">
        <h1>{announcement.title}</h1>
        {/* Render other details of the announcement */}
      </div>
    </>
  );
};

export default AnnouncementDetails;
