import axios from "axios";
import { AIRecipe, SavedRecipe, EditedRecipe, ManualRecipe } from "./types";

export const register = (name: string, email: string, password: string) => {
  return axios.post(
    "http://localhost:3000/api/v1/auth/register",
    {
      username: name,
      email: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const login = (email: string, password: string) => {
  return axios.post(
    "http://localhost:3000/api/v1/auth/login",
    {
      email: email,
      password: password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const logout = () => {
  return axios.post("http://localhost:3000/api/v1/auth/logout");
};

export const searchAI = (search: string, values: Array<string>) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    "http://localhost:3000/api/v1/recipes/",
    {
      query: search,
      optionValues: values
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const saveRecipe = (recipe: AIRecipe) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    "http://localhost:3000/api/v1/recipes/add-ai",
    {
      ...recipe
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const saveManualRecipe = (recipe: ManualRecipe) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    "http://localhost:3000/api/v1/recipes/add-manual",
    {
      ...recipe
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getRecipe = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get("http://localhost:3000/api/v1/recipes/", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const getSingleRecipe = (recipeId: string) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.get(`http://localhost:3000/api/v1/recipes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const editSingleRecipe = (
  recipeId: string,
  recipe: SavedRecipe | EditedRecipe
) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.patch(
    `http://localhost:3000/api/v1/recipes/${recipeId}`,
    {
      ...recipe
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const deleteSingleRecipe = (recipeId: string) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.delete(`http://localhost:3000/api/v1/recipes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const saveRecipeIngredientsToShoppingList = (recipeId: string) => {
  const jwtToken = sessionStorage.getItem("jwtToken");

  return axios.post(
    `http://localhost:3000/api/v1/shopping-list/${recipeId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getIngredientsFromShoppingList = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");

  return axios.get("http://localhost:3000/api/v1/shopping-list", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};
