import axios from "axios";
import API_URL from "../api/URL";
const publishBlog = async (setIsLoading, id, token, route, data) => {
  try {
    if (setIsLoading) setIsLoading(true);
    const response = await axios.put(API_URL + route + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    setIsLoading(false);
  }
};
export default publishBlog;

// axios
// .put(API_URL + "blogs/" + postId.id, data, {
//   headers: {
//     authorization: `Bearer ${token}`,
//   },
// })
// .then((response) => console.log(response))
// .catch((error) => console.log(error));
