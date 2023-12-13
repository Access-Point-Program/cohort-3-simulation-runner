import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ColoredLine from "./ColoredLine";

import { MdSpaceDashboard } from "react-icons/md";
import { BsFillPieChartFill, BsTools } from "react-icons/bs";
import { RiRobot2Fill } from "react-icons/ri";

import "./Sidebar.css";

function SideBar({ currentPage = "simulation" }) {
  return (
    <Card className="side-bar " bg="dark" text="light">
      <div>
        <Card.Title>
          <RiRobot2Fill />
          <div>Capstone Project</div>
        </Card.Title>
        <ColoredLine color=" white" />
        <Button
          href="Dashboard"
          variant={
            currentPage === 1 || /dashboard/i.test(currentPage)
              ? "primary"
              : "dark"
          }
        >
          <MdSpaceDashboard viewBox="3 2 19 19" />
          Dashboard
        </Button>
        <Button
          href="Reports"
          variant={
            currentPage === 3 || /reports/i.test(currentPage)
              ? "primary"
              : "dark"
          }
        >
          <BsFillPieChartFill />
          Reports
        </Button>

        <Button
          href="Simulation"
          variant={
            currentPage === 2 || /simulation/i.test(currentPage)
              ? "primary"
              : "dark"
          }
        >
          <BsTools />
          Simulation
        </Button>
      </div>

      <div>
        <ColoredLine />
        <Button href="SignOut" variant="dark">
          Sign Out
        </Button>
      </div>
    </Card>
  );
}

export default SideBar;
