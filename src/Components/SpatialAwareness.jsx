import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import Display from './Display';

export default function SpatialAwareness() {
  const videoRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.getUserMedia(
        { video: {} },
        stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        },
        err => console.error(err)
      );
    };

    loadModels();
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      if (!videoRef.current) return;

      const video = videoRef.current;

      const intervalId = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const updatedPositions = detections.map(det => {
          const { width, x } = det.detection.box;
          const focalLength = 750;
          const faceWidth = 16;
          const distance = calculateDistance(faceWidth, focalLength, width);

          const relativeX = (x + width / 2) / video.videoWidth;

          return {
            distance,
            relativeX,
          };
        });

        setPositions(updatedPositions);
      }, 100);

      return () => clearInterval(intervalId);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('play', handlePlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('play', handlePlay);
      }
    };
  }, []);

  const calculateDistance = (faceWidth, focalLength, pixelWidth) => {
    return (faceWidth * focalLength) / pixelWidth;
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Video Feed */}
      <div style={{ flex: 1 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      {/* Spatial Awareness Display */}
      <div style={{ flex: 1, position: 'relative', background: '#000' }}>
        {/* <Display positions={positions} /> */}
        <Display positions={positions} />
      </div>
    </div>
  );
}

// function Display({ positions }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw user dot
//     ctx.fillStyle = 'green';
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, 10, 5, 0, Math.PI * 2);
//     ctx.fill();

//     // Draw detected persons
//     positions.forEach(({ distance, relativeX }) => {
//       const canvasX = relativeX * canvas.width;
//       const canvasY = Math.min(200, distance * 5); // Scale for visibility
//       ctx.fillStyle = distance <= 100 ? 'red' : 'blue';

//       // Draw dot
//       ctx.beginPath();
//       ctx.arc(canvasX, canvasY, 10, 0, Math.PI * 2);
//       ctx.fill();

//       // Draw orientation arrow
//       ctx.strokeStyle = distance <= 100 ? 'red' : 'blue';
//       ctx.lineWidth = 2;
//       ctx.beginPath();
//       ctx.moveTo(canvasX, canvasY);
//       ctx.lineTo(canvasX, canvasY - 20);
//       ctx.stroke();
//     });
//   }, [positions]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={500}
//       height={500}
//       style={{
//         width: '100%',
//         height: '100%',
//         display: 'block',
//       }}
//     />
//   );
// }
