import { Planet } from "./Planet";
import { Random } from "./Random";

describe("Planet", () => {
  it("can be recreated from a seed", () => {
    const seed = new Random(12345678910).next();

    const planet = new Planet(seed);

    expect(planet).toMatchSnapshot();
  })
});
