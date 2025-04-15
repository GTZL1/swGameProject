import Character from './character.js';
import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { TextField } from '@mui/material';
import { NumberField } from '@base-ui-components/react/number-field';
import axios from 'axios';
import './identity.css';

const IdentityBox = () => {
    const [allCharIds, setAllCharIds] = useState([]);
    const [character, setCharacter] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [nbChars, setNbChars] = useState(1);
    const [allCategories, setAllCategories] = useState([])
    const { i18n,t } = useTranslation();

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.GET_ALL_CHARACTER_DOCIDS}`)
            .then((response) => {
                setAllCharIds(response.data);
                fetchCharacter(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(`${ENDPOINTS.GET_ALL_CATEGORIES}`)
            .then((response) => {
                setAllCategories(response.data.data.map((c) => c.name));
            })
            .catch((error) => {
            console.log(error);
            });
    }, []);

    useEffect(() => {
            if (allCharIds.length > 0) {
                fetchCharacter(allCharIds, question.getDocumentId());
            }
    }, [i18n.language]);

    function fetchCharacter(allDocIds, docId = null) {
        if (docId === null) {
            do {
                docId = allDocIds[Math.floor(Math.random() * allDocIds.length)];
            } while (alreadyUsedIds.includes(docId));
        }
        
        setAlreadyUsedIds([...alreadyUsedIds, docId]);
        
        axios
            .get(`${ENDPOINTS.GET_CHARACTER_PER_DOCID}${docId}&locale=${i18n.language}`)
            .then((response) => {
                setCharacter(new Character(
                    response.data.firstName,
                    response.data.lastName,
                    response.data.specie.name,
                    response.data.category.name,
                    response.data.allegiances.map((a) => a.name),
                    response.data.birthPlanet.name,
                    response.data.birthYear,
                    response.data.deathPlanet?.name,
                    response.data.deathYear,
                    response.data.image.url));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function Category () {
        const [selectedCategory, setSelectedCategory] = useState("none");
        const [showPlaceholder, setShowPlaceholder] = useState(true);

        return <div id="category"> 
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                onFocus={() => setShowPlaceholder(false)}
                //onClose={(e) => setShowPlaceholder(e.target.value === undefined)}
                style={{color : showPlaceholder ? "grey" : "black"}}>
                    <option key={-1} disabled value="none"
                        style={{display : showPlaceholder ? "inline" : "none"}}>
                            Select category...
                    </option>
                    {allCategories.map((c, index) => <option key={index} value={c}>{c}</option>)}
            </select>
        </div>
    }

    function Names() {
        return <div id="names">
            <TextField id="firstName" label = "First name" variant='outlined'/>
            <TextField id="lastName" label = "Last name" variant='outlined'/>
        </div>
    }

    function Image() {
        return <div>
            <img src={(`${ENDPOINTS.BACKEND_URL}${character?.imageUrl}`)} />
        </div>
    }

    function DatePlanet({year, planet, event }) {
        return <div className='event'>
            <NumberField.Root id = {`${event}Year`} disabled = {year === null} className="numberRoot">
                <NumberField.ScrubArea>
                    <label htmlFor={`${event}Year`}>
                        {`${event} year`}
                    </label>
                </NumberField.ScrubArea>
                <NumberField.Group className="numberField">
                    <NumberField.Decrement />
                    <NumberField.Input 
                        placeholder={`${event} year`}/>
                    <NumberField.Increment />
                </NumberField.Group>
            </NumberField.Root>
            <TextField id={`${event}Planet`} label = {`${event} planet`} variant = "outlined"
              disabled = {planet === undefined}/>
        </div>
    }

    return <div id = "master" className='row'>
        <div className="formDiv">
            <form>
                <Category />
                <Names />
                <div className='row dates'>
                    <DatePlanet year={character?.birthDate} planet={character?.birthPlanet} event={"Birth "}/>
                    <DatePlanet year={character?.deathDate} planet={character?.deathPlanet} event={"Death"} />
                </div>
            </form>
        </div>
        <Image />
    </div>
}

export default IdentityBox;