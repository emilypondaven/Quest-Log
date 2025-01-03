import React, { useState, useEffect, useRef } from 'react';
import walkingSprite from '../assets/Walk.png';
import idleSprite from '../assets/Idle.png';

function SpriteAnimation() {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [positionX, setPositionX] = useState(0);
    const [isIdle, setIsIdle] = useState(false);
    const [hasIdled, setHasIdled] = useState(false);
    const [stopPosition, setStopPosition] = useState(window.innerWidth / 2);
    const canvasRef = useRef(null);

    const totalFramesWalking = 6;
    const totalFramesIdle = 4;

    const scaleFactor = 1.5;
    const frameWidth = 48;
    const frameHeight = 50;
    const screenWidth = window.innerWidth;
    const canvasWidth = screenWidth;

    useEffect(() => {
        // Change frame every 120ms for both walking and idle
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => {
                if (isIdle) {
                    return (prevFrame + 1) % totalFramesIdle;
                } else {
                    return (prevFrame + 1) % totalFramesWalking;
                }
            });
        }, isIdle ? 150 : 120);

        return () => clearInterval(interval);
    }, [isIdle]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const walkingImage = new Image();
        const idleImage = new Image();

        walkingImage.src = walkingSprite;
        idleImage.src = idleSprite;

        walkingImage.onload = idleImage.onload = () => {
            const img = isIdle ? idleImage : walkingImage;

            // Clear previous frame and draw the current one
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                currentFrame * frameWidth, 0,
                frameWidth, frameHeight,
                positionX, 0,
                frameWidth * scaleFactor, frameHeight * scaleFactor
            );
        };

        if (!isIdle) {
            const moveInterval = setInterval(() => {
                setPositionX((prevPosition) => {
                    if (prevPosition >= stopPosition && !hasIdled) {
                        setIsIdle(true);
                        setTimeout(() => {
                            setIsIdle(false);
                            setHasIdled(true);
                        }, 3000);
                        return prevPosition;
                    }
                    if (prevPosition > screenWidth) {
                        setStopPosition(() => {
                            const randomPosition = Math.random() * (screenWidth - frameWidth);
                            const alignedPosition = Math.floor(randomPosition / frameWidth) * frameWidth;
                            return alignedPosition;
                        });
                        setHasIdled(false);
                        return -frameWidth;
                    }
                    return prevPosition + 5;
                });
            }, 50);

            return () => clearInterval(moveInterval);
        }
    }, [currentFrame, isIdle, hasIdled]);

    return (
        <div>
            <canvas 
                ref={canvasRef} 
                width={canvasWidth}
                height={frameHeight * scaleFactor}
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