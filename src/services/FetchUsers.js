import axios from "axios";

axios.defaults.baseURL = "https://6463c3a3043c103502aba3b0.mockapi.io/";

export const fetchUsers = async (page, abortController) => {
  const response = await axios.get("/users", {
    params: {
      page,
      limit: 3,
    },
    signal: abortController.signal,
  });
  return response.data;
};
