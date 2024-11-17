import * as React from "react";

export function MaleSymbol({color}) {
  return (
    <svg 
        fill={color}
        viewBox="0 0 1024 1024" 
        xmlns="http://www.w3.org/2000/svg" 
        stroke={color}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" 
            strokeLinecap="round" strokeLinejoin="round">
        </g>
        <g id="SVGRepo_iconCarrier">
            <path d="M1023.3 22.656c.144-6.48-1.378-12.29-5.586-16.433a22.058 22.058 0 0 0-16.4-6.527l-11.696.273c-.223 0-.383.08-.64.112L695.476-.944c-12.928.289-23.616 10.993-23.92 23.92l-.032 16.432c1.967 15.248 13.952 24.16 26.88 23.872l215.215.432-256.144 254.592c-69.488-58.24-159.008-93.36-256.768-93.36-220.928 0-400 179.071-400 400 0 220.911 179.072 400 400 400 220.912 0 400-179.089 400-400 0-100.113-36.864-191.569-97.664-261.713L959.938 107.92l-.944 219.152c-.304 12.928 9.952 24.176 22.897 23.888l16.416-.032c12.96-.304 23.647-8 23.92-20.928l.671-295.008c0-.24-.88-.4-.88-.624zM737.229 624.943c0 185.856-150.672 336.528-336.544 336.528-185.856 0-336.528-150.672-336.528-336.528 0-185.856 150.672-336.528 336.528-336.528 185.872-.016 336.544 150.656 336.544 336.528z">
            </path>
        </g>
    </svg>
  );
}

export function FemaleSymbol({color}) {
  return (
    <svg 
        viewBox="0 0 24 24" 
        fill={color} 
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path fillRule="evenodd" clipRule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z" 
                fill={color}>
            </path> 
        </g>
    </svg>
  )
}
