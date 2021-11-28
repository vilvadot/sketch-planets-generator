// https://gist.github.com/blixt/f17b47c62508be59987b

export class Random {
  constructor(seed) {
    this._seed = seed % 2147483647;
    if (this._seed <= 0)
      this._seed += 2147483646;
  }

  next() {
    return this._seed = this._seed * 16807 % 2147483647;
  }
}