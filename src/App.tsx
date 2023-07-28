import React, { useState, useEffect } from "react";
import { Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { getAllData } from "./utils";

const URL = "http://localhost:3000/api/v1/";

function App() {
  const [message, setMessage] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("black");

  useEffect(() => {
    getAllData(URL)
      .then((response) => setMessage(response.data))
      .catch((error) => {
        setTextColor("red");
        setMessage(error.message);
      });

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <>
      <Heading>Welcome to Our App</Heading>
      <Link as={RouterLink} to="/home">
        HOME
      </Link>

      <Text
        color={textColor}
      >{`Response from request to ${URL}: ${message}`}</Text>
    </>
  );
}

export default App;
