const { Engine } = require("json-rules-engine");
const rulesets = require("./mocks/rulesets.mock");
const layouts = require("./mocks/data/layouts.json");

const CELL_STATE = {
  // Layouts Cell State
  OPEN: 0,
  WALL: 1,
  START: 2,
  END: 3,
  // Custom Props
  PATH: 4,
};

const toCellState = (num) =>
  Object.entries(CELL_STATE).find((e) => e[1] === num)[0];
const fromCellState = (str) => CELL_STATE[str];

// Move engine creation outside of the loop
const engine = new Engine();

async function runSimulation(layouts, rulesets, maxIterations) {
  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    console.log(`Iteration ${iteration}:`);

    const facts = generateFacts(layouts);

    // Add layout facts to the engine
    Object.keys(facts).forEach((factKey) => {
      engine.addFact(factKey, () => facts[factKey]);
    });

    // Check through each layout
    Object.keys(layouts).forEach((layoutKey) => {
      const layout = layouts[layoutKey].matrix;
      layout.forEach((row, i) => {
        row.forEach((cell, j) => {
          engine.addRule({
            conditions: {
              all: [
                {
                  fact: `cell_${layoutKey}_${i}_${j}`,
                  operator: "equal",
                  value: cell,
                },
              ],
            },
            event: {
              type: "layoutCheck",
              params: {
                message: `${layouts[layoutKey].name}: Checking cell (${i}, ${j}) - Value: ${cell}`,
              },
            },
          });
        });
      });
    });

    // Add rules from the rulesets
    rulesets.forEach((ruleset) => {
      ruleset.rules.forEach((rule) => {
        rule.conditions.forEach((condition) => {
          engine.addFact(condition.fact_type, () => "");
        });

        engine.addRule({
          conditions: {
            all: rule.conditions.map((condition) => ({
              fact: condition.fact_type,
              operator: "equal",
              value: condition.value_type,
            })),
          },
          event: {
            type: rule.event_type,
            params: {
              message: `Rule matched for event type ${rule.event_type}`,
            },
          },
          priority: rule.priority,
          id: rule.id,
        });
      });
    });

    const results = await engine.run(facts);
    console.log(results);
    console.log("\n");
  }

  function generateFacts(layouts) {
    const facts = {};

    Object.keys(layouts).forEach((layoutKey) => {
      const layout = layouts[layoutKey].matrix;
      layout.forEach((row, i) => {
        row.forEach((cell, j) => {
          const factKey = `cell_${layoutKey}_${i}_${j}`;
          facts[factKey] = cell;
        });
      });
    });

    return facts;
  }
}

// Call the runSimulation function
const maxIterations = 5; // Change this value as needed
runSimulation(layouts, rulesets, maxIterations);
