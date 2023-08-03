import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App.tsx";
import Home from "./components/Home.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import SearchAI from "./components/SearchAI.tsx";
import SearchChoice from "./components/SearchChoice.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai-recipe" element={<SearchAI />} />
        <Route path="/search-choice" element={<SearchChoice />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
