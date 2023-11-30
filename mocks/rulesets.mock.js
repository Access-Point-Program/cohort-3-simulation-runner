const mockRulesets = require("./data/rulesets.json");

const proxy = {
  "GET /rulesets": (_, res) => {
    console.log("GET /rulesets.json route hit");
    console.log("mockRulesets:", mockRulesets);
    res.json(mockRulesets);
  },
};

module.exports = proxy;
