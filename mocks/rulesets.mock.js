const mockRulesets = require("./data/rulesets.json");

const proxy = {
  "GET /rulesets": (_, res) => {
    console.log("GET /rulesets.json route hit");
    console.log("mockRulesets:", mockRulesets);
    res.json(mockRulesets);
  },
};

module.exports = proxy;

{"name":"Ruleset 1","rules": [
    {"priority": 1, "event_type": "FORWARD", "conditions": [
        {
            "fact_type":"FRONT","value_type":"END"
        }
    ]},
    {"priority": 2, "event_type": "LEFT", "conditions": [
        {
            "fact_type":"LEFT","value_type":"END"
        }
    ]},
    {"priority": 3, "event_type": "RIGHT", "conditions": [
        {
            "fact_type":"RIGHT","value_type":"END"
        }
    ]},
    {"priority": 4, "event_type": "RIGHT", "conditions": [
        {
            "fact_type":"BEHIND","value_type":"END"
        }
    ]},
    {"priority": 5, "event_type": "RIGHT", "conditions": [
        {
            "fact_type":"FRONT","value_type":"WALL"
        },
        {
            "fact_type":"LEFT","value_type":"WALL"
        }
    ]},
    {"priority": 6, "event_type": "LEFT", "conditions": [
        {
            "fact_type":"FRONT","value_type":"WALL"
        },
        {
            "fact_type":"RIGHT","value_type":"WALL"
        }
    ]},
    {"priority": 7, "event_type": "FORWARD", "conditions": [
        {
            "fact_type":"FRONT","value_type":"EMPTY"
        }
    ]},
    {"priority": 8, "event_type": "RIGHT","conditions": [
        {
            "fact_type":"FRONT","value_type":"END"
        },
        {
            "fact_type":"LEFT","value_type":"EMPTY"
        },
        {
            "fact_type":"RIGHT","value_type":"WALL"
        },
        {
            "fact_type":"BEHIND","value_type":"WALL"
        }
    ]}
]}