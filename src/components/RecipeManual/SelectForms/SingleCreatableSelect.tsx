import React from "react";
import { Box, FormControl } from "@chakra-ui/react";
import { ActionMeta, ChakraStylesConfig, CreatableSelect } from "chakra-react-select";
import { Options } from "../../../utils/types";

const chakraStyles: ChakraStylesConfig = {
    menu: (provided) => ({
        ...provided,
        my: 0,
        borderWidth: "1px",
        borderColor: "green",
        borderRadius: "md"
    }),
    placeholder: (provided) => ({
        ...provided,
        position:"absolute", 
        marginTop: "0", 
        fontSize: "xs"
    }),
    dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
        ...prev,
        bg: "green",
        "> svg": {
            transitionDuration: "normal",
            transform: `rotate(${menuIsOpen ? -180 : 0}deg)`
        }
    }),
    multiValue: (base) => ({
        ...base,
        backgroundColor: "green", 
        color: "black", 
        borderRadius: "md",
    }),
    option: (base, { isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? "green" : "white",
        color: "black",
        cursor: "pointer",
        transition: "background-color 0.2s",
        _hover: {
            backgroundColor: "brandGray", 
        },
    }),
    };

type OptionsProps = {
    options : Options[],   
    value: Options,
    onChange: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined,
};
    

const SingleCreatableSelect = ( { options, onChange }: OptionsProps ) => {
    const handleInputChange = (inputValue: string) => {
        const sanitizedValue = inputValue.replace(/[^\d.]/g, "");
        return sanitizedValue;
    };
    
    const isValidNewOption = (inputValue: string) => {
        return /^[\d.]+$/.test(inputValue);
    };
    
    return(
        <Box>
            <FormControl>
            <CreatableSelect        
                isMulti={false}
                options={options}
                chakraStyles={chakraStyles}
                focusBorderColor="green"
                placeholder='Choose or enter amount'
                closeMenuOnSelect
                onInputChange={handleInputChange}
                isValidNewOption={isValidNewOption}
                onChange={onChange}
            />  
            </FormControl>
        </Box>
    )
};

export default SingleCreatableSelect;
