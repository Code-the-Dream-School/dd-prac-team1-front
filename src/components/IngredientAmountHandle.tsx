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
  const [mode, setMode] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (ingredient.ingredientAmount >= 0) setMode(0);
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
      <FormControl w="80%">
        <FormLabel></FormLabel>
        <Select
          size="sm"
          value={ingredient.ingredientAmount}
          placeholder="Choose amount"
          onChange={e => {
            setMode(Number(e.target.value));
            onChange(e.target.value);
          }}>
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
