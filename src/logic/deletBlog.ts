import API_URL from "../api/URL";
import axios from "axios";

const deleteBlog = async (id: string, token: string): Promise<any> => {
  try {
    const response = await axios.delete(API_URL + "blogs/" + id, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default deleteBlog;
