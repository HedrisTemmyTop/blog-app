import classes from "../styles/Settings.module.css";
import img from "../assets/Ellipse.png";
import Spinner from "../components/ui/spinner/spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/context";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_PROFILE } from "../redux";
import { useState } from "react";
import axios from "axios";
import API_URL from "../api/URL";
import AlertMessage from "../components/alertMessage/alertMessage";
import ErrorHandler from "../logic/errorHandler";

const Settings = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  console.log(darkTheme);
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user_profile);

  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [job, setJob] = useState([]);
  const [number, setNumber] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkeldn, setLinkeldn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [dp, setDp] = useState("");

  useEffect(() => {
    if (!token && !userId) return navigate("/sign-in");
  }, []);

  useEffect(() => {
    dispatch(GET_USER_PROFILE(userId, token));
  }, []);

  useEffect(() => {
    if (user) {
      setFirstname(user.user.firstname);
      setLastname(user.user.lastname);
      setUsername(user.user.username);
      setEmail(user.user.email);

      setBio(user.user.bio);
      setJob(user.user.job);
      setLocation(user.user.location);
    }
  }, [user]);

  useEffect(() => {
    if (error === "Unauthorized") {
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3000);
    }
  }, [error]);
  useEffect(() => {
    if (updated) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [updated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lastname,
      firstname,
      job,
    };
    setUpdating(true);
    axios
      .put(API_URL + "users/profile/" + user.user._id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpdating(false);
        setUpdated(true);
      })
      .catch((error) => {
        console.log(error);
        setUpdating(false);
        setError(error.response ? error.response.data : error.messaege);
      });
  };

  let content = null;
  if (token && userId) {
    if (loading)
      content = (
        <div
          style={{ display: "grid", placeItems: "center", marginTop: "4rem" }}
        >
          {" "}
          <Spinner />
        </div>
      );
    if (!loading && user) {
      console.log(user);

      content = (
        <ErrorHandler
          errorMessage={error}
          duration={error === "Unauthorized" ? 2800 : 5000}
        >
          {updated && (
            <AlertMessage
              message="Updated 😀😎"
              bgColor="success"
              duration={3000}
            />
          )}
          <section
            className={darkTheme ? classes.SettingsLight : classes.Settings}
          >
            <form className={classes.Form} onSubmit={handleSubmit}>
              <div className={classes.Display}>
                <div className={classes.InputImage}>
                  <img src={img} alt="profile picture" />
                  <input type="file" className={classes.InputDp} />
                </div>
              </div>
              <div className={classes.FormInputs}>
                <div className={classes.Basic}>
                  <h2>Basic Settings</h2>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Fist name</label>
                    <input
                      type="text"
                      placeholder="Warren"
                      className={classes.InputEl}
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Last name</label>
                    <input
                      type="text"
                      placeholder="Jessica"
                      className={classes.InputEl}
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Username</label>
                    <input
                      type="text"
                      placeholder="@JohnDoe"
                      className={classes.InputEl}
                      value={"@" + username}
                      readOnly
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Phone number</label>
                    <input
                      type="email"
                      placeholder="johndoe@gami.com"
                      className={classes.InputEl}
                      value={email}
                      readOnly
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Location</label>
                    <input
                      type="text"
                      placeholder="Green roof estate, Futa South Gate, Akure"
                      className={classes.InputEl}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Occupation</label>
                    <input
                      type="text"
                      placeholder="Frontend Engineer"
                      className={classes.InputEl}
                      value={job.length ? job[0] : ""}
                      onChange={(e) => {
                        setJob((prev) => [e.target.value, ...prev]);
                      }}
                    />
                  </div>
                </div>
                <div className={classes.Social}>
                  <h2>Social</h2>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Linkeldn</label>
                    <input
                      type="text"
                      placeholder="https://www.linkedin.com/in/hedristemmytop/"
                      className={classes.InputEl}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Phone number</label>
                    <input
                      type="number"
                      placeholder="+234 816 112 6466"
                      className={classes.InputEl}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Twitter</label>
                    <input
                      type="text"
                      placeholder="https://twitter.com/HedrisTemmyTop"
                      className={classes.InputEl}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Github</label>
                    <input
                      type="text"
                      placeholder="https://github.com/HedrisTemmyTop"
                      className={classes.InputEl}
                    />
                  </div>
                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Website</label>
                    <input
                      type="text"
                      placeholder="https://devedris.netlify.app"
                      className={classes.InputEl}
                    />
                  </div>

                  <div className={classes.Input}>
                    <label className={classes.InputLabel}>Bio</label>

                    <textarea
                      style={{
                        height: "20rem",
                        maxHeight: "50rem",
                        resize: "vertical",
                      }}
                      className={classes.InputEl}
                      placeholder="I'm a  frontend developer with six years experience in build scalable web apps"
                      draggable={false}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button type="submit" className={classes.Submit}>
                <span>{updating ? "Updating..." : "Update"}</span>
              </button>
            </form>
          </section>
        </ErrorHandler>
      );
    }
  }

  return content;
};

export default Settings;
