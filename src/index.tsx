import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Home from "./components/Layout/Home";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Contact from "./components/Contact";
import SearchAI from "./components/RecipeAI/SearchAI";
import SearchChoice from "./components/Search/SearchChoice";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";
import Layout from "./components/Layout/Layout";
import SingleRecipePage from "./components/SingleRecipePage/SingleRecipePage";
import NotFound from "./components/404";
import EditRecipe from "./components/EditRecipe";
import Planner from "./components/Planner";
import ShoppingList from "./components/ShoppingList";
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
        <Route path="/contact" element={<Contact />} />
        <Route element={<Layout />}>
          <Route path="/search-choice" element={<SearchChoice />} />
          <Route path="/ai-recipe" element={<SearchAI />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/saved-recipes/:slug" element={<SingleRecipePage />} />
          <Route path="/edit/:slug" element={<EditRecipe />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
