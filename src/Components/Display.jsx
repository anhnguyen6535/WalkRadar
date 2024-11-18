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

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw user dot (top center)
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 20, 10, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'white',
        // border: '1px solid black',
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
          width: '100%',
          height: '100vh',
          backgroundImage: 'url(\'../public/background2.gif\')',
          backgroundSize:'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      {/* Render detected persons */}
      {positions.map(({ distance, relativeX, gender, expression }, index) => (
        (distance < 500) &&
        <DetectedPerson key={index} 
          canvasWidth={canvasRef.current?.width || 500}
          canvasHeight={canvasRef.current?.height || 500} 
          distance={distance} 
          relativeX={relativeX} 
          gender={gender} 
          expression={expression} />
      ))}
    </div>
  );
}



