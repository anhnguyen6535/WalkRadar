import React, { useEffect, useRef, useState } from 'react';

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
      positions.forEach(({ distance, relativeX }) => {
        const canvasX = relativeX * canvas.width;
  
        // Map distance to y position. The closer the person is, the further down the dot will go.
        const canvasY = mapDistanceToYPosition(distance, canvas.height);
  
        // Determine color based on distance
        ctx.fillStyle = distance <= 100 ? 'red' : 'blue';
  
        // Draw the dot at the calculated position
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 10, 0, Math.PI * 2);
        ctx.fill();
  
        // Draw the orientation arrow pointing downwards (relative direction)
        // ctx.strokeStyle = distance <= 100 ? 'red' : 'blue';
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // ctx.moveTo(canvasX, canvasY);
        // ctx.lineTo(canvasX, canvasY - 20); // Arrow pointing down
        // ctx.stroke();
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
  