import axios from "axios";

export const fetchFollowingUser = async (state) => {
  const response = await axios.put(`/users/${state.id}`, {
    ...state,
    followers: (state.followers -= 1),
  });
  return response.data.followers;
};
