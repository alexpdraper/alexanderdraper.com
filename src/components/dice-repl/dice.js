class Dice {
  constructor (sides) {
    this._sides = sides;
    this._rolls = [];
    this._lastRolls = [];
  }

  get sides () {
    return this._sides;
  }

  get rolls () {
    return this._rolls.slice();
  }

  get lastRolls () {
    return this._lastRolls.slice();
  }

  get total () {
    return this._rolls.reduce((prev, curr) => prev + curr, 0);
  }

  get lastRollsTotal () {
    return this._lastRolls.reduce((prev, curr) => prev + curr, 0);
  }

  roll (times) {
    times = Number(times);
    if (!times || times <= 0) times = 1;
    let newRolls = [];

    for (let i = 0; i < times; i++) {
      let result = Math.floor(Math.random() * this._sides) + 1;
      newRolls.push(result);
    }

    this._lastRolls = newRolls;
    this._rolls = this._rolls.concat(this._lastRolls);
    return this.lastRollsTotal;
  }

  reset () {
    this._rolls = [];
    this._lastRolls = [];
    return this;
  }

  log () {
    console.log(this.rolls);
    console.log(this.total);
    return this;
  }
}

export { Dice }

export default Dice
