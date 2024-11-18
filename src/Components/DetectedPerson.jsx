import React from 'react';
import { AngryFemale, AngryMale, DisgustedFemale, DisgustedMale, FemaleSymbol, HappyFemale, HappyMale, MaleSymbol, SadFemale, SadMale, SuprisedFemale, SuprisedMale } from './Symbol';

export default function DetectedPerson({ canvasWidth, canvasHeight, distance, relativeX, gender, expression }) {
  const canvasX = mapRelativeXToCanvasX(relativeX, canvasWidth);
  const canvasY = mapDistanceToYPosition(distance, canvasHeight);
  const symbolSize = mapDistanceToSize(distance);

  // Determine the color based on distance
  const color = distance <= 150 ? 'red' : 'blue';

  // Determine which symbol
  const getSymbolComponent = () => {
    if (gender === 'female') {
      switch (expression) {
        case 'neutral':
          return <FemaleSymbol color={color} />;
        case 'happy':
          return <HappyFemale color={color} />;
        case 'sad':
          return <SadFemale color={color} />;
        case 'angry':
          return <AngryFemale color={color} />;
        case 'surprised':
          return <SuprisedFemale color={color} />;
        case 'disgusted':
          return <DisgustedFemale color={color} />;
        default:
          return <FemaleSymbol color={color} />;
      }
    } else {
      switch (expression) {
        case 'neutral':
          return <MaleSymbol color={color} />;
        case 'happy':
          return <HappyMale color={color} />;
        case 'sad':
          return <SadMale color={color} />;
        case 'angry':
          return <AngryMale color={color} />;
        case 'surprised':
          return <SuprisedMale color={color} />;
        case 'disgusted':
          return <DisgustedMale color={color} />;
        default:
          return <MaleSymbol color={color} />;
      }
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: canvasX - symbolSize / 2, // Center symbol based on size
        top: canvasY - symbolSize / 2,
        width: symbolSize,
        height: symbolSize,
      }}
    >
      {getSymbolComponent()}
    </div>
  );
}

// Function to map the distance to the vertical position
const mapDistanceToYPosition = (distance, canvasHeight) => {
    const yPosition = (distance / 300) * canvasHeight;
  
    return yPosition;
  };

// Function to map the distance to the size of the symbol (closer = bigger)
const mapDistanceToSize = (distance) => {
  const maxDistance = 400;
  const size = Math.min(Math.max((maxDistance - distance) / maxDistance * 100, 30), 100);

  return size;
};

const mapRelativeXToCanvasX = (relativeX, canvasWidth) => {
  // Scale the relative X (0 to 1) to a narrower range
  const scaleFactor = 0.6; // horizontal sensitivity
  const centeredX = -(relativeX - 0.5) * canvasWidth * scaleFactor;

  // Centered relative to the canvas width
  return canvasWidth / 2 + centeredX;
};
