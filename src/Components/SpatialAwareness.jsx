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
        faceapi.nets.ageGenderNet.loadFromUri('/models'),
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
          .withFaceExpressions()
          .withAgeAndGender();

        const updatedPositions = detections.map(det => {
          const { width, x } = det.detection.box;
          const focalLength = 750;
          const faceWidth = 16;
          const distance = calculateDistance(faceWidth, focalLength, width);

          const relativeX = (x + width / 2) / video.videoWidth;
          const {age, gender} = det

          return {
            distance,
            relativeX,
            age,
            gender
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