import React from "react";
import {
    Box,
    FormControl,

} from "@chakra-ui/react";
import {   ChakraStylesConfig, Select } from "chakra-react-select";
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
    })
    };

type OptionsProps = {
    options : Options[],   
    onChange: Function,
}

const MultipleSelectForm = ( {options, onChange}: OptionsProps) => (
        <Box>
            <FormControl>
            <Select
                isMulti
                chakraStyles={chakraStyles}
                focusBorderColor="brandGray"
                //selectedOptionColorScheme="brandGray"
                options={options}
                placeholder="Choose a special diet"
                closeMenuOnSelect={false}
                onChange={onChange}
            />  
            </FormControl>
        </Box>
);

export default MultipleSelectForm;
