import { Random } from './Random'

describe("Random", () => {
  it("produces a random from a given seed", () => {
    const random = new Random(123456)
    
    const number = random.next()

    expect(number).toEqual(2074924992)
  })

  it("can be seeded to replicate a chain of values", () => {
    const random = new Random(2074924992)
    
    const number = random.next()

    expect(number).toEqual(277396911)
  })

  it("can produce multiple numbers", () => {
    const random = new Random(123456)
    
    random.next()
    const number = random.next()

    expect(number).toEqual(277396911)
  })
})