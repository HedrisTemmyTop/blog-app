import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "../../../styles/Blog.module.css";
import user from "../../../assets/Ellipse.png";
import popular1 from "../../../assets/Rectangle 5.png";
import { connect, useSelector } from "react-redux";
import { GET_BLOG } from "../../../redux/actions/blogs/blogsAction";
import axios from "axios";
import API_URL from "../../../api/URL";
import Spinner from "../spinner/spinner";
import formartDate from "../../../logic/formartDate";
import { IoMdTime } from "react-icons/io";
const Blog = (props) => {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  const { blog } = useSelector((state) => state.blogs);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const hide = useRef();
  const { loading, error, blogs } = useSelector((state) => state);
  useEffect(() => {
    console.log(id);
    props.getBlog(id);
  }, []);
  useEffect(() => {
    if (
      blogs.blog &&
      blogs.blog.owner._id === localStorage.getItem("userId") &&
      blogs.blog.state === "published"
    )
      setShouldDelete(true);
  }, [blogs]);
  const publishBlogHandler = () => {
    setisLoading(true);
    axios
      .put(
        API_URL + "blogs/state/" + id,
        { state: "published" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setisLoading(false);
        setShouldDelete(true);
      })
      .catch((error) => {
        setisLoading(false);
      });
  };
  const deleteBlogHandler = () => {
    console.log("deleting ...");
    axios
      .delete(API_URL + "blogs/" + id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  let content = null;
  if (loading) {
    content = (
      <div
        style={{
          minHeight: "10rem",
          display: "grid",
          placeItems: "center",
          marginTop: "10rem",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!loading && blogs.blog && !error) {
    content = (
      <div className={classes.Blog}>
        <div className={classes.Tag}>
          {blog.tags.map((tag, index) => (
            <Link to={"/tag/#" + tag} key={index}>
              {tag}
            </Link>
          ))}
        </div>
        <div className={classes.BlogContent}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={classes.Title}>{blog.title}</div>
            {blog.state === "draft" ? (
              <button
                className={classes.PostBtn}
                disabled={isLoading ? true : false}
                style={
                  isLoading
                    ? { backgroundColor: "rgb(17, 25, 38) !important" }
                    : null
                }
                onClick={publishBlogHandler}
                ref={hide}
              >
                <span>{isLoading ? "Processing ..." : "Publish"}</span>
              </button>
            ) : (
              <button
                className={classes.DelBtn}
                disabled={isLoading ? true : false}
                style={
                  isLoading ? { backgroundColor: "black !important" } : null
                }
                onClick={deleteBlogHandler}
                ref={hide}
              >
                <span>{isLoading ? "Processing ..." : "Delete"}</span>
              </button>
            )}
          </div>
          <div className={classes.Poster}>
            <div className={classes.Left}>
              <img
                src={user}
                alt="poster image"
                className={classes.PosterImg}
              />
              <div className={classes.Right}>
                <div className={classes.Name}>{blog.owner.username}</div>
                <i>{formartDate(blog.createdAt)}</i>
              </div>
            </div>
            <div className={classes.Left}>
              <IoMdTime style={{ color: "#fff" }} />
              <i className={classes.Date}>{blog.reading_time} mins read</i>
            </div>
          </div>
          <div className={classes.PostImage}>
            <img src={popular1} alt="post image" />
          </div>
          <div
            className={classes.Content}
            id="html_content"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          ></div>
          {blog.state === "draft" ? (
            <button
              className={classes.PostBtn}
              disabled={isLoading ? true : false}
              style={
                isLoading
                  ? { backgroundColor: "rgb(17, 25, 38) !important" }
                  : null
              }
              onClick={publishBlogHandler}
            >
              <span>{isLoading ? "Processing ..." : "Publish"}</span>
            </button>
          ) : (
            <>
              <button
                className={classes.DelBtn}
                disabled={isLoading ? true : false}
                style={
                  isLoading
                    ? {
                        marginTop: "2rem",
                        backgroundColor: "rgb(17, 25, 38) !important",
                      }
                    : {
                        marginTop: "2rem",
                      }
                }
                onClick={deleteBlogHandler}
              >
                <span>{isLoading ? "Processing ..." : "Delete"}</span>
              </button>
              <div className={classes.Comment}>
                <div className={classes.CommentHead}>
                  <div className={classes.HeadLeft}>
                    <span className={classes.Cap}>Comments</span>
                    <span className={classes.Num}>(10)</span>
                  </div>
                  <div className={classes.HeadRight}>
                    <Link to="">View All</Link>
                  </div>
                </div>
                <div className={classes.Comments}>
                  <div className={classes.CommentsLeft}>
                    <div className={classes.Commenter}>
                      <img src={user} alt="comment" />
                      <div className={classes.CommenterRight}>
                        <div className={classes.CommentName}>Ani Duncan</div>
                        <div className={classes.Time}>5 hrs ago</div>
                      </div>
                    </div>
                    <i className={classes.comment}>
                      Thank you very much for this resources it’s really helpful
                    </i>
                  </div>
                  <button className={classes.Reply}>Reply</button>
                </div>
                <div className={classes.Comments} style={{ border: "0" }}>
                  <div className={classes.CommentsLeft}>
                    <div className={classes.Commenter}>
                      <img src={user} alt="comment" />
                      <div className={classes.CommenterRight}>
                        <div className={classes.CommentName}>Ani Duncan</div>
                        <div className={classes.Time}>5 hrs ago</div>
                      </div>
                    </div>
                    <i className={classes.comment}>
                      Thank you very much for this resources it’s really helpful
                    </i>
                  </div>
                  <button className={classes.Reply}>Reply</button>
                </div>
                {blog.owner._id !== localStorage.getItem("userId") ? (
                  <div className={classes.AddPost}>
                    <textarea
                      className={classes.TextArea}
                      placeholder="Say something..."
                    ></textarea>
                    <div className={classes.AddButton}>
                      <button className={classes.Add}>
                        <span>COMMENT</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  if (error) content = <div>An error occured</div>;
  return content;
};
const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.data,
    text: state.text,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (id) => {
      dispatch(GET_BLOG(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Blog);
