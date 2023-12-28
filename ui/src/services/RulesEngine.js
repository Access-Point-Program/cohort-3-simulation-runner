const { Engine } = require("json-rules-engine");

class RulesEngine {
  _ruleset = null;
  _layout = null;
  __maxIterations = null;
  _engine = null;
  _succeeded = null;
  _moves = null;
  _currentDirection = null;

  constructor(ruleset, layout, maxIterations) {
    this._ruleset = ruleset;
    this._layout = layout;
    this._maxIterations = maxIterations;
    this._engine = new Engine();
    this._succeeded = false;
    this._moves = [];
    this._currentDirection = layout.direction;
  }

  findStart( layout) {
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        if (layout[i][j] === 2) {
          return { row: i, column: j };
        }
      }
    }
  }

  findEnd( layout) {
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        if (layout[i][j] === 3) {
          return { row: i, column: j };
        }
      }
    }
  }

  buildEngine() {
    this._ruleset.rules.forEach((rule) => {
      this._engine.addRule({
        conditions: {
          all: rule.conditions.map((condition) => ({
            fact: condition.fact_type,
            operator: "equal",
            value: condition.value_type,
          })),
        },
        event: {
          type: rule.event_type,
          params: {},
        },
      });
    });
  }

  async runSimulation() {
  
    // TODO We don't have this in this class
    const currentDirection = "";

    // TODO: Find the end Done
    const endRow = 1;
    const endColumn = 1;

    //for (let i = 0; i < this._maxIterations; ++i) {
    const facts = this.generateFacts(
      currentRow,
      currentColumn,
      currentDirection
    );
    const events = await this._engine.run(facts);
    console.log(events);
    // IF no events, throw error
    // IF one invalid event, throw error
    // IF valid event add to moves
    // IF valid event change currentRow, currentColumn, currentDirection
    // IF match end row and column break out of loop and mark succeeded as true
    //}
  }

  generateFacts(row, column, direction) {
    // TODO get facts for this row and column
    return {
      FRONT: "OPEN",
      RIGHT: "OPEN",
      LEFT: "OPEN",
      BEHIND: "OPEN",
    };
  }

  moves() {
    return this._moves;
  }

  succeeded() {
    return this._succeeded;
  }
}

export default RulesEngine;