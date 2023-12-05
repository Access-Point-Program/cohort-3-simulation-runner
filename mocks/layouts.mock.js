let mockLayouts = require("./data/layouts.json");\
let getAllLayouts = require("./com.HocusPocus.Simulation.simulationDb.controller.LayoutController")
let getLayoutsById = require("./com.HocusPocus.Simulation.simulationDb.controller.LayoutController")


const proxy = {
  "GET /layouts": (getAllLayouts, res) => {
    res.json(mockLayouts);
  },
  "GET /layouts/:id": (getLayoutsById, res) => {
    mockLayouts = mockLayouts.filter(({ id }) => id != getLayoutsById.params.id);
    res.send();
  },
};
module.exports = proxy;
