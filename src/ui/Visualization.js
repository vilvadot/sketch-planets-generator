import React from "react";

const star = {
  size: 10,
  x: 0,
  y: 0,
};

export const Visualization = ({ planet }) => {
  const size = 450;
  const center = {
    x: 250,
    y: 250,
  };
  const zoom = 3.5;
  const starRadius = star.size * ((planet.seed[0] * planet.moons.length) / 10) * zoom;

  return (
    <svg
      className="universe"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      );
      <Planet
        key={planet.seed}
        center={center}
        planet={planet}
        index={1}
        zoom={zoom}
        radius={planet.size * zoom}
        starOffset={starRadius * 2}
        moons={planet.moons}
      />
      <Star radius={starRadius} x={center.x} y={center.y} />
    </svg>
  );
};

const Star = ({ radius, x, y }) => {
  const step = 2;
  return (
    <g>
      <circle cx={x} cy={y} r={radius + step * 1.1} fill="white" opacity=".2" />
      <circle cx={x} cy={y} r={radius + step} fill="#FBBF24" opacity=".2" />
      <circle cx={x} cy={y} r={radius} fill="#FBBF24" />
      <circle cx={x} cy={y} r={radius - step} fill="#D97706" opacity=".2" />
      <circle
        cx={x}
        cy={y}
        r={radius - step * 2.5}
        fill="#D97706"
        opacity=".2"
      />
    </g>
  );
};

const Planet = ({ planet, index, center, radius, starOffset, zoom, moons }) => {
  const randomAngle = index;
  const x = center.x + starOffset + Math.cos(randomAngle * Math.PI);
  const y = center.y + starOffset + Math.sin(randomAngle * Math.PI);

  return (
    <g key={planet.seed}>
      {moons.map((moon, index) => {
        const moonX = x + moon.distance * Math.cos(index);
        const moonY = y + moon.distance * Math.sin(index);

        return (
          <circle
            key={moon.seed}
            className="viz-moon"
            r={moon.size * zoom}
            cx={moonX}
            cy={moonY}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur={`${moon.orbitalPeriod}s`}
              begin="0s"
              from={`0 ${x} ${y}`}
              to={`360 ${x} ${y}`}
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        );
      })}
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur={`${planet.period}s`}
        begin="0s"
        from="0 250 250"
        to="360 250 250"
        repeatCount="indefinite"
      ></animateTransform>
      <circle
        stroke="white"
        cx={x}
        cy={y}
        r={radius}
        fill={color(planet.type)}
      ></circle>
    </g>
  );
};

const color = (type) => {
  if (type === 'Gas') return "#39FFD9";
  if (type === 'Rocky') return "#934000";
  if (type === 'Ice') return "#91C4FF";
  if (type === 'Terrestrial') return "#10B981";
  if (type === 'Ocean') return "#60A5FA";

  return "red";
};
