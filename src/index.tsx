import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Contact from "./components/Contact";
import SearchAI from "./components/SearchAI";
import SearchChoice from "./components/SearchChoice";
import SavedRecipes from "./components/SavedRecipes";
import SingleRecipePage from "./components/SingleRecipePage";
import Footer from "./components/Footer";
import OurTeam from "./components/OurTeam";
import theme from "./CustomTheme";
import EditRecipe from "./components/EditRecipe";
import ShoppingList from "./components/ShoppingList";
import Planner from "./components/Planner";
import theme from "./CustomTheme";

import NotFound from "./components/404";
import { Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Box position="absolute" h="100vh" width="100%">
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
            <Route path="/team" element={<OurTeam />} />
            <Route path="/edit/:slug" element={<EditRecipe />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Route>
          <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  </Box>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
