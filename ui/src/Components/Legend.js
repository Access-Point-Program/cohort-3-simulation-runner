import React from "react";

function Legend() {
  const legendStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const legendItemStyle = {
    display: "flex",
    alignItems: "center",
    margin: "5px",
  };

  const colorBlockStyle = {
    width: "20px",
    height: "20px",
    marginRight: "5px",
    border: "1px solid #000",
  };

  return (
    <div style={legendStyle} data-testid="legend">
      <div style={legendItemStyle}>
        <div style={{ ...colorBlockStyle, backgroundColor: "white" }}></div>
        <span> Outside Wall </span>
      </div>
      <div style={legendItemStyle}>
        <div style={{ ...colorBlockStyle, backgroundColor: "black" }}></div>
        <span> Robot </span>
      </div>
      <div style={legendItemStyle}>
        <div style={{ ...colorBlockStyle, backgroundColor: "green" }}></div>
        <span> Robot Starting Position </span>
      </div>
      <div style={legendItemStyle}>
        <div
          style={{ ...colorBlockStyle, backgroundColor: "rgb(255, 157, 158)" }}
        ></div>
        <span> End </span>
      </div>
      <div style={legendItemStyle}>
        <div
          style={{ ...colorBlockStyle, backgroundColor: "rgb(187, 202, 187)" }}
        ></div>
        <span> Path </span>
      </div>
      <div style={legendItemStyle}>
        <div
          style={{
            ...colorBlockStyle,
            backgroundColor: "rgba(110, 110, 113, 0.371)",
          }}
        ></div>
        <span> Walls </span>
      </div>
    </div>
  );
}

export default Legend;
