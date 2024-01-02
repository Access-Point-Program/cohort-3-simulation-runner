const { Engine } = require("json-rules-engine");

const CELL_STATE = {
  // Layouts Cell State
  OPEN: 0,
  WALL: 1,
  START: 2,
  END: 3,
  // Custom Props
  PATH: 4,
};

const VALUE_TYPE = {
  WALL: 'WALL',
  EMPTY: 'EMPTY',
  END: 'END'
};

const cellStateToValueType = {
  [CELL_STATE.OPEN]: VALUE_TYPE.EMPTY,
  [CELL_STATE.WALL]: VALUE_TYPE.WALL,
  [CELL_STATE.START]: VALUE_TYPE.EMPTY,
  [CELL_STATE.END]: VALUE_TYPE.END,
  [CELL_STATE.PATH]: VALUE_TYPE.EMPTY,
}

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

  findStart() {
    for (let i = 0; i < this._layout.cells.length; i++) {
      for (let j = 0; j < this._layout.cells[i].length; j++) {
        if (this._layout.cells[i][j] === CELL_STATE.START) {
          return { row: i, column: j };
        }
      }
    }

    throw 'unable to find start';
  }

  findEnd() {
    for (let i = 0; i < this._layout.cells.length; i++) {
      for (let j = 0; j < this._layout.cells[i].length; j++) {
        if (this._layout.cells[i][j] === CELL_STATE.END) {
          return { row: i, column: j };
        }
      }
    }

    throw 'unable to find end';
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
    const currentPosition = this.findStart();
    const endPosition = this.findEnd();

    for (let i = 0; i < this._maxIterations; ++i) {
      const facts = this.generateFacts(
        currentPosition.row,
        currentPosition.column,
        this._currentDirection
      );

      const { events } = await this._engine.run(facts);
      if (events.length === 0) {
        // Rules Engine returned no possible option.
        this._succeeded = false;
        return;
      }

      const [{ type: action }] = events;

      console.log({ facts, action, currentPosition, direction: this._currentDirection, moves: this._moves });
      switch (action) {
        case 'FORWARD':
          if (facts.FRONT === VALUE_TYPE.WALL) {
            // can't move into a wall, not playing Zelda.
            this._succeeded = false;
            return;
          }

          this.proccessMoveForward(currentPosition);
          this._moves.push({ ...currentPosition, direction: this._currentDirection, action });

          if (currentPosition.column === endPosition.column && currentPosition.row === endPosition.row) {
            // We found the end.
            this._succeeded = true;
            return;
          }
          break;
        case 'RIGHT':
          this.proccessTurnRight();
          this._moves.push({ ...currentPosition, direction: this._currentDirection, action });
          break;
        case 'LEFT':
          this.proccessTurnLeft();
          this._moves.push({ ...currentPosition, direction: this._currentDirection, action });
          break;
        default:
          // Rules Engine is very confused
          this._succeeded = false;
          return;
      }

      console.log({ facts, action, currentPosition, direction: this._currentDirection, moves: this._moves });
    }
  }

  proccessMoveForward(position) {
    switch (this._currentDirection) {
      case 'NORTH':
        position.row--;
        break;
      case 'SOUTH':
        position.row++;
        break;
      case 'EAST':
        position.column++;
        break;
      case 'WEST':
        position.column--;
        break;
    }
  }

  proccessTurnRight() {
    switch (this._currentDirection) {
      case 'NORTH':
        this._currentDirection = 'EAST';
        break;
      case 'SOUTH':
        this._currentDirection = 'WEST';
        break;
      case 'EAST':
        this._currentDirection = 'SOUTH';
        break;
      case 'WEST':
        this._currentDirection = 'NORTH';
        break;
    }
  }

  proccessTurnLeft() {
    switch (this._currentDirection) {
      case 'NORTH':
        this._currentDirection = 'WEST';
        break;
      case 'SOUTH':
        this._currentDirection = 'EAST';
        break;
      case 'EAST':
        this._currentDirection = 'NORTH';
        break;
      case 'WEST':
        this._currentDirection = 'SOUTH';
        break;
    }
  }

  generateFacts(row, column, direction) {
    const directionalFacts = {
      NORTH: cellStateToValueType[this.getCellState(row - 1, column)],
      SOUTH: cellStateToValueType[this.getCellState(row + 1, column)],
      EAST: cellStateToValueType[this.getCellState(row, column + 1)],
      WEST: cellStateToValueType[this.getCellState(row, column - 1)]
    }

    switch (direction) {
      case 'NORTH':
        return {
          FRONT: directionalFacts.NORTH,
          RIGHT: directionalFacts.EAST,
          LEFT: directionalFacts.WEST,
          BEHIND: directionalFacts.SOUTH,
        };
      case 'SOUTH':
        return {
          FRONT: directionalFacts.SOUTH,
          RIGHT: directionalFacts.WEST,
          LEFT: directionalFacts.EAST,
          BEHIND: directionalFacts.NORTH,
        };
      case 'EAST':
        return {
          FRONT: directionalFacts.EAST,
          RIGHT: directionalFacts.SOUTH,
          LEFT: directionalFacts.NORTH,
          BEHIND: directionalFacts.WEST,
        };
      case 'WEST':
        return {
          FRONT: directionalFacts.WEST,
          RIGHT: directionalFacts.NORTH,
          LEFT: directionalFacts.SOUTH,
          BEHIND: directionalFacts.EAST,
        };
    }
  }

  getCellState(row, col) {
    if (row < 0 || row > 8) return CELL_STATE.WALL;
    if (col < 0 || col > 8) return CELL_STATE.WALL;
    return this._layout.cells[row][col];
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
