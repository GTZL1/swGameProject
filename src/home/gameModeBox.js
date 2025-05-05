import React, { useState, useEffect } from 'react';
import ButtonLink from '../utils/buttons/buttonLink.js';

const GameModeBox = ({endpoint, boxText, buttonText}) => {
    console.log(buttonText);
    return (
        <div className='w-80 flex flex-col items-center justify-center gap-1 p-3 border-4 border-solid border-black m-5'>
            <p className='h-[90%] flex items-center text-center'>{boxText}</p>
            <ButtonLink route = {endpoint} style="text-red-600 max-w-md">{buttonText}</ButtonLink>
        </div>
    );
}

export default GameModeBox;