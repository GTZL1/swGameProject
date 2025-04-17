import Character from './character.js';
import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { TextField, FormControlLabel, Switch } from '@mui/material';
import Select from 'react-select';
import { NumberField } from '@base-ui-components/react/number-field';
import axios from 'axios';
import './identity.css';
import Utils from './utils.js';

export const BBY = "BBY";
export const ABY = "ABY";

const IdentityBox = () => {
    const [allCharIds, setAllCharIds] = useState([]);
    const [character, setCharacter] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [nbChars, setNbChars] = useState(1);
    const [allCategories, setAllCategories] = useState([]);
    const [allAllegiances, setAllAllegiances] = useState([]);
    const { i18n,t } = useTranslation();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [specie, setSpecie] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [birthPlanet, setBirthPlanet] = useState(null);
    const [deathDate, setDeathDate] = useState(null);
    const [deathPlanet, setDeathPlanet] = useState(null);
    const [birthEra, setBirthEra] = useState(null);
    const [deathEra, setDeathEra] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAllegiances, setSelectedAllegiances] = useState([]);

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
                    response.data.birthPlanet?.name,
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
        return <div > 
            <Select
                {...(selectedCategory !== null ?
                    {value: ({value : selectedCategory, label : selectedCategory})} : {})}
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
            <TextField id="lastName" label = "Last name" variant='outlined' required= {reqLast} disabled={!reqLast}
            {...(lastName !== null ? { value: lastName } : {})}/>
        </div>
    }

    function Specie(required) {
        return <div >
            <TextField id="specie" label = "Specie" variant='outlined' required={required}
                {...(specie !== null ? { value: specie } : {})}/>
        </div>
    }

    function Image() {
        return <div>
            <img src={(`${ENDPOINTS.BACKEND_URL}${character?.imageUrl}`)} />
        </div>
    }

    function DatePlanet({year, planet, event, stateEra, stateDate, statePlanet}) {
        const [era, setEra] = useState(BBY);
        const reqYear = year !== null;
        const reqPlanet = planet !== undefined;

        const handleToggle = () => {
            setEra((prevEra) => (prevEra === BBY ? ABY : BBY));
        };

        return <div className='event'>
            <NumberField.Root id = {`${event.toLowerCase()}Year`} disabled = {!reqYear} required={reqYear} className="numberRoot">
                <NumberField.ScrubArea>
                    <label htmlFor={`${event.toLowerCase()}Year`}>
                        {`${event} year`}
                    </label>
                </NumberField.ScrubArea>
                <NumberField.Group className="numberField">
                    <NumberField.Input 
                        placeholder={`${event} year`}
                        {...(stateDate !== null ? { value: stateDate } : {})}/>
                </NumberField.Group>
            </NumberField.Root>
            <FormControlLabel
                control={
                    <Switch
                        checked={era === ABY}
                        disabled = {!reqYear || (stateEra !== null)}
                        onChange={handleToggle}
                        color="primary"
                        {...(stateEra !== null ? { value: stateEra } : {})}/>
                }
                label={era}
                labelPlacement="end"/>
            <input type="hidden" name ={`${event}Era`} value={era}/>
            <TextField id={`${event.toLowerCase()}Planet`} label = {`${event} planet`} variant = "outlined"
                disabled = {!reqPlanet} required={reqPlanet}
                {...(statePlanet !== null ? { value: statePlanet } : {})}/>
        </div>
    }

    function Allegiances() {
        return <>
                <Select
                    isMulti
                    {...(selectedAllegiances.length > 0 ?
                        {defaultValue: (selectedAllegiances.map((a) =>
                            ({value : a, label : a})))} : {})}
                    name="allegiances"
                    required={true}
                    options={allAllegiances.map((a) =>
                        ({value: a, label: a}))}
                    className="basic-multi-select"
                    classNamePrefix="select"/>
            </>
    }

    function checkAnswers(event) {
        event.preventDefault();
        const botheringFields = [...(new FormData(event.target)).entries()];
        const elements = event.target.elements;
        
        Utils.checkTextAnswer(botheringFields[0][1], character.category,
            character.category, setSelectedCategory);
        Utils.checkTextAnswer(elements.firstName.value.toLowerCase(),
            character.firstName.toLowerCase(), character.firstName, setFirstName);
        if(character.lastName !== null) {
            Utils.checkTextAnswer(elements.lastName.value.toLowerCase(),
                character.lastName.toLowerCase(), character.lastName, setLastName);
        }
        Utils.checkTextAnswer(elements.specie.value.toLowerCase(),
            character.specie.toLowerCase(), character.specie, setSpecie);

        if(character.birthDate !== null) {
            Utils.checkYearAnswer(elements.birthYear.value, character.birthDate,
                elements.BirthEra.value, setBirthDate, setBirthEra);
        }
        if(character.birthPlanet !== null) {
            Utils.checkTextAnswer(elements.birthPlanet.value.toLowerCase(),
            character.birthPlanet.toLowerCase(), character.birthPlanet, setBirthPlanet);
        }
        if(character.deathDate !== null) {
            Utils.checkYearAnswer(elements.deathYear.value, character.deathDate,
                elements.DeathEra.value, setDeathDate, setDeathEra);
        }
        if(character.deathPlanet !== undefined) {
            Utils.checkTextAnswer(elements.deathPlanet.value.toLowerCase(),
            character.deathPlanet.toLowerCase(), character.deathPlanet, setDeathPlanet);
        }
    }

    return <div id = "master" className='row'>
        <div className="formDiv">
            <form onSubmit={checkAnswers}>
                <Category />
                <Names reqLast={character?.lastName !== null} />
                <Specie />
                <div className='row dates'>
                    <DatePlanet year={character?.birthDate} planet={character?.birthPlanet}
                        event={"Birth"} stateEra={birthEra} stateDate={birthDate} statePlanet={birthPlanet} />
                    <DatePlanet year={character?.deathDate} planet={character?.deathPlanet}
                        event={"Death"} stateEra={deathEra} stateDate={deathDate} statePlanet={deathPlanet} />
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