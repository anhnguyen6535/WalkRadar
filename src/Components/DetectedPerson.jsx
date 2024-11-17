import React from 'react'
import { AngryFemale, AngryMale, DisgustedFemale, DisgustedMale, FemaleSymbol, HappyFemale, HappyMale, MaleSymbol, SadFemale, SadMale, SuprisedFemale, SuprisedMale } from './Symbol';

export default function DetectedPerson({canvasWidth, canvasHeight, height, distance, relativeX, gender, expression}) {
  // Map distance to y position
  const canvasX = relativeX * canvasWidth;
  const canvasY = mapDistanceToYPosition(distance, canvasHeight);

  // Determine the color based on distance
  const color = distance <= 100 ? 'red' : 'blue';

  const getSymbolComponent = () =>{
    if (gender === 'female'){
        switch (expression){
            case 'neutral':
                return <FemaleSymbol color={color}/>
            case 'happy':
                return <HappyFemale  color={color}/>
            case 'sad':
                return <SadFemale  color={color}/>
            case 'angry':
                return <AngryFemale color={color}/>
            case 'surprised':
                return <SuprisedFemale  color={color}/>
            case 'disgusted':
                return <DisgustedFemale  color={color}/>
            default:
                return <FemaleSymbol color={color}/>
        }
    }
    else{
        switch (expression){
            case 'neutral':
                return <MaleSymbol color={color}/>
            case 'happy':
                return <HappyMale  color={color}/>
            case 'sad':
                return <SadMale  color={color}/>
            case 'angry':
                return <AngryMale color={color}/>
            case 'surprised':
                return <SuprisedMale  color={color}/>
            case 'disgusted':
                return <DisgustedMale  color={color}/>
            default:
                return <MaleSymbol color={color}/>
        }
    }
  }

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
      {getSymbolComponent()}
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
