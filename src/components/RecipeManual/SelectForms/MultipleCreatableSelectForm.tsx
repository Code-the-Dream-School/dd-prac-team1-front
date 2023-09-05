import React from "react";
import { Box, FormControl } from "@chakra-ui/react";
import {
  ActionMeta,
  ChakraStylesConfig,
  CreatableSelect,
  MultiValue
} from "chakra-react-select";

const chakraStyles: ChakraStylesConfig = {
  placeholder: provided => ({
    ...provided,
    position: "absolute",
    marginTop: "-2",
    fontSize: "xs"
  }),
  dropdownIndicator: () => ({
    display: "none"
  }),
  option: () => ({
    display: "none"
  }),
  menu: () => ({
    display: "none"
  }),
  multiValue: base => ({
    ...base,
    backgroundColor: "green",
    color: "black",
    borderRadius: "md"
  }),
  indicatorSeparator: () => ({
    display: "none"
  })
};

type OptionsProps = {
  onChange:
    | ((newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void)
    | undefined;
};

const MultipleCreatableSelectForm = ({ onChange }: OptionsProps) => (
  <Box>
    <FormControl>
      <CreatableSelect
        isMulti
        chakraStyles={chakraStyles}
        focusBorderColor="green"
        placeholder='Type a tag, for ex. "fiest", and press ENTER'
        closeMenuOnSelect={false}
        onChange={onChange}
      />
    </FormControl>
  </Box>
);

export default MultipleCreatableSelectForm;
