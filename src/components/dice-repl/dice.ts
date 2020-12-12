class Dice {
  #sides!: number;
  #rolls: number[] = [];
  #lastRolls: number[] = [];

  constructor(sides: number) {
    this.#sides = sides;
  }

  get sides() {
    return this.#sides;
  }

  get rolls() {
    return this.#rolls.slice();
  }

  get lastRolls() {
    return this.#lastRolls.slice();
  }

  get total() {
    return this.#rolls.reduce((prev, curr) => prev + curr, 0);
  }

  get lastRollsTotal() {
    return this.#lastRolls.reduce((prev, curr) => prev + curr, 0);
  }

  roll(times: number | string) {
    times = Number(times);
    if (!times || times <= 0) times = 1;
    let newRolls = [];

    for (let i = 0; i < times; i++) {
      const result = Math.floor(Math.random() * this.#sides) + 1;
      newRolls.push(result);
    }

    this.#lastRolls = newRolls;
    this.#rolls = this.#rolls.concat(this.#lastRolls);
    return this.lastRollsTotal;
  }

  reset() {
    this.#rolls = [];
    this.#lastRolls = [];
    return this;
  }

  log() {
    console.log(this.rolls);
    console.log(this.total);
    return this;
  }
}

export { Dice };

export default Dice;
