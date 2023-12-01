import React from "react";

const Team = () => {
  return (
    <section className="p-5 text-center timer">
      <div className="container">
        <h1>
          Our <span className="text-info">Team</span>
        </h1>
        <div className="members-profile row text-center px-5 mt-3 g-4">
          <div className="col-md">
            <img src="/images/Tiempo.jpg" alt="profile" />
            <p className="lead">John Allen Tiempo</p>
          </div>
          <div className="col-md">
            <img src="/images/Roble.png" alt="profile" />
            <p className="lead">John Oscar Roble</p>
          </div>
          <div className="col-md">
            <img src="/images/Buniel.png" alt="profile" />
            <p className="lead">James Kerl Buniel</p>
          </div>
          <div className="col-md">
            <img src="/images/Buot.png" alt="profile" />
            <p className="lead">Czar Philip Buot</p>
          </div>
        </div>
        <div className="pt-4">
          <a href="#">
            <i
              className="bi bi-facebook text-light mx-2"
              style={{ fontSize: "26px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="bi bi-twitter text-light mx-2"
              style={{ fontSize: "26px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="bi bi-google text-light mx-2"
              style={{ fontSize: "26px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="bi bi-instagram text-light mx-2"
              style={{ fontSize: "26px" }}
            ></i>
          </a>
          <a href="#">
            <i
              className="bi bi-youtube text-light mx-2"
              style={{ fontSize: "26px" }}
            ></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;
