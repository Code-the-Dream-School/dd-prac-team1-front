import React, { useState, useEffect } from "react";
import { Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { getAllData } from "./util/index";

const URL = "http://localhost:3000/api/v1/";

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
    <>
      <Heading>{message}</Heading>
      <Link as={RouterLink} to="/home">
        HOME
      </Link>
    </>
  );
}

export default App;
