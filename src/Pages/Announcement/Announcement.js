import React from "react";
import "./Announcement.css";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import * as Tabs from "@radix-ui/react-tabs";
import AddButton from "../Components/AddButton";

const Announcement = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Announcement" src="./images/Announcement-dash.svg" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="options-tablist">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                All
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Today
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content className="TabsContent" value="tab1">
            <h1 className="text-center">No announcements</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No announcements for today</h1>
          </Tabs.Content>
        </Tabs.Root>
        <AddButton />
      </div>
    </>
  );
};

export default Announcement;
