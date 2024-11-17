import React, { useEffect, useRef } from 'react';
import DetectedPerson from './DetectedPerson';

export default function Display({ positions }) {
  const canvasRef = useRef(null);
  const width = 500
  const height = 500

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
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: width,
        height: height,
        border: '1px solid black',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      {/* Render detected persons */}
      {positions.map(({ distance, relativeX, gender }, index) => (
        <DetectedPerson canvasWidth={width} canvasHeight={height} key={index} distance={distance} relativeX={relativeX} gender={gender} />
      ))}
    </div>
  );
}


