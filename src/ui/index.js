import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { Visualization } from "./Visualization";

import { CodeIcon } from "./CodeIcon";
import { Random } from "../Random";
import { Planet } from "../Planet";

const randomInteger = () => parseInt(Math.random() * 10000000000000000);

export const Dashboard = () => {
  const [activeSeed, setActiveSeed] = useState(() =>
  getSeedFromUrl() || new Random(randomInteger()).next()
  );
  const [activePlanet, setActivePlanet] = useState();

  useEffect(() => {
    const planet = new Planet(activeSeed);
    setActivePlanet(planet);
    updateUrl(activeSeed)
    logPlanet(planet);
  }, [activeSeed]);

  const changeSeed = (seed) => {
    setActiveSeed(seed);
  };

  const randomSeed = () => {
    const seed = new Random(randomInteger()).next();

    setActiveSeed(seed);
  };

  return (
    <>
      <a
        id="back-icon"
        className="icon-link"
        target="_blank"
        href="https://vilva.io/sketches"
      >
        <span>←</span>
      </a>
      <p id="info-box">My first take at procedural generation from a seed.
      <br/><br/>
      An integer seed is split into parts, each used to generate the different properties of the planet: size, distance, type etc... and further seeds are generated for the other layers of the system (moons in this case) simple technique but quite effective.
      <br/><br/>
      Play around generating systems and if you fall in love with any of them, save the url to rebuild it later.
      </p>
      <div className="container mx-auto mt-20 flex items-center justify-center flex-col">
        <div className="-mt-20 flex flex-col justify-center items-center">
          {activePlanet && <Visualization planet={activePlanet} />}
          <div className="flex flex-col justify-center">
            <input
              className="text-center mb-4 rounded-md border-solid border border-black"
              onChange={(event) => changeSeed(event.target.value)}
              type="text"
              value={activeSeed}
            />
            <button
              className="p-3 bg-white rounded-md bg-purple-500 text-white"
              onClick={randomSeed}
            >
              Randomize
            </button>
          </div>
          {activePlanet && <p className="mt-2 text-gray-400">Type: {activePlanet.type} | Size: {activePlanet.size} |  Moons: {activePlanet.moons.length} | Period: {activePlanet.period}s</p>}
        </div>
        <a
          target="_blank"
          href="https://github.com/vilvadot/sketch-planets-generator"
        >
          <CodeIcon />
        </a>
      </div>
    </>
  );
};

const getSeedFromUrl = () => window.location.pathname.replace("/", "")

const updateUrl = (seed) => {
  history.pushState({pageID: seed}, seed, `${seed}`);
}

const logPlanet = (planet) => {
  console.table({
    seed: planet.seed,
    size: planet.size,
    period: planet.period,
    moons: planet.moons.length,
  });
};


ReactDOM.render(<Dashboard />, document.getElementById("universe"));