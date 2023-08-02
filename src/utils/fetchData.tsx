import axios from "axios";

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

export const searchAI = (search: string, selectOptions: Array<string>) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  return axios.post(
    "http://localhost:3000/api/v1/ai-recipe",
    {
      query: search,
      optionsArray: selectOptions
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      }
    }
  );
};
