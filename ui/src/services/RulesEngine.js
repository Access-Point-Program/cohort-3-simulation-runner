const { Engine } = require("json-rules-engine");

class RulesEngine {
    _ruleset = null;
    _layout = null;
    __maxIterations = null;
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

    buildEngine() {
        /*
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
        */
        this._engine.addRule({
            conditions: {
              any: [{
                all: [{
                  fact: 'gameDuration',
                  operator: 'equal',
                  value: 40
                }, {
                  fact: 'personalFoulCount',
                  operator: 'greaterThanInclusive',
                  value: 5
                }]
              }, {
                all: [{
                  fact: 'gameDuration',
                  operator: 'equal',
                  value: 48
                }, {
                  fact: 'personalFoulCount',
                  operator: 'greaterThanInclusive',
                  value: 6
                }]
              }]
            },
            event: {  // define the event to fire when the conditions evaluate truthy
              type: 'fouledOut',
              params: {
                message: 'Player has fouled out!'
              }
            }
          });
    }

    async runSimulation() {
        try {
            // TODO: Find the start
            const currentRow = 0;
            const currentColumn = 0;
            // TODO We don't have this in this class
            const currentDirection = "";

            // TODO: Find the end 
            const endRow = 1;
            const endColumn = 1;

            //for (let i = 0; i < this._maxIterations; ++i) {
                const facts = this.generateFacts(currentRow, currentColumn, currentDirection);
                const events = await this._engine.run(facts);
                console.log(events);
                // IF no events, throw error
                // IF one invalid event, throw error
                // IF valid event add to moves
                // IF valid event change currentRow, currentColumn, currentDirection
                // IF match end row and column break out of loop and mark succeeded as true
            //}
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    generateFacts(row, column, direction) {
        // TODO get facts for this row and column
        return {
            personalFoulCount: 6,
            gameDuration: 40
        }
        /*
        return {
            "FRONT": "OPEN",
            "RIGHT": "OPEN",
            "LEFT": "OPEN",
            "BEHIND": "OPEN"
        }
        */
    }

    moves() {
        return this._moves;
    }

    succeeded() {
        return this._succeeded;
    }
}

export default RulesEngine;