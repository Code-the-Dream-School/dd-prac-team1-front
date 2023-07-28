import axios from "axios";

// note: not used, but could be used with GET with params
const getData = async (url, params) => {
  try {
    let res = await axios.get(url, params);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
    return error;
  }
};

const getAllData = async (url) => {
  try {
    let res = await axios.get(url);
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
    throw error;
  }
};

export { getData, getAllData };
