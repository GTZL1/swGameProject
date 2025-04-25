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

const IdentityForm = ({characterDocId, allCorrect, setAllCorrect, setIsNoob}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [allAllegiances, setAllAllegiances] = useState([]);
    const { i18n,t } = useTranslation();
    const [character, setCharacter] = useState([]);
    
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
    const [allegiancesAreCorrect, setAllegiancesAreCorrect] = useState(false);

    useEffect(() => {
        if (!characterDocId) return;

        fetchCharacter();
    }, [characterDocId]);

    useEffect(() => {
        axios
            .get(`${ENDPOINTS.GET_ALL_CATEGORIES}?locale=${i18n.language}`)
            .then((response) => {
                setAllCategories(response.data.data.map((c) => c.name));
            })
            .catch((error) => {
            console.log(error);
            });
        axios
            .get(`${ENDPOINTS.GET_ALL_ALLEGIANCES}`)
            .then((response) => {
                setAllAllegiances(Utils.translateAllegiances(
                    response.data.data.map((c) => c.name), i18n, t));
            })
            .catch((error) => {
            console.log(error);
            });
        
        if (characterDocId) {
            fetchCharacter();
        }
    }, [i18n.language]);

    useEffect(() => {
        setFirstName(null);
        setLastName(null);
        setSpecie(null);
        setBirthDate(null);
        setBirthPlanet(null);
        setDeathDate(null);
        setDeathPlanet(null);
        setBirthEra(null);
        setDeathEra(null);
        setSelectedCategory(null);
        setSelectedAllegiances([]);
        setAllegiancesAreCorrect(false);
        setAllCorrect(null);
        setIsNoob(false);
    }, [character]);

    function fetchCharacter() {
        axios
            .get(`${ENDPOINTS.GET_CHARACTER_PER_DOCID}${characterDocId}&locale=${i18n.language}`)
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
                placeholder = {t('identity.category')}
                required="true"
                className="basic-select"
                classNamePrefix="select"/>
        </div>
    }

    function Names({reqLast}) {
        return <div id="names">
            <TextField id="firstName" label = {t('identity.first_name')} variant='outlined' required={true}
            {...(firstName !== null ? { value: firstName } : {})}/>
            <TextField id="lastName" label = {t('identity.last_name')} variant='outlined' required= {reqLast} disabled={!reqLast}
            {...(lastName !== null ? { value: lastName } : {})}/>
        </div>
    }

    function Specie(required) {
        return <div >
            <TextField id="specie" label = {t('identity.specie')} variant='outlined' required={required}
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
        const yearLabel = `identity.${event.toLowerCase()}_year`;
        const planetLabel = `identity.${event.toLowerCase()}_planet`;
        const eraLabel = `identity.${era}`;
        const handleToggle = () => {
            setEra((prevEra) => (prevEra === BBY ? ABY : BBY));
        };

        return <div className='event'>
            <NumberField.Root id = {`${event.toLowerCase()}Year`} disabled = {!reqYear} required={reqYear} className="numberRoot">
                <NumberField.Group className="numberField">
                    <NumberField.Input 
                        placeholder={t(yearLabel)}
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
                label={t(eraLabel)}
                labelPlacement="end"/>
            <input type="hidden" name ={`${event}Era`} value={era}/>
            <TextField id={`${event.toLowerCase()}Planet`} label = {t(planetLabel)} variant = "outlined"
                disabled = {!reqPlanet} required={reqPlanet}
                {...(statePlanet !== null ? { value: statePlanet } : {})}/>
        </div>
    }

    function Allegiances() {
        return <>
                <Select
                    isMulti
                    {...(selectedAllegiances.length > 0 && !allegiancesAreCorrect ?
                        {defaultValue: (selectedAllegiances.map((a) =>
                            ({value : a, label : a})))} : {})}
                    {...(allegiancesAreCorrect ?
                        {value: (selectedAllegiances.map((a) =>
                            ({value : a, label : a})))} : {})}
                    name="allegiances"
                    required={true}
                    placeholder={t('identity.allegiances')}
                    options={allAllegiances.map((a) =>
                        ({value: a, label: a}))}
                    className="basic-multi-select"
                    classNamePrefix="select"/>
            </>
    }

    function noobButton() {
        setFirstName(character.firstName);
        setSpecie(character.specie);
        if (character.lastName !== null) {
            setLastName(null);
        }
        
        if (character.birthDate !== null) {
            setBirthDate(character.birthDate);
            character.birthDate < 1 ? setBirthEra(BBY) : setBirthEra(ABY);
        }
        if (character.birthPlanet !== undefined) {
            setBirthPlanet(character.birthPlanet);
        }
        if (character.deathDate !== null) {
            setDeathDate(character.deathDate);
            character.deathDate < 1 ? setDeathEra(BBY) : setDeathEra(ABY);
        }
        if(character.deathPlanet !== undefined) {
            setDeathPlanet(character.deathPlanet);
        }
        
        setSelectedCategory(character.category);
        setSelectedAllegiances(Utils.translateAllegiances(character.allegiances, i18n, t));
        setAllegiancesAreCorrect(true);
        setAllCorrect(true);
        setIsNoob(true);
    }

    function checkAnswers(event) {
        event.preventDefault();
        const botheringFields = [...(new FormData(event.target)).entries()];
        const allegiancesIndex = 3;
        const elements = event.target.elements;
        let result = true;

        result = Utils.checkTextAnswer(botheringFields[0][1], character.category,
            character.category, setSelectedCategory) && result;
        result = Utils.checkTextAnswer(elements.firstName.value.toLowerCase(),
            character.firstName.toLowerCase(), character.firstName, setFirstName) && result;
        if(character.lastName !== null) {
            result = Utils.checkTextAnswer(elements.lastName.value.toLowerCase(),
                character.lastName.toLowerCase(), character.lastName, setLastName) && result;
        }
        result = Utils.checkTextAnswer(elements.specie.value.toLowerCase(),
            character.specie.toLowerCase(), character.specie, setSpecie) && result;
        if(character.birthDate !== null) {
            result = Utils.checkYearAnswer(elements.birthYear.value, character.birthDate,
                elements.BirthEra.value, setBirthDate, setBirthEra) && result;
        }
        if(character.birthPlanet !== undefined) {
            result = Utils.checkTextAnswer(elements.birthPlanet.value.toLowerCase(),
            character.birthPlanet.toLowerCase(), character.birthPlanet, setBirthPlanet) && result;
        }
        if(character.deathDate !== null) {
            result = Utils.checkYearAnswer(elements.deathYear.value, character.deathDate,
                elements.DeathEra.value, setDeathDate, setDeathEra) && result;
        }
        if(character.deathPlanet !== undefined) {
            result = Utils.checkTextAnswer(elements.deathPlanet.value.toLowerCase(),
            character.deathPlanet.toLowerCase(), character.deathPlanet, setDeathPlanet) && result;
        }
        
        const inputs = botheringFields.slice(allegiancesIndex).map((a) => a[1]); 
        setSelectedAllegiances(inputs);
        const allCheck = (inputs.every((a) => 
            Utils.translateAllegiances(character.allegiances, i18n, t).includes(a)))
            && (inputs.length === character.allegiances.length);
        setAllegiancesAreCorrect(allCheck);
        result = allCheck && result;

        setAllCorrect(result);
    }

    return <>
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
                    <button disabled={allCorrect} type="submit">{t('identity.submit')}</button>
                </div>
            </form>
            <button disabled={allCorrect} onClick={noobButton}>{t('identity.noob_button')}</button>
        </div>
        <Image />
    </>
}

export default IdentityForm;