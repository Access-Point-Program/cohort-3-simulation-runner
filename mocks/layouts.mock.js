let mockLayouts = require("./data/layouts.json");


const proxy = {
  _proxy: {
    changeHost: true,
    httpProxy: {
      options: {
        ignorePath: true,
      },
    },
  },

  "GET /layouts": (_, res) => {
    res.json(mockLayouts);
  },
  "GET /layouts/:id": (req, res) => {
    mockLayouts = mockLayouts.filter(({ id }) => id != req.params.id);
    res.send();
  }
};
module.exports = proxy;
