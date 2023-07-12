import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsEye, BsBookmark, BsBookmarkFill } from "react-icons/bs";

import classes from "../../../../styles/Blog.module.css";
import axios from "axios";
import API_URL from "../../../../api/URL";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LikeInterface } from "../../../../Interface/BlogInterface";
interface PropTypes {
  views: number;
  likes: LikeInterface[];
  bookmarked: boolean;
  darkTheme: boolean;
}
const Reactions = (props: PropTypes): JSX.Element => {
  const userId = localStorage.getItem("userId") as string;

  const checkLikes = () => props.likes.some((like) => like.user._id === userId);
  const [bookmarked, setBookmarked] = useState<boolean>(props.bookmarked);
  const [isLiked, setIsLiked] = useState<boolean>(checkLikes);
  const [totalLikes, setTotalLikes] = useState<number>(props.likes.length);
  // const [bookmarks, setBookmarks] = useState<null | Object[]>(null);
  const token: string = localStorage.getItem("token") as string;
  const { id } = useParams<{ id: string }>();

  // Getting  bookmarks

  const handleLikes = () => {
    if (!token) {
      toast.error("Kindly log in", {
        autoClose: 2000,
        toastId: "error",
      });
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2200);
    } else {
      if (!isLiked) {
        setIsLiked(true);
        setTotalLikes((prev) => prev + 1);

        axios
          .post(
            API_URL + "blogs/like",
            {
              postId: id,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {})
          .catch((e) => {
            alert("an error occured");
          });
      } else {
        setIsLiked(false);
        setTotalLikes((prev) => prev - 1);

        axios
          .post(
            API_URL + "blogs/dislike",
            {
              postId: id,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {})
          .catch((e) => {
            alert("an error occured");
          });
      }
    }
  };

  const handleBookmark = () => {
    if (!token) {
      toast.error("Kindly log in", {
        autoClose: 2000,
        toastId: "error",
      });
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2200);
    } else {
      if (!bookmarked) {
        axios
          .post(
            API_URL + "bookmark",
            {
              postId: id,
            },

            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            toast.success("Bookmarked", {
              autoClose: 2000,
              toastId: "success",
            });
            setBookmarked(true);
          });
      } else
        axios
          .post(
            API_URL + "bookmark/remove",
            {
              postId: id,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            toast.success("Removed", {
              autoClose: 2000,
              toastId: "success",
            });
            setBookmarked(false);
          });
    }
  };
  const formatViews = (viewCount: number) => {
    if (viewCount >= 1000) {
      const thousands = Math.floor(viewCount / 1000);
      if (thousands >= 1000) {
        return (thousands / 1000).toFixed(1) + "M";
      } else if (thousands >= 1) {
        return thousands + "K";
      }
    }
    return viewCount.toString();
  };

  return (
    <div
      className={classes.Reaction}
      style={
        props.darkTheme
          ? {
              backgroundColor: "#181e29",
              color: "#fff",
            }
          : {}
      }
    >
      <span className={classes.ReactContainer}>
        <span className={classes.React} onClick={handleLikes}>
          {isLiked ? (
            <AiFillHeart style={{ color: "red" }} />
          ) : (
            <AiOutlineHeart />
          )}
          <span className={classes.Liked}>{formatViews(totalLikes)}</span>
        </span>
      </span>
      <span className={classes.ReactContainer}>
        <span className={classes.React}>
          <BsEye />
          <span>{formatViews(props.views)}</span>
        </span>
      </span>
      <span className={classes.ReactContainer} onClick={handleBookmark}>
        <span className={classes.React}>
          {bookmarked ? (
            <BsBookmarkFill style={{ color: "#2930e3" }} />
          ) : (
            <BsBookmark />
          )}
        </span>
      </span>
      <span className={classes.ReactShare}>
        <span className={classes.React}>
          <AiOutlineShareAlt />
        </span>
      </span>
    </div>
  );
};

export default Reactions;
