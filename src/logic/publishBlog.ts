import axios from "axios";
import API_URL from "../api/URL";
import { DataTypes } from "../Interface/ProfileInterface";
import { authReq } from "./../interceptor/axios.js";
const publishBlog = async (
  id: string,
  route: string,
  data: DataTypes | string
): Promise<any> => {
  try {
    const response = await authReq.put(route + id, data);
    return response;
  } catch (error) {
    return error;
  }
};
export default publishBlog;
