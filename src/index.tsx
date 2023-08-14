import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Contact from "./components/Contact";
import SearchAI from "./components/SearchAI";
import SearchChoice from "./components/SearchChoice";
import SavedRecipes from "./components/SavedRecipes";
import Layout from "./components/Layout";
import SingleRecipePage from "./components/SingleRecipePage";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<Layout />}>
          <Route path="/search-choice" element={<SearchChoice />} />
          <Route path="/ai-recipe" element={<SearchAI />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/saved-recipes/:slug" element={<SingleRecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
