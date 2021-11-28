import { Random } from "./Random";
import { Moon } from "./Moon";

  // ------------ Seed --------------
  //  1      2        3         4         5-10
  //  size   moons    period    type      ??? 

export class Planet {
  constructor(seed) {
    this.seed = seed.toString();
    this.size = this._generateSize();
    this.moons = this._generateMoons();
    this.period = this._generatePeriod();
    this.type = this._generateType();
  }

  _generateType() {
    const TYPES = {
      Gas: 'Gas',
      Terrestrial: 'Terrestrial',
      Ocean: 'Ocean',
      Rocky: 'Rocky',
      Ice: 'Ice',
    }
    const possibleValues = [TYPES.Gas, TYPES.Gas, TYPES.Terrestrial, TYPES.Ocean, TYPES.Rocky, TYPES.Ice, TYPES.Gas, TYPES.Gas, TYPES.Rocky, TYPES.Ice]
    
    const seed = this.seed[3];

    return possibleValues[seed]
  }

  _generateSize() {
    const seed = this.seed[0];

    const lastDigit = seed.toString()[seed.toString().length - 1];
    return Number(lastDigit) * 2;
  }

  _generateMoons() {
    const moons = []
    const generator = new Random(this.seed[1] * 2);

    const firstDigit = generator.next().toString()[0];
    const numberOfMoons = Number(firstDigit)

    times(() => {
      moons.push(new Moon(generator.next(), this.size))
    }, numberOfMoons)

    return moons
  }

  _generatePeriod() {
    return this.seed[2] * 1.5 + 1;
  }
}

const times = (callback, numberOfTimes) => {
  for(let i = 0; i <= numberOfTimes; i++ ){
    callback()
  }
}
