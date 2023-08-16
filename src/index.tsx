import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchAI from "./components/SearchAI";
import SearchChoice from "./components/SearchChoice";
import SavedRecipes from "./components/SavedRecipes";
import Layout from "./components/Layout";
import SingleRecipePage from "./components/SingleRecipePage";
import EditRecipe from "./components/EditRecipe";
import ShoppingList from "./components/ShoppingList";
import Planner from "./components/Planner";
import theme from "./CustomTheme";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/search-choice" element={<SearchChoice />} />
          <Route path="/ai-recipe" element={<SearchAI />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/saved-recipes/:slug" element={<SingleRecipePage />} />
          <Route path="/edit/:slug" element={<EditRecipe />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
