import { TextField } from '@mui/material';
import { FONT_NAME_PART_TO_REMOVE } from '../../../constants/constants.js';
import { useFont } from '../../../context/FontContext.js';

const TextInput = ( {id, label, required, disabled, value, width} ) => {
    const { contentFont } = useFont();

    return <>
        <TextField id={id} label = {label} variant='outlined' required={required} disabled={disabled}
            size='small' {...(value !== null ? { value: value } : {})}
            slotProps={{
                input : {
                    className: "bg-gray-100 rounded-lg text-black"
                },
            }}
            sx={{
                width: {width},
                "& .MuiInputBase-input": {
                    fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                },                 
                "& .MuiInputLabel-root": {
                    fontFamily: `${contentFont.replace(FONT_NAME_PART_TO_REMOVE, '')}, sans-serif`,
                    color: "gray text-2xs",
                }
            }} />
    </>
}

export default TextInput;