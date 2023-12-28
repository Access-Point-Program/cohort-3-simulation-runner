const { Engine } = require("json-rules-engine");

class RulesEngine {
  _ruleset = null;
  _layout = null;
  _maxIterations = null;
  _engine = null;
  _succeeded = null;
  _moves = null;

  constructor(ruleset, layout, maxIterations) {
    this._ruleset = ruleset;
    this._layout = layout;
    this._maxIterations = maxIterations;
    this._engine = new Engine();
    this._succeeded = false;
    this._moves = [];
  }

  findStart(layout) {
    for (let i = 0; i < layout.length; i++) {
      for (let j = 0; j < layout[i].length; j++) {
        if (layout[i][j] === 2) {
          return { row: i, column: j };
        }
      }
    }
    return { row: 0, column: 0 };
  }

  findEnd(layout) {
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
    const currentPosition = this.findStart(this._layout);
    const currentDirection = this._layout.direction;
    console.log("Current Position:", currentPosition);
    const endPosition = this.findEnd(this._layout);
    const { row: endRow, column: endColumn } = endPosition || {
      row: 1,
      column: 1,
    }; // Set default values if endPosition not found

    for (let i = 0; i < this._maxIterations; ++i) {
      // Generate facts using current position and direction
      const facts = this.generateFacts(
        currentPosition.row,
        currentPosition.column,
        currentDirection
      );

      // Run the rules engine with generated facts
      const events = await this._engine.run(facts);
      console.log(events);

      // TODO: Update currentPosition, currentDirection based on events and rules




      
      // Check for the end condition
      if (
        currentPosition.row === endRow &&
        currentPosition.column === endColumn
      ) {
        this._succeeded = true;
        break;
      }

      // TODO: Update currentPosition, currentDirection based on the simulation logic
    }
  }

  generateFacts(row, column, direction) {
  


    const frontFact = this.checkObstacles(row-1, column);
    const rightFact = this.checkObstacles(row, column+1);
    const leftFact = this.checkObstacles(row, column - 1);
    const behindFact = this.checkObstacles(row+1 , column);
 
        return {
      FRONT: "OPEN",
      RIGHT: "OPEN",
      LEFT: "OPEN",
      BEHIND: "OPEN",
    };
  }


  checkObstacles(row,column){
    if(row>= 0 && 
        row < this._layout.length&& 
        column>= 0 &&
        column< this._layout[row].length)
        {const cellValue = this._layout[row][column];
        return cellValue === 1 ? "OBSTACLE" : "OPEN";
        } else{
            return "OBSTACLE";
        }

  }

  moves() {
    return this._moves;
  }

  succeeded() {
    return this._succeeded;
  }
}

export default RulesEngine;
