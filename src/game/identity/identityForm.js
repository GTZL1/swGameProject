import Character from './character.js';
import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import { useFont } from '../../context/FontContext.js';
import axios from 'axios';
import '../common.css';
import Utils from './utils.js';
import InfoBubble from '../help/infoBubble.js';
import TextInput from './fields/textInput.js';
import DatePlanet from './fields/datePlanet.js';
import { FLAG_FILES, FONT_NAME_PART_TO_REMOVE } from '../../constants/constants.js';
import LoadingScreen from '../help/loadingScreen.js';

export const BBY = "BBY";
export const ABY = "ABY";

const IdentityForm = ({characterDocId, allCorrect, isNoob, setAllCorrect, setIsNoob, answerProps}) => {
    const [allCategories, setAllCategories] = useState([]);
    const [allAllegiances, setAllAllegiances] = useState([]);
    const { i18n,t } = useTranslation();
    const { contentFont } = useFont();
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
    const [birthRemount, setBirthRemount] = useState(0);
    const [deathRemount, setDeathRemount] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedAllegiances, setSelectedAllegiances] = useState([]);
    const [allegiancesAreCorrect, setAllegiancesAreCorrect] = useState(false);

    const [loading, setLoading] = useState(true);

    const AllegiancesAnswerStatus = {
        TOO_MANY : "too_many",
        WRONG : "wrong",
        NOT_ENOUGH : "not_enough",
        NOTHING_DISPLAY : "nothing"
    }
    const [allegiancesStatus, setAllegiancesStatus] = useState(AllegiancesAnswerStatus.NOTHING_DISPLAY);

    useEffect(() => {
        if (!characterDocId) return;

        setAllCorrect(null);
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
        setLoading(true);
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
                    response.data.imageUrl));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function Category () {
        return <div className='pb-3'> 
            <Select
                {...(selectedCategory !== null ?
                    {value: ({value : selectedCategory, label : selectedCategory})} : {})}
                name="categories"
                options={allCategories.map((a) =>
                    ({value: a, label: a}))}
                placeholder = {t('identity.category')}
                required="true"
                className="basic-select"
                classNamePrefix="select"
                menuPortalTarget={document.body} 
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                        fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                    }),
                }}/>
        </div>
    }

    function Names({reqLast}) {
        const namesWidth="48%";
        return <div className='flex justify-between pb-3'>
            <TextInput id="firstName" label = {t('identity.first_name')} required={true} disabled={false}
                value={firstName} width={namesWidth} />
            <TextInput id="lastName" label = {t('identity.last_name')} required= {reqLast} disabled={!reqLast}
                value={lastName} width={namesWidth} />
        </div>
    }

    function Specie() {
        return <div className='pb-3'><TextInput id="specie" label={t('identity.specie')}
            required={true} disabled={false} value= {specie} width="48%"/></div>
    }

    function BirthDeath() {
        return <>
            <DatePlanet key={`${birthDate}-${birthEra}-${birthPlanet}-${birthRemount}-1`}
                year={character?.birthDate} planet={character?.birthPlanet}
                event={"Birth"} stateEra={birthEra} stateDate={birthDate} statePlanet={birthPlanet} dateSetter={setBirthDate}/>
            <DatePlanet key={`${deathDate}-${deathEra}-${deathPlanet}-${deathRemount}-2`}
                year={character?.deathDate} planet={character?.deathPlanet}
                event={"Death"} stateEra={deathEra} stateDate={deathDate} statePlanet={deathPlanet} dateSetter={setDeathDate}/>
        </>
    }

    function Allegiances() {
        return <div className='pb-3'>
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

                    { allegiancesStatus !== AllegiancesAnswerStatus.NOTHING_DISPLAY && (
                        <p className='text-xs text-center text-red-800 mt-0'>{t(`identity.${allegiancesStatus}`)} </p>
                    )} 
            </div>
    }

    function noobButton() {
        setFirstName(character.firstName);
        setSpecie(character.specie);
        if (character.lastName !== null) {
            setLastName(character.lastName);
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
        setAllCorrect(false);
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
            setBirthRemount(prev => prev + 1);
        }
        if(character.birthPlanet !== undefined) {
            result = Utils.checkTextAnswer(elements.birthPlanet.value.toLowerCase(),
                character.birthPlanet.toLowerCase(), character.birthPlanet, setBirthPlanet) && result;
            setBirthRemount(prev => prev + 1)
        }
        if(character.deathDate !== null) {
            result = Utils.checkYearAnswer(elements.deathYear.value, character.deathDate,
                elements.DeathEra.value, setDeathDate, setDeathEra) && result;
            setDeathRemount(prev => prev + 1);
        }
        if(character.deathPlanet !== undefined) {
            result = Utils.checkTextAnswer(elements.deathPlanet.value.toLowerCase(),
                character.deathPlanet.toLowerCase(), character.deathPlanet, setDeathPlanet) && result;
            setDeathRemount(prev => prev + 1);
        }
        
        const inputs = botheringFields.slice(allegiancesIndex).map((a) => a[1]); 
        setSelectedAllegiances(inputs);
        const allCheck = (inputs.every((a) => 
            Utils.translateAllegiances(character.allegiances, i18n, t).includes(a)))
            && (inputs.length === character.allegiances.length);
        setAllegiancesAreCorrect(allCheck);

        if (!allCheck) {
            if (inputs.length < character.allegiances.length) {
                setAllegiancesStatus(AllegiancesAnswerStatus.NOT_ENOUGH);
            } else if (inputs.length > character.allegiances.length) {
                setAllegiancesStatus(AllegiancesAnswerStatus.TOO_MANY);
            } else {
                setAllegiancesStatus(AllegiancesAnswerStatus.WRONG);
            }
        } else {
            setAllegiancesStatus(AllegiancesAnswerStatus.NOTHING_DISPLAY);
        }

        result = allCheck && result;

        setAllCorrect(result);
    }

    function Image() {
        return <>{character.imageUrl !== undefined &&
            <img src={(`${ENDPOINTS.IMAGE_BACKEND_URL}${character.imageUrl}`)}
            className='min-w-64 max-w-[30vw] max-h-[30rem] mx-3 mb-5 question-div self-start' />}
        </>;
    }

    return <div className='flex flex-wrap justify-center'>
        {loading ? <LoadingScreen flagFiles = {FLAG_FILES} /> : <>
            <Image />
            <div className='flex flex-col items-center'>
                <form onSubmit={checkAnswers} className='w-[55vw] min-w-96 mx-3 mb-4 px-5 py-3 question-div flex flex-col justify-center items-center'>
                    <Category />
                    <div className='items-start w-full'>
                        <Names reqLast={character?.lastName !== null} />
                        <Specie />
                        <BirthDeath />
                    </div>
                    <Allegiances />
                    <button disabled={(allCorrect || isNoob)} type="submit" className='mb-3'>{t('identity.submit')}</button>
                    <button disabled={(allCorrect || isNoob)} onClick={noobButton} className='text-xs'>{t('identity.noob_button')}</button>
                    {answerProps}
                </form>
                {!(allCorrect || isNoob) &&
                    <InfoBubble helpMessage={t('identity.help_message')} />}
            </div>
        </>}
    </div>
}

export default IdentityForm;