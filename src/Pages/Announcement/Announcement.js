import React from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import * as Tabs from "@radix-ui/react-tabs";

const Announcement = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Announcement" src="./images/Announcement-dash.svg" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="announcement-tablist">
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
            className="TabsContent d-flex align-items-center justify-content-center"
            value="tab1"
            style={{ paddingTop: "100px" }}
          >
            <h1>No Posts</h1>
          </Tabs.Content>
          <Tabs.Content
            className="TabsContent d-flex align-items-center justify-content-center"
            value="tab2"
          >
            <h1>No Posts</h1>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
};

export default Announcement;
