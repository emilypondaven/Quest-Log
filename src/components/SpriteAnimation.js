import React, { useState, useEffect, useRef } from 'react';
import spriteSheetImage from '../assets/Walk.png'; // Path to your sprite sheet

function SpriteAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [positionX, setPositionX] = useState(0); // Position for moving across the screen
  const canvasRef = useRef(null); // Create a reference for the canvas
  const totalFrames = 6;  // Total number of frames in your sprite sheet
  const frameWidth = 48;  // Width of one frame
  const frameHeight = 50; // Height of one frame
  const screenWidth = window.innerWidth; // Get screen width for boundary detection
  const canvasWidth = screenWidth; // Make canvas width the screen width

  useEffect(() => {
    // Change frame every 100ms
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, 120);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = spriteSheetImage;

    img.onload = () => {
      // Clear previous frame and draw the current one
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        currentFrame * frameWidth, 0, // X, Y position of the frame in the sprite sheet
        frameWidth, frameHeight, // Width and height of the frame
        positionX, 0, // Position where the frame will be drawn on the canvas
        frameWidth, frameHeight // Width and height to draw the frame
      );
    };

    // Update position to move sprite across the screen
    const moveInterval = setInterval(() => {
      setPositionX((prevPosition) => {
        const nextPosition = prevPosition + 5; // Move 5 pixels to the right
        return nextPosition > screenWidth ? -frameWidth : nextPosition; // Reset position after it moves off the screen
      });
    }, 50); // Update position every 30ms

    return () => clearInterval(moveInterval); // Cleanup position interval
  }, [currentFrame]);

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        width={canvasWidth}  // Set canvas width to screen width
        height={frameHeight} 
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
        }}
      ></canvas>
    </div>
  );
}

export default SpriteAnimation;