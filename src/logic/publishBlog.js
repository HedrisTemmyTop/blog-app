import axios from "axios";
import API_URL from "../api/URL";
const publishBlog = async (id, token, route, data) => {
  try {
    const response = await axios.put(API_URL + route + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export default publishBlog;
