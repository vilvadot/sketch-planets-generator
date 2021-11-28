import { Moon } from "./Moon";
import { Random } from './Random'

describe("Moon", () => {
  it("can be recreated from a seed", () => {
    const aSeed = new Random(1234678930).next();
    const aParentSize = 4

    const moon = new Moon(aSeed, aParentSize)

    expect(moon).toMatchSnapshot();
  });
});