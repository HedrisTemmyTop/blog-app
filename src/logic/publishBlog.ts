import axios from "axios";
import API_URL from "../api/URL";
import { DataTypes } from "../Interface/ProfileInterface";
const publishBlog = async (
  id: string,
  token: string,
  route: string,
  data: DataTypes
): Promise<any> => {
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
