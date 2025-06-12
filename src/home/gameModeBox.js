import React, { useState, useEffect } from 'react';
import ButtonLink from '../utils/buttons/buttonLink.js';

const GameModeBox = ({endpoints, title, text, buttonTexts}) => {
    return (
        <div className={`w-80 h-60 bg-slate-400 bg-opacity-60 flex flex-col items-center justify-center gap-1 p-3 border-4 border-solid border-black m-5`}>
            <div className={`h-[50%] flex flex-col items-center text-center`}>
                <BoxText title={title} text={text} />
            </div>
            <Buttons endpoints={endpoints} buttonTexts={buttonTexts} />
        </div>);
}

const BoxText = ({title, text}) => {
    return (<>
        <h3 className='text-xl font-bold italic mb-2'>
            {title}</h3>
        <p>{text}</p>
    </>);
}

const Buttons = ({endpoints, buttonTexts}) => {
    return (<div className='h-[50%] flex flex-col items-center justify-around'>
        {endpoints.map((endpoint, index) =>
            <ButtonLink route = {endpoint} key={index}
                style="text-red-600 text-lg border-2 border-solid border-red-600 px-2">
                {buttonTexts[index]}
            </ButtonLink>
        )}
    </div>);
}

export default GameModeBox;