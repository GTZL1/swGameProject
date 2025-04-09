import React, { useState, useEffect } from 'react';

const Title = ({nameP}) => {
    function Greeting({ name }) {
        return <h1>{name}</h1>;
      }
        
      return <Greeting name={nameP} />;
}

export default Title;