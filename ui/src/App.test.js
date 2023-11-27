// App.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import Simulation from "./pages/Simulation";

test("renders App component", () => {
  render(<App />);
  // Check if both Sidebar and Simulation components are rendered
  expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  expect(screen.getByTestId("simulation")).toBeInTheDocument();
});


test("renders Simulation component", () => {
  render(<Simulation />);

  // Check if the Simulation Page heading is present
  expect(screen.getByText("Simulation Page")).toBeInTheDocument();

  // Check if the Legend component is rendered
  expect(screen.getByTestId("legend")).toBeInTheDocument();

  // Check if the Grid component is rendered
  expect(screen.getByTestId("grid")).toBeInTheDocument();

  // Check if the Settings component is rendered
  expect(screen.getByTestId("settings")).toBeInTheDocument();
});