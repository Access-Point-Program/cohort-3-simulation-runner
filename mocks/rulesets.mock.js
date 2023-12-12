const mockRulesets = require("./data/rulesets.json");

const proxy = {
  "GET /rulesets": (_, res) => {
    res.json(mockRulesets);
  },

  "GET /rulesets/:id": (req, res) => {
    mockRulesets = mockRulesets.filter(({ id }) => id != req.params.id);
    res.send();
  }
};

module.exports = proxy;