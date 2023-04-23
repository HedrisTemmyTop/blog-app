import classes from "../styles/Settings.module.css";
import img from "../assets/Ellipse.png";

const Settings = () => {
  return (
    <section className={classes.Settings}>
      <form className={classes.Form}>
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
              />
            </div>
            <div className={classes.Input}>
              <label className={classes.InputLabel}>Last name</label>
              <input
                type="text"
                placeholder="Jessica"
                className={classes.InputEl}
              />
            </div>
            <div className={classes.Input}>
              <label className={classes.InputLabel}>Username</label>
              <input
                type="text"
                placeholder="@JohnDoe"
                className={classes.InputEl}
              />
            </div>
            <div className={classes.Input}>
              <label className={classes.InputLabel}>Location</label>
              <input
                type="text"
                placeholder="Green roof estate, Futa South Gate, Akure"
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
              <label className={classes.InputLabel}>Occupation</label>
              <input
                type="text"
                placeholder="Frontend Engineer"
                className={classes.InputEl}
              />
            </div>
            <button type="submit" className={classes.Submit}>
              <span>Update</span>
            </button>
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
              <label className={classes.InputLabel}>Instagram</label>
              <input
                type="text"
                placeholder="https://instagram.com/HedrisTemmyTop"
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
      </form>
    </section>
  );
};

export default Settings;
