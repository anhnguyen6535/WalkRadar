import React from 'react'
import { FemaleSymbol, MaleSymbol } from './Symbol';

export default function DetectedPerson({canvasWidth, canvasHeight, height, distance, relativeX, gender, expression}) {
  // Map distance to y position
  const canvasX = relativeX * canvasWidth;
  const canvasY = mapDistanceToYPosition(distance, canvasHeight);

  // Determine the color based on distance
  const color = distance <= 100 ? 'red' : 'blue';

  return (
    <div
      style={{
        position: 'absolute',
        left: canvasX - 10,
        top: canvasY - 10,
        width: 20,
        height: 20,
      }}
    >
      {gender === 'female' 
        ? <FemaleSymbol color={color} /> 
        : <MaleSymbol color={color} />
      }
    </div>
  );
}

// Function to map the distance to the vertical position
const mapDistanceToYPosition = (distance, canvasHeight) => {
    const maxDistance = 200; // Maximum distance for mapping
    const minDistance = 20;  // Minimum distance for mapping (nearby person)
  
    // Ensure the distance is within range
    const limitedDistance = Math.min(Math.max(distance, minDistance), maxDistance);
  
    // Invert the mapping so that closer people are further down
    const yPosition = (limitedDistance / maxDistance) * canvasHeight;
  
    return yPosition;
  };
