import React, { useState, useEffect } from "react";
import { Input, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { SavedIngredient } from "../utils/types";

type IngredientAmountHandleProps = {
  ingredient: SavedIngredient;
  onChange: Function;
};

const IngredientAmountHandle = ({
  ingredient,
  onChange
}: IngredientAmountHandleProps) => {
  const [mode, setMode] = useState<number>(0);
  useEffect(() => {
    if (ingredient.ingredientAmount === 0) setMode(1);
  }, [ingredient.ingredientAmount]);
  return (
    <Flex w="80%" justifyContent="center">
      {mode === 0 && (
        <FormControl marginRight="3" w="40%">
          <FormLabel></FormLabel>
          <Input
            size="sm"
            name="ingredientAmount"
            type="number"
            value={ingredient.ingredientAmount}
            onChange={e => {
              onChange(e.target.value);
            }}
          />
        </FormControl>
      )}
      <FormControl w="80%" marginRight="7">
        <FormLabel></FormLabel>
        <Select
          size="sm"
          value={mode}
          onChange={e => {
            setMode(Number(e.target.value));
            onChange(e.target.value);
          }}>
          <option value="1" disabled>
            Choose amount
          </option>
          <option value="0">enter quantity</option>
          <option value="-1">to taste</option>
          <option value="-2">for serving</option>
          <option value="-3">for garnish</option>
        </Select>
      </FormControl>
    </Flex>
  );
};
export default IngredientAmountHandle;
