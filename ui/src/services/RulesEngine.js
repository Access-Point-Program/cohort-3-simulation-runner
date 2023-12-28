const { Engine } = require("json-rules-engine");

class RulesEngine {
  _ruleset = null;
  _layout = null;
  _maxIterations = null;
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
    let currentDirection = this._currentDirection;
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
      
      
      const newPosition = this.findEnd(this._layout);
      const newRow = newPosition.row;
      const newColumn = newPosition.column;

      const updatedPosition = {
        row: newRow,
        column: newColumn
      };
      console.log(`New position of ${currentPosition} is ${updatedPosition}`);


      const updatedDirection = {
        get currentDirection() {
          return this._currentDirection;
        },

        set currentDirection(newDirection) {
          this._currentDirection = newDirection;
          console.log(`Current direction is now ${this._currentDirection}`);
        },

        evaluateDirection(currentPosition, newPosition) {
          const rowFinder = currentPosition.row - newPosition.row;
          const columnFinder = currentPosition.column - newPosition.column;

          // Front, right, left, behind
          if (rowFinder === 0 && columnFinder === 0) {
            return this._currentDirection // This means there was no change
          } else if (rowFinder === 0) {
            return columnFinder > 0 ? 'BEHIND' : 'FRONT';
          } else if (columnFinder === 0) {
            return rowFinder > 0 ? 'RIGHT' : 'LEFT';
          } else {
            return this._currentDirection;
          }
        }
      };

      updatedDirection.currentDirection = updatedDirection.evaluateDirection(currentPosition, newPosition);

      console.log(updatedDirection.currentDirection);



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
    // TODO: get facts for this row and column
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
