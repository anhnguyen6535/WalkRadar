import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceDetection() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
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
        if (!videoRef.current || !canvasRef.current) return;
  
        const video = videoRef.current;
        const canvas = canvasRef.current;
  
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);
  
        const intervalId = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
  
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
  
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          resizedDetections.forEach(det => {
            const { width, height, x, y } = det.detection.box;
  
            const focalLength = 750;
            const faceWidth = 16;
            const distance = calculateDistance(faceWidth, focalLength, width);
  
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
  
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(`Distance: ${Math.round(distance)} cm`, x, y - 10);
          });
  
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
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
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: 2,
          }}
        />
      </div>
    );
}