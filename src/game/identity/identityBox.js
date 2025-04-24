import Character from './character.js';
import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import './identity.css';
import IdentityForm from './identityForm.js';

const IdentityBox = () => {
    const [allCharIds, setAllCharIds] = useState([]);
    const [character, setCharacter] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [nbChars, setNbChars] = useState(1);
    const { i18n, t } = useTranslation();

    const [allCorrect, setAllCorrect] = useState(false);
    const [isNoob, setIsNoob] = useState(false);

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

    function RightAnswer() {
        return <div>{t('identity.new_character_message')}</div>
    }

    function WrongAnswer() {
        return <div>{t('identity.noob')}</div>
    }

    return <div id = "master" className='row'>
        <IdentityForm character={character}
        allCorrect={allCorrect}
        setAllCorrect={setAllCorrect}
        setIsNoob={setIsNoob} />
        <div>
                {allCorrect && (<>
                    { isNoob ? <WrongAnswer /> : <RightAnswer />}
                    <button onClick={() => {
                        fetchCharacter(allCharIds);
                        setNbChars(nbChars + 1);
                    }}
                    disabled = { nbChars === allCharIds.length }>{t('identity.new_character_button')}</button></>
                )}
        </div>
    </div>
}

export default IdentityBox;