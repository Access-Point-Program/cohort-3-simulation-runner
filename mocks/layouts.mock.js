let mockLayouts = require("./data/layouts.json");


const proxy = {
  "GET /api/layouts/all": (_, res) => {
    res.json(mockLayouts);
  },
  
  "GET /api/layouts/:id": (req, res) => {
  const layoutID = Number(req.params.id, 10);
  const foundLayout = mockLayouts.find(({ id }) => id === layoutID);

  if (foundLayout) {
      res.json(foundLayout);
  } else {
      res.status(404).json({ error: "Layout not found" });
  }
}
};
module.exports = proxy;
