import classes from "../../../styles/Blog.module.css";
import defaultImage from "../../../assets/default_img.jpeg";

import { IoMdTime } from "../../react-icons";
import BlogButton from "../BlogButton/Button";
import Comment from "../Comment/Comment";
import formartDate from "../../../logic/formartDate";
import React from "react";
import { Link } from "react-router-dom";
// import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
// import { useTts } from "react-tts";
import { ContentInterface } from "../../../Interface/BlogInterface";

const BlogContent = (props: ContentInterface) => {
  const {
    owner,
    createdAt,
    readingTime,
    body,
    state,
    loading,
    publishBlogHandler,
    deleteBlogHandler,
    userId,
    darkTheme,
    coverImage,
    isDeleting,
    postId,
    comment,
  } = props;
  // const { speak, cancel } = useTts();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const handlePause = () => {
  //   setIsPlaying(false);
  //   cancel();
  // };
  // const handlePlay = () => {
  //   // const textSpeech = document.getElementById("textContent")!.textContent;
  //   // setIsPlaying(true);
  //   // speak({ text: textSpeech });
  // };

  // if the userId is the owner and state is draft give us just a publish button and don't give comment section
  // if the userId is the owner and the state is published, give us comment section
  let buttonJSX = null;
  if (owner._id === userId) {
    buttonJSX =
      state === "draft" ? (
        <BlogButton
          loading={loading}
          click={publishBlogHandler}
          type="Publish"
        />
      ) : (
        <>
          <BlogButton
            loading={isDeleting}
            click={deleteBlogHandler}
            type="Delete"
          />
          <Comment darkTheme={darkTheme} postId={postId} comment={comment} />
        </>
      );
  }
  // if the owner is not the current user give us the comment section without the publish or delete buttons
  if (owner._id !== userId) {
    buttonJSX = (
      <Comment darkTheme={darkTheme} postId={postId} comment={comment} />
    );
  }
  return (
    <React.Fragment>
      <div className={darkTheme ? classes.Poster : classes.PosterLight}>
        <Link to={`/profile/${owner._id} `} className={classes.Left}>
          <img
            src={owner.profileImage ? owner.profileImage : defaultImage}
            alt="poster"
            className={classes.PosterImg}
          />

          <div className={classes.Right}>
            <div className={classes.Name}>{owner.username}</div>
            <i>{formartDate(createdAt)}</i>
          </div>
        </Link>
        {/* <button
          className={classes.PlayBtn}
          onClick={isPlaying ? handlePause : handlePlay}
        >
          {isPlaying ? (
            <>
              <AiOutlinePauseCircle />
              <span>pause</span>
            </>
          ) : (
            <>
              <AiOutlinePlayCircle />
              <span>Listen</span>
            </>
          )}
        </button> */}
        <div className={classes.Left}>
          <IoMdTime style={{ color: "#fff" }} />
          <i className={classes.Date}>{readingTime} mins read</i>
        </div>
      </div>
      <div className={classes.PostImage}>
        <img src={coverImage} alt="post" />
      </div>
      <div
        className={classes.Content}
        dangerouslySetInnerHTML={{ __html: body }}
        style={!darkTheme ? { color: "#1e1e1e" } : {}}
        id="textContent"
      ></div>

      {buttonJSX}
    </React.Fragment>
  );
};

export default BlogContent;
