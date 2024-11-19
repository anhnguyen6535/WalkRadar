import React, { useEffect, useRef } from 'react';
// import FaceDetection from './Components/FaceDetection';
import SpatialAwareness from './Components/SpatialAwareness';

const App = () => {
  const audioRef = useRef()

  const playAudio = () =>{
    if(audioRef.current && audioRef.current.paused){
      audioRef.current.play()
    }
  }

  useEffect(() =>{
    document.addEventListener('click', playAudio, {once: true})

    return () =>{
      document.removeEventListener('click', playAudio)
    }
  },[])

  return<>
    {/* <FaceDetection /> */}
    <SpatialAwareness />
    <audio ref={audioRef} src="/audio.mp3" loop/>
  </>
};

export default App;
