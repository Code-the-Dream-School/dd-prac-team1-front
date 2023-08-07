import axios from "axios";
import { AIRecipe } from "./types";

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

export const searchAI = (search: string, values: Array<string>) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  console.log(values);
  return axios.post(
    "http://localhost:3000/api/v1/ai-recipe",
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
    "http://localhost:3000/api/v1/ai-recipe/add",
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
