import React from "react";
import Sidenav from "../Dashboard/Sidenav";
import Header from "../Components/Header";
import AddButton from "../Components/AddButton";
import * as Tabs from "@radix-ui/react-tabs";

const Event = () => {
  return (
    <>
      <Sidenav />
      <div className="dashboard-options d-flex flex-column" id="announcement">
        <Header title="Event" src="./images/Event-dash.svg" />
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <div className="options-tablist">
            <Tabs.List className="TabsList" aria-label="Manage your account">
              <Tabs.Trigger className="TabsTrigger" value="tab1">
                All
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab2">
                Today
              </Tabs.Trigger>
              <Tabs.Trigger className="TabsTrigger" value="tab3">
                Upcoming
              </Tabs.Trigger>
            </Tabs.List>
          </div>
          <Tabs.Content className="TabsContent" value="tab1">
            <h1 className="text-center">No scheduled events</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <h1 className="text-center">No scheduled events for today</h1>
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab3">
            <h1 className="text-center">No upcoming events</h1>
          </Tabs.Content>
        </Tabs.Root>
        <AddButton />
      </div>
    </>
  );
};

export default Event;
