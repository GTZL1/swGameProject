import React, { useState, useEffect } from 'react';
import ButtonLink from '../utils/buttons/buttonLink.js';

const GameModeBox = ({endpoint, boxText, buttonText}) => {
    return (
        <div className={`w-80 bg-slate-400 bg-opacity-60 flex flex-col items-center justify-center gap-1 p-3 border-4 border-solid border-black m-5`}>
            <p className={`h-[90%] flex items-center text-center`}>{boxText}</p>
            <ButtonLink route = {endpoint} style="text-red-600 max-w-md border-2 border-solid border-red-600 px-2">{buttonText}</ButtonLink>
        </div>
    );
}

export default GameModeBox;