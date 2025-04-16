import Character from './character.js';
import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { InputLabel, MenuItem, TextField, OutlinedInput, Checkbox, FormControlLabel, Switch } from '@mui/material';
import Select from 'react-select';
import { NumberField } from '@base-ui-components/react/number-field';
import axios from 'axios';
import './identity.css';

const IdentityBox = () => {
    const [allCharIds, setAllCharIds] = useState([]);
    const [character, setCharacter] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [nbChars, setNbChars] = useState(1);
    const [allCategories, setAllCategories] = useState([]);
    const [allAllegiances, setAllAllegiances] = useState([]);
    const { i18n,t } = useTranslation();

    const [firstName, setFirstName] = useState(null);

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
        axios
            .get(`${ENDPOINTS.GET_ALL_ALLEGIANCES}`)
            .then((response) => {
                setAllAllegiances(response.data.data.map((c) => c.name));
            })
            .catch((error) => {
            console.log(error);
            });
    }, []);

    useEffect(() => {
            if (allCharIds.length > 0) {
                fetchCharacter(allCharIds, character.documentId);
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
                    response.data.documentId,
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
        /*
        const [tempCategory, setTempCategory] = useState("none");
        const [showPlaceholder, setShowPlaceholder] = useState(true);
        <select id="category"
                value={tempCategory}
                onChange={(e) => setTempCategory(e.target.value)}
                onFocus={() => setShowPlaceholder(false)}
                onClose={() => setSelectedCategory(tempCategory)}
                style={{color : showPlaceholder ? "grey" : "black"}}>
                    <option key={-1} disabled value="none"
                        style={{display : showPlaceholder ? "inline" : "none"}}>
                            Select category...
                    </option>
                    {allCategories.map((c, index) => <option key={index} value={c}>{c}</option>)}
            </select>
        */

        return <div > 
            <Select
                name="categories"
                options={allCategories.map((a) =>
                    ({value: a, label: a}))}
                required="true"
                className="basic-select"
                classNamePrefix="select"/>
        </div>
    }

    function Names({reqLast}) {
        return <div id="names">
            <TextField id="firstName" label = "First name" variant='outlined' required={true}
            {...(firstName !== null ? { value: firstName } : {})}/>
            <TextField id="lastName" label = "Last name" variant='outlined' required= {reqLast} disabled={!reqLast}/>
        </div>
    }

    function Specie(required) {
        return <div id="specie">
            <TextField id="specie" label = "Specie" variant='outlined' required={required}/>
        </div>
    }

    function Image() {
        return <div>
            <img src={(`${ENDPOINTS.BACKEND_URL}${character?.imageUrl}`)} />
        </div>
    }

    function DatePlanet({year, planet, event}) {
        const [era, setEra] = useState("BBY");
        const reqYear = year !== null;
        const reqPlanet = planet !== undefined;

        const handleToggle = () => {
            setEra((prevEra) => (prevEra === "BBY" ? "ABY" : "BBY"));
        };

        return <div className='event'>
            <NumberField.Root id = {`${event}Year`} disabled = {!reqYear} required={reqYear} className="numberRoot">
                <NumberField.ScrubArea>
                    <label htmlFor={`${event}Year`}>
                        {`${event} year`}
                    </label>
                </NumberField.ScrubArea>
                <NumberField.Group className="numberField">
                    <NumberField.Input 
                        placeholder={`${event} year`}/>
                </NumberField.Group>
            </NumberField.Root>
            <FormControlLabel
                control={
                    <Switch
                        checked={era === "ABY"}
                        disabled = {year === null}
                        onChange={handleToggle}
                        color="primary"
                    />
                }
                label={era}
                labelPlacement="end"
            />
            <input type="hidden" name ={`${event}Era`} value={era}/>
            <TextField id={`${event}Planet`} label = {`${event} planet`} variant = "outlined"
                disabled = {!reqPlanet} required={reqPlanet}/>
        </div>
    }

    function Allegiances() {
        return <>
                <Select
                    isMulti
                    name="allegiances"
                    required={true}
                    options={allAllegiances.map((a) =>
                        ({value: a, label: a}))}
                    className="basic-multi-select"
                    classNamePrefix="select"/>
            </>
    }

    function onSubmit2(event) {
        event.preventDefault();
        console.log([...(new FormData(event.target)).entries()]);
    }
    
    return <div id = "master" className='row'>
        <div className="formDiv">
            <form onSubmit={onSubmit2}>
                <Category />
                <Names reqLast={character?.lastName !== null} />
                <Specie />
                <div className='row dates'>
                    <DatePlanet year={character?.birthDate} planet={character?.birthPlanet} event={"Birth"} />
                    <DatePlanet year={character?.deathDate} planet={character?.deathPlanet} event={"Death"} />
                </div>
                <Allegiances />
                <div id="button">
                    <button disabled={false} type="submit">Submit</button>
                </div>
            </form>
        </div>
        <Image />
    </div>
}

export default IdentityBox;