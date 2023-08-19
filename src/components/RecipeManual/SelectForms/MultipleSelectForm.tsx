import React from "react";
import {
    Box,
    FormControl,

} from "@chakra-ui/react";
import {   ActionMeta, ChakraStylesConfig, MultiValue, Select } from "chakra-react-select";
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
        marginTop: "-3", 
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
    onChange: ((newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void) | undefined,
}

const MultipleSelectForm = ( {options, onChange}: OptionsProps) => (
        <Box>
            <FormControl>
            <Select
                isMulti
                chakraStyles={chakraStyles}
                focusBorderColor="green"
                options={options}
                placeholder="Choose a special diet"
                closeMenuOnSelect={false}
                onChange={onChange}
            />  
            </FormControl>
        </Box>
);

export default MultipleSelectForm;
