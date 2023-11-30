let mockLayouts = require("./data/layouts.json");

const proxy = {
  "GET /layouts": (_, res) => {
    res.json(mockLayouts);
  },
};
module.exports = proxy;
