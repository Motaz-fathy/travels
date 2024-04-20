import React from "react";

export const Loading = () => {
  return (
    <div className="w-full absolute top-0 left-0 right-0 min-h-screen bg-gray-200 flex justify-center items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stop-color="#3D3C3E" />
          <stop offset=".3" stop-color="#3D3C3E" stop-opacity=".9" />
          <stop offset=".6" stop-color="#3D3C3E" stop-opacity=".6" />
          <stop offset=".8" stop-color="#3D3C3E" stop-opacity=".3" />
          <stop offset="1" stop-color="#3D3C3E" stop-opacity="0" />
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a12)"
          stroke-width="15"
          stroke-linecap="round"
          stroke-dasharray="200 1000"
          stroke-dashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#3D3C3E"
          stroke-width="15"
          stroke-linecap="round"
          cx="100"
          cy="100"
          r="70"
        />
      </svg>
    </div>
  );
};
