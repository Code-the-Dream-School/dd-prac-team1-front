import React from "react";
import {
    Box,
    FormControl,

} from "@chakra-ui/react";
import {  ChakraStylesConfig, Select } from "chakra-react-select";
import { Options } from "../../../utils/types";

const chakraStyles: ChakraStylesConfig = {
    menu: (provided) => ({
        ...provided,
        my: 0,
        borderWidth: "1px",
        borderColor: "#D7DA5E",
        borderRadius: "md"
    }),
    dropdownIndicator: (prev, { selectProps: { menuIsOpen } }) => ({
        ...prev,
        bg: "#D7DA5E",
        "> svg": {
            transitionDuration: "normal",
            transform: `rotate(${menuIsOpen ? -180 : 0}deg)`
        }
    })
    };

type OptionsProps = {options : Options[]}

const MultipleSelectForm = ( {options}: OptionsProps) => (
        <Box  sx={{
            '--green': "#D7DA5E",
            '.chakra-react-select': {
            "borderColor": 'var(--green)',
            
            },
        }}>
            <FormControl>
            <Select        
                className="chakra-react-select"
                classNamePrefix="chakra-react-select"
                isMulti
                chakraStyles={chakraStyles}
                focusBorderColor='#F4F4EB'
              //  selectedOptionColorScheme="green"
                name="colors"
                options={options}
                placeholder="Choose a special diet"
                closeMenuOnSelect={false}
            />  
            </FormControl>
        </Box>
);

export default MultipleSelectForm;
