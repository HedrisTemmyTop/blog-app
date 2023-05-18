import classes from "../styles/Settings.module.css";
import defaultImage from "../assets/default_img.jpeg";
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
import uploadImage from "../logic/uploadImage";
import { toast } from "react-toastify";
import { UserProfileTypes } from "../Interface/ProfileInterface";
import HandleInterface from "../Interface/HandleInterface";
const Settings = (): JSX.Element | null => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const { loading, user } = useSelector(
    (state: UserProfileTypes) => state.user_profile
  );

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
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const [company, setCompany] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkeldn, setLinkeldn] = useState("");
  const [dp, setDp] = useState("");
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (!token && !userId) return navigate("/sign-in");
  }, [userId, token, navigate]);

  useEffect(() => {
    dispatch(GET_USER_PROFILE(userId, token));
  }, []);

  useEffect(() => {
    if (user) {
      const handleSocials = (name: string) => {
        const [handle] = user.user.socialHandle.filter(
          (handle) => handle.name === name
        );
        if (handle) {
          return handle.url;
        }
        return "";
      };
      setFirstname(user.user.firstname);
      setLastname(user.user.lastname);
      setUsername(user.user.username);
      setEmail(user.user.email);
      setGithub(handleSocials("github"));
      setWebsite(handleSocials("website"));
      setLinkeldn(handleSocials("linkeldn"));
      setTwitter(handleSocials("twitter"));
      setCompany(user.user.job[0]?.company || "");
      setRole(user.user.job[0]?.role || "");

      setDp(user.user.profileImage ? user.user.profileImage : defaultImage);

      setBio(user.user.bio ? user.user.bio : "");

      setLocation(user.user.location ? user.user.location : "");
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

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(event, setImage);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const socialHandle: HandleInterface[] = [];

    if (github !== "" && github)
      socialHandle.push({ name: "github", url: github && github });
    if (website !== "" && website)
      socialHandle.push({ name: "website", url: website && website });
    if (linkeldn !== "" && linkeldn)
      socialHandle.push({ name: "linkeldn", url: linkeldn && linkeldn });
    if (twitter !== "" && twitter)
      socialHandle.push({ name: "twitter", url: twitter && twitter });
    // job
    const job: { company: string; role: string }[] = [{ company, role }];
    interface dataInterface {
      profileImage: string;
      lastname?: string;
      firstname?: string;
      socialHandle?: HandleInterface[];
      job?: { company: string; role: string }[];
      bio?: string;
    }

    const data: dataInterface = {
      profileImage: image ? image : dp,
    };
    if (bio !== "" && bio) data.bio = bio;
    if (job.length > 0) data.job = job;
    if (lastname !== "" && lastname) data.lastname = lastname;
    if (firstname !== "" && firstname) data.firstname = firstname;
    if (socialHandle.length > 0) data.socialHandle = socialHandle;

    setUpdating(true);
    axios
      .put(API_URL + "users/" + user.user._id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUpdating(false);
        setUpdated(true);
        toast.success("Profile updated", {
          autoClose: 2000,
          toastId: "toast-success",
        });
      })
      .catch((error) => {
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
      content = (
        <section
          className={darkTheme ? classes.SettingsLight : classes.Settings}
        >
          <form className={classes.Form} onSubmit={handleSubmit}>
            <div className={classes.Display}>
              <div className={classes.InputImage}>
                <img src={image ? image : dp} alt="profile" />
                <input
                  type="file"
                  className={classes.InputDp}
                  onChange={handleImage}
                />
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
                  <label className={classes.InputLabel}>E-mail</label>
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
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.InputLabel}>Company</label>
                  <input
                    type="text"
                    placeholder="Google"
                    className={classes.InputEl}
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
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
                    value={linkeldn}
                    onChange={(e) => {
                      setLinkeldn(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.InputLabel}>Phone number</label>
                  <input
                    type="number"
                    placeholder="+234 816 112 6466"
                    className={classes.InputEl}
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.InputLabel}>Twitter</label>
                  <input
                    type="text"
                    placeholder="https://twitter.com/HedrisTemmyTop"
                    className={classes.InputEl}
                    value={twitter}
                    onChange={(e) => {
                      setTwitter(e.target.value);
                    }}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.InputLabel}>Github</label>
                  <input
                    type="text"
                    placeholder="https://github.com/HedrisTemmyTop"
                    className={classes.InputEl}
                    onChange={(e) => {
                      setGithub(e.target.value);
                    }}
                    value={github}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.InputLabel}>Website</label>
                  <input
                    type="text"
                    placeholder="https://devedris.netlify.app"
                    className={classes.InputEl}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                    value={website}
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
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                    placeholder="I'm a  frontend developer with six years experience in build scalable web apps"
                    draggable={false}
                    value={bio}
                  ></textarea>
                </div>
              </div>
            </div>
            <button type="submit" className={classes.Submit}>
              <span>{updating ? "Updating..." : "Update"}</span>
            </button>
          </form>
        </section>
      );
    }
  }

  return content;
};

export default Settings;
