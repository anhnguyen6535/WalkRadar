import React, { useEffect, useRef } from 'react';
import maleSymbol from '../../public/icons/male.png'; // Path to the male image
import femaleSymbol from '../../public/icons/female.png'; // Path to the female image

export default function Display({ positions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw user dot (user is always at the top center)
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 10, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw detected persons
    positions.forEach(({ distance, relativeX, gender }) => {
      const canvasX = relativeX * canvas.width;

      // Map distance to y position. The closer the person is, the further down the dot will go.
      const canvasY = mapDistanceToYPosition(distance, canvas.height);

      // Display gender symbol
      const symbolSrc = gender === 'female' ? femaleSymbol : maleSymbol;
      
      // Create a new Image element to draw the image
      const symbol = new Image();
      symbol.src = '../../public/icons/male-red.png';
      // symbol.src = symbolSrc;
      
      symbol.onload = () => {        
        const symbolSize = 20; 
        console.log(symbol.src);
        // Draw the gender symbol at the calculated position once the image is loaded
        ctx.drawImage(symbol, canvasX - symbolSize / 2, canvasY - symbolSize / 2, symbolSize, symbolSize);
      };
      // if (gender) {
      // }
    });
  }, [positions]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
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
