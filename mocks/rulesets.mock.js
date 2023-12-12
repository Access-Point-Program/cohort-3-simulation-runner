const mockRulesets = require("./data/rulesets.json");

const proxy = {
  "GET /ruleset": (_, res) => {
    res.json(mockRulesets);
  },
  
  "GET /ruleset/:id": (req, res) => { 
  const rulesetId = req.params.id;
  const foundRuleset = mockRulesets.find(({ id }) => id === rulesetId);

  if (foundRuleset) {
      res.json(foundRuleset);
  } else {
      res.status(404).json({ error: "Ruleset not found" });
  }
}

};

module.exports = proxy;
