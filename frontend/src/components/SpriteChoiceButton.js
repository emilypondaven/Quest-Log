import React, { useState } from 'react';

function SpriteChoiceButton({ handleSpriteChange }) {
    return (
        <button
            onClick={handleSpriteChange}
            id="sprite-button"
        >
            Click here
        </button>
    )
}

export default SpriteChoiceButton;