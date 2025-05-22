import ENDPOINTS from '../../constants/endpoints.js';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import IdentityForm from './identityForm.js';

const IdentityBox = () => {
    const [allCharIds, setAllCharIds] = useState([]);
    const [characterDocId, setCharacterDocId] = useState(null);
    const [alreadyUsedIds, setAlreadyUsedIds] = useState([]);
    const [nbChars, setNbChars] = useState(1);
    const { i18n, t } = useTranslation();

    const [allCorrect, setAllCorrect] = useState(null);
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

    function fetchCharacter(allDocIds, docId = null) {
        if (docId === null) {
            do {
                docId = allDocIds[Math.floor(Math.random() * allDocIds.length)];
            } while (alreadyUsedIds.includes(docId));
        }
        setAlreadyUsedIds([...alreadyUsedIds, docId]);
        setCharacterDocId(docId);
    }

    function answerMessage(isNoob) {
        return (isNoob ? t('identity.noob') : t('identity.new_character_message'));
    }

    return <div id = "master" className='flex flex-wrap'>
        <IdentityForm characterDocId={characterDocId}
            allCorrect={allCorrect}
            isNoob={isNoob}
            setAllCorrect={setAllCorrect}
            setIsNoob={setIsNoob}
            answerProps={
                (allCorrect || isNoob) && (<>
                    <div className='pt-2 pb-1'>{answerMessage(isNoob)}</div>
                    <button onClick={() => {
                        fetchCharacter(allCharIds);
                        setNbChars(nbChars + 1);
                    }}
                        disabled = { nbChars === allCharIds.length }>{t('identity.new_character_button')}</button>
                </>)}
        />
    </div>
}

export default IdentityBox;