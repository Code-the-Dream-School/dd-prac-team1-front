import React from "react";
import { Text } from "@chakra-ui/react";

type InstructionProps = { instruction: string };

const InstructionList = ({ instruction }: InstructionProps) => {
  return <Text>{instruction}</Text>;
};
export default InstructionList;
