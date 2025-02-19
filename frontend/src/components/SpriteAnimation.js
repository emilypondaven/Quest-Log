import React, { useMemo, useEffect, useRef } from 'react';

// Images
import catWalkingSprite from '../assets/CatWalk.png';
import catIdleSprite from '../assets/CatIdle.png';
import dogWalkingSprite from '../assets/DogWalk.png';
import dogIdleSprite from '../assets/DogIdle.png';

function SpriteAnimation(props) {
    const { 
        isCatSprite, currentFrame, 
        setCurrentFrame, positionX, 
        setPositionX, isIdle, setIsIdle, 
        hasIdled, setHasIdled, stopPosition, 
        setStopPosition
    } = props;
    
    const canvasRef = useRef(null);

    const walkingImage = useMemo(() => {
        const img = new Image();
        img.src = isCatSprite ? catWalkingSprite : dogWalkingSprite;
        return img;
    }, [isCatSprite]); // Only recreate when isCatSprite changes

    const idleImage = useMemo(() => {
        const img = new Image();
        img.src = isCatSprite ? catIdleSprite : dogIdleSprite;
        return img;
    }, [isCatSprite]); // Only recreate when isCatSprite changes

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
    }, [isIdle, setCurrentFrame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
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

        if (!isIdle) {
            const moveInterval = setInterval(() => {
                // Changing from moving to idle at a certain x position
                setPositionX((prevPosition) => {
                    if (prevPosition >= stopPosition && !hasIdled) {
                        setIsIdle(true);
                        setTimeout(() => {
                            setIsIdle(false);
                            setHasIdled(true);
                        }, 3000);
                        return prevPosition;
                    }
                    // Once it moves to the end of the screen
                    if (prevPosition > screenWidth) {
                        setStopPosition(() => {
                            const randomPosition = Math.random() * (screenWidth - frameWidth);
                            const alignedPosition = Math.floor(randomPosition / frameWidth) * frameWidth;
                            return alignedPosition;
                        });
                        setHasIdled(false);
                        return -frameWidth;
                    }
                    // Upate the position of the sprite when moving
                    return prevPosition + 5;
                });
            }, 50);

            return () => clearInterval(moveInterval);
        }
    }, [currentFrame, isIdle, hasIdled, walkingImage, idleImage, positionX, setHasIdled, setIsIdle, setPositionX, setStopPosition, stopPosition, screenWidth]);

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