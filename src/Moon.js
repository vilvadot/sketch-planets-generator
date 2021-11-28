  // ------------ Seed --------------
  //  1      23        4           5-10
  //  size   period    distance    ??? 

export class Moon {

  constructor(seed, parentSize){
    this.seed = seed.toString()
    this.parentSize = parentSize
    this.orbitalPeriod = this.generateOrbitalPeriod()
    this.size = this.generateSize()
    this.distance = this.generateDistance()
  }

  generateSize(){
    const seed = this.seed[0]
    return seed * 0.8;
  }

  generateOrbitalPeriod(){
    const lastTwoDigits = this.seed.slice(1,3)
    
    return parseInt(lastTwoDigits / 2)
  }

  generateDistance(){
    const seed = this.seed.slice(3,4)
    return (this.parentSize + this.size) * seed * 1.1;
  }
}