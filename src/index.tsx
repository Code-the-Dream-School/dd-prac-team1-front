import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import Home from "./components/Layout/Home";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Contact from "./components/Layout/Contact";
import Footer from "./components/Layout/Footer";
import OurTeam from "./components/Layout/OurTeam";
import SearchAI from "./components/RecipeAI/SearchAI";
import SearchChoice from "./components/Search/SearchChoice";
import SavedRecipes from "./components/SavedRecipes/SavedRecipes";
import Layout from "./components/Layout/Layout";
import SingleRecipePage from "./components/SingleRecipePage/SingleRecipePage";
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Planner from "./components/Planner/Planner";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import NotFound from "./components/Layout/NotFound";
import theme from "./CustomTheme";
import RecipeManual from "./components/RecipeManual/RecipeManual";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Box minHeight="100vh" width="100%" display="flex" flexDirection="column">
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box flexGrow={1}>
          <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/search-choice" element={<SearchChoice />} />
              <Route path="/ai-recipe" element={<SearchAI />} />
              <Route path="/manual-recipe" element={<RecipeManual />} />
              <Route path="/saved-recipes" element={<SavedRecipes />} />
              <Route
                path="/saved-recipes/:slug"
                element={<SingleRecipePage />}
              />
              <Route path="/edit/:slug" element={<EditRecipe />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer/>
      </BrowserRouter>
    </ChakraProvider>
  </Box>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
