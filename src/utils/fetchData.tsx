import axios from "axios";
import {
  AIRecipe,
  SavedRecipe,
  EditedRecipe,
  ManualRecipe,
  SavedIngredient
} from "./types";

const jwtToken = sessionStorage.getItem("jwtToken");

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
  return axios.get("http://localhost:3000/api/v1/recipes/", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const getSingleRecipe = (recipeId: string) => {
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
  return axios.delete(`http://localhost:3000/api/v1/recipes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const saveRecipeIngredientsToShoppingList = (
  recipeId: string,
  servingSize: number
) => {
  return axios.post(
    `http://localhost:3000/api/v1/shopping-list/${recipeId}`,
    { servingSize },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const getIngredientsFromShoppingList = () => {
  return axios.get("http://localhost:3000/api/v1/shopping-list", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const addIngredientToShoppingList = (ingredient: SavedIngredient) => {
  return axios.post(
    "http://localhost:3000/api/v1/shopping-list/add-ingredient",
    { ...ingredient },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const editAnIngredientFromShoppingList = (
  ingredient: SavedIngredient
) => {
  const ingredientName = ingredient.ingredientName;
  const ingredientAmount = ingredient.ingredientAmount;
  const uri = `http://localhost:3000/api/v1/shopping-list/${ingredientName}`;
  return axios.put(
    encodeURI(uri),
    { ingredientAmount: ingredientAmount },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};

export const deleteAnIngredientFromShoppingList = (ingredientName: string) => {
  const uri = `http://localhost:3000/api/v1/shopping-list/${ingredientName}`;
  return axios.delete(encodeURI(uri), {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const deleteAllShoppingList = () => {
  return axios.delete("http://localhost:3000/api/v1/shopping-list/", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwtToken}`
    }
  });
};

export const shareShoppingList = (email: string) => {
  return axios.post(
    "http://localhost:3000/api/v1/shopping-list/share",
    { recipientEmail: email },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};
