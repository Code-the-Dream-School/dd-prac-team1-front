import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { register } from "./fetchData";

//jest.mock(...) is used to automatically mock the axios module.jest.mock('axios');
// Create an object of type of mocked Axios.
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("register()", () => {
  test("should return user login info", async () => {
    // Our desired output
    const userInfo = {
      token: "token",
      username: "Rebekah"
    };

    // Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: userInfo,
      status: 201,
      statusText: "OK",
      headers: {},
      config: { headers: {} as AxiosResponseHeaders }
    };
    // Make the mock return the custom axios response
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    expect(axios.post).not.toHaveBeenCalled();
    const responseData = await register(
      "Rebekah",
      "rebekah@gmail.com",
      "password"
    );
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(responseData.data).toEqual(userInfo);
  });
});
