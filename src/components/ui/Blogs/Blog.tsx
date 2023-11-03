import { useEffect, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";
import AlertMessage from "../../alertMessage/alertMessage";
import "../../../styles/spinnerBody.css";
import { toastSuccess } from "./../../../logic/toast";

import {
  useDispatch,
  useSelector,
  useParams,
  publishBlog,
  deleteBlog,
  Tags,
  BlogHeading,
  GET_BLOG,
  Spinner,
  BlogContent,
  classes,
} from ".";
import { toast } from "react-toastify";
import { BlogInterface } from "../../../Interface/BlogInterface";
import API_URL from "../../../api/URL";
import axios, { AxiosError, AxiosResponse } from "axios";
import { authReq } from "./../../../interceptor/axios";
interface dataInterface {
  status: number;
}

const isSuccess = function (data, message, action) {
  if (data && data?.status >= 200 && data?.status < 300) {
    action(true);

    return toastSuccess(message, 2000, "toast-success");
  } else {
    toast.error("An error occured 😣😥😰", {
      autoClose: 4000,
      toastId: "toast-success",
    });
  }
};

const Blog = () => {
  const token: string = localStorage.getItem("token")!; // Getting token
  const userId: string = localStorage.getItem("userId")!; // Current user id
  const { darkTheme } = useContext(ThemeContext);

  let { id } = useParams<{ id?: string }>(); // Getting the id from the route

  const [isPublishing, setIsPublishing] = useState<boolean>(false); // publishing state
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState(false);

  const dispatch: any = useDispatch();

  const { blog, loading, error } = useSelector(
    (state: BlogInterface) => state.blogs
  ); // destructuring the blogs

  useEffect(() => {
    dispatch(GET_BLOG(id as string)); // fetching the blog
  }, [dispatch, id]);

  // Getting  bookmarks
  useEffect(() => {
    type postObj = { post: string };

    const findPost = (data: postObj[]) => {
      console.log(data);
      return data.some((post: postObj) => post.post === id);
    };

    const getBookmarks = () => {
      authReq
        .get("bookmark")
        .then((response: AxiosResponse) =>
          setBookmarked(findPost(response.data.bookmarks))
        )
        .catch((e: AxiosError) => console.log(e));
    };

    getBookmarks();
  }, [id]);

  ///
  useEffect(() => {
    if (isDeleted || isPublished) {
      setTimeout(() => {
        window.history.back();
      }, 2600);
    }
  }, [isDeleted, isPublished]);
  // PUBLISHIN A BLOG
  const publishBlogHandler = async () => {
    const updatedData: any = {
      state: "published",
    };
    const route = "blogs/state/";
    setIsPublishing(true);

    const data: dataInterface = await publishBlog(
      id as string,
      route,
      updatedData
    );

    setIsPublishing(false);

    isSuccess(data, "Blog published successfully 😎😍❤❤", setIsPublished);
  };

  // DELETING A BLOG
  const deleteBlogHandler = async () => {
    setIsDeleting(true);
    const data: dataInterface = await deleteBlog(id as string, token);
    setIsDeleting(false);

    isSuccess(data, "Blog deleted successfully 😥😏😪😫", setIsDeleted);
  };
  const handleReload = () => {
    window.location.reload();
  };

  let content = null;
  if (loading) {
    content = (
      <div className="spinner_body">
        <Spinner />
      </div>
    );
  }

  if (!loading && blog && !error) {
    console.log(blog);
    content = (
      <div className={classes.Blog}>
        <div className={classes.Tag}>
          {blog.post.tags.map((tag, index) => (
            <Tags tag={tag} index={index} key={index} />
          ))}
        </div>
        <div className={classes.BlogContent}>
          <AlertMessage duration={2000} />

          <BlogHeading
            // title={blog.post.title}
            blog={blog as any}
            // state={blog.post.state}
            isLoading={isPublishing}
            publishHandler={publishBlogHandler}
            deleteHandler={deleteBlogHandler}
            // owner={blog.post.owner}
            userId={userId}
            isDeleting={isDeleting}
            darkTheme={darkTheme}
          />
          <BlogContent
            views={blog.post.read_count}
            owner={blog.post.owner}
            createdAt={blog.post.createdAt}
            readingTime={blog.post.reading_time}
            body={blog.post.body}
            state={blog.post.state}
            loading={isPublishing}
            publishBlogHandler={publishBlogHandler}
            deleteBlogHandler={deleteBlogHandler}
            userId={userId}
            darkTheme={darkTheme}
            coverImage={blog.post.image[0]}
            isDeleting={isDeleting}
            postId={blog.post._id}
            comment={blog.comments}
            likes={blog.likes}
            bookmarked={bookmarked}
          />
        </div>
      </div>
    );
  }

  if (error) {
    content = (
      <div
        style={
          darkTheme
            ? {
                color: "#fff",
                display: "grid",
                placeItems: "center",
                paddingTop: "2rem",
              }
            : {
                color: "#111926",
                display: "grid",
                placeItems: "center",
                paddingTop: "6rem",
              }
        }
      >
        <span>
          An error occured
          <button
            onClick={handleReload}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.4rem",
              borderRadius: ".5rem",
              marginLeft: "1rem",
            }}
          >
            Tap to reload
          </button>
        </span>
      </div>
    );
  }
  return content;
};

export default Blog;
