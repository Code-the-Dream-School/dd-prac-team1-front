import React, { useState, useEffect } from "react";
import { ChakraProvider, Heading } from "@chakra-ui/react";

import { getAllData } from "./util/index";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <ChakraProvider>
      <Heading>{message}</Heading>
    </ChakraProvider>
  );
}

export default App;
