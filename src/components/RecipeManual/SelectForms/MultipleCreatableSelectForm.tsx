import React from "react";
import { Box, FormControl } from "@chakra-ui/react";
import {  ChakraStylesConfig, CreatableSelect } from "chakra-react-select";
import { Options } from "../../../utils/types";

const chakraStyles: ChakraStylesConfig = {
    menu: (provided) => ({
        ...provided,
        my: 0,
        borderWidth: "1px",
        borderColor: "green",
        borderRadius: "md"
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

type OptionsProps = {options : Options[]}

const MultipleCreatableSelectForm = ( {options}: OptionsProps ) => (
        <Box>
            <FormControl>
            <CreatableSelect        
                isMulti
                chakraStyles={chakraStyles}
                focusBorderColor="brandGray"
                //selectedOptionColorScheme="green"
                name="colors"
                options={options}
                placeholder="Choose or type tags"
                closeMenuOnSelect={false}
            />  
            </FormControl>
        </Box>
);

export default MultipleCreatableSelectForm;
