import { sortBlogs } from "../../Interface/sortBlogsInterface";
import Pagination from "../../logic/pagination";
import Articles from "../ui/articles/articles";
import { useOutletContext } from "react-router-dom";
const Published = () => {
  const {
    darkTheme,
    sortedBlogs,
    currentPage,
    userData,
    id,
    userId,
  }: sortBlogs = useOutletContext();
  return sortedBlogs.length > 0 ? (
    <Articles
      datas={Pagination(sortedBlogs, currentPage)}
      title="Your Blogs"
      button={true}
      profileImage={userData.profileImage}
      username={userData.username}
      userId={id}
      viewerId={userId}
    />
  ) : (
    <div
      style={
        darkTheme
          ? {
              color: "white",
              minHeight: "10rem",
              textAlign: "center",
              marginTop: "10rem",
            }
          : {
              color: "#111926",
              minHeight: "10rem",
              textAlign: "center",
              marginTop: "10rem",
            }
      }
    >
      No blogs
    </div>
  );
};

export default Published;
