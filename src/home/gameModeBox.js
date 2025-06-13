import React, { useState, useEffect } from 'react';
import ButtonLink from '../utils/buttons/buttonLink.js';

const GameModeBox = ({endpoints, title, text, buttonTexts, isXl = false}) => {
    return (<div
            className={`w-80 min-h-60 question-div flex flex-col justify-between gap-1 p-3 m-5`}>
            <div className={`flex flex-col items-center text-center`}>
                <BoxText title={title} text={text} />
            </div>
            <Buttons endpoints={endpoints} buttonTexts={buttonTexts} isXl={isXl} />
        </div>);
}

const BoxText = ({title, text}) => {
    return (<>
        <h3 className='text-xl font-bold italic mb-2'>
            {title}</h3>
        <p>{text}</p>
    </>);
}

const Buttons = ({endpoints, buttonTexts, isXl = false}) => {
    return (<div className='min-h-24 flex flex-col items-center justify-center gap-3'>
        {endpoints.map((endpoint, index) =>
            <ButtonLink route = {endpoint} key={index}
                style={`text-red-600 ${isXl ? 'text-xl' : 'text-lg'} border-2 border-solid border-red-600 px-2 rounded-md`}>
                {buttonTexts[index]}
            </ButtonLink>
        )}
    </div>);
}

export default GameModeBox;