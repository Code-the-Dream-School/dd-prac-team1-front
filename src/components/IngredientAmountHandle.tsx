import React, { useState, useEffect } from "react";
import { Input, Flex, FormControl, Select } from "@chakra-ui/react";
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
    <Flex justifyContent="center">
      <FormControl mr="2">
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
      {mode === 0 && (
        <FormControl w="40%">
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
    </Flex>
  );
};
export default IngredientAmountHandle;
