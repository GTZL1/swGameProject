import { useEffect, useState } from 'react';
import { NumberField } from '@base-ui-components/react/number-field';
import { FormControlLabel, Switch } from '@mui/material';
import { FONT_NAME_PART_TO_REMOVE } from '../../../constants/constants.js';
import { useFont } from '../../../context/FontContext.js';
import { BBY, ABY } from '../identityForm.js';
import TextInput from './textInput.js';
import { useTranslation } from "react-i18next";

const DatePlanet = ({year, planet, event, stateEra, stateDate, statePlanet}) => {
        const { contentFont } = useFont();
        const { t } = useTranslation();

        const [era, setEra] = useState(BBY);
        const reqYear = year !== null;
        const reqPlanet = planet !== undefined;
        const yearLabel = `identity.${event.toLowerCase()}_year`;
        const planetLabel = `identity.${event.toLowerCase()}_planet`;
        const eraLabel = `identity.${(stateEra === null ? era : stateEra)}`;

        const handleToggle = () => {
            setEra((prevEra) => (prevEra === BBY ? ABY : BBY));
        };

        return <div className='flex justify-start items-end pb-3'>
            <div className='w-[20%] mr-1'>{t(yearLabel)}</div>
            <div className='flex items-end gap-x-2'>
                <NumberField.Root id = {`${event.toLowerCase()}Year`} disabled = {!reqYear} required={reqYear} className="numberRoot">
                    <NumberField.Group>
                        <NumberField.Input className="w-10 mr-5"
                            {...(stateDate !== null ? { value: stateDate } : {})}/>
                    </NumberField.Group>
                </NumberField.Root>
                <FormControlLabel
                    control={
                        <Switch
                            checked={(era === ABY) || (stateEra === ABY)}
                            disabled = {!reqYear || (stateEra !== null)}
                            onChange={handleToggle}
                            color="primary"
                            size='small'/>
                    }
                    label={t(eraLabel)}
                    labelPlacement="end"
                    sx={{
                        "& .MuiFormControlLabel-label": {
                            fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                        },
                    }}
                />
                <input type="hidden" name={`${event}Era`} value={(stateEra === null ? era : stateEra)}/>

                <span>{t('identity.on')}</span>
                <TextInput id={`${event.toLowerCase()}Planet`} label = {t(planetLabel)}
                    disabled = {!reqPlanet} required={reqPlanet} value={statePlanet} width="60%"/>
            </div>
        </div>
    }

    export default DatePlanet;