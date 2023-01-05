import classes from "../styles/auth.module.css";
import google from "../assets/google.webp";
import facebook from "../assets/facebook1.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dataValidation = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password are not the sane");
      return false;
    }
  };
  const submitFormHandler = (e) => {
    dataValidation(e);

    console.log(
      "Registeration successfull, i'll add navigate hook here to navigate to login page like dat"
    );
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.Main}>
        <div className={classes.Content}>
          <div className={classes.Left}>
            <div className={classes.Name}> Fenkei</div>
            <div className={classes.Greet}>Welcome back to Fenkei</div>
            <div className={classes.Text}>
              Stop wasting time with frustrating plaform. Build beautiful
              courses & content with ease. Get started in minutes with our
              unique and simple authoring tool.
            </div>
          </div>
          <div className={classes.Right}>
            <form
              className={classes.Form}
              onSubmit={(e) => submitFormHandler(e)}
            >
              <div className={classes.FormHead}>
                <h3 className={classes.FormTitle}>Sign up</h3>
                <p className={[classes.Text, classes.Normal].join(" ")}>
                  Have an account ?{" "}
                  <Link to="/sign-in" className={classes.Link}>
                    Sign in
                  </Link>
                </p>
              </div>
              <div className={classes.Inputs}>
                <input
                  className={classes.Input}
                  required
                  type="text"
                  value={firstname}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="First Name"
                />
                <input
                  className={classes.Input}
                  required
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Last Name"
                />
                <input
                  className={classes.Input}
                  required
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  placeholder="Username"
                />

                <input
                  className={classes.Input}
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email address"
                />
                <input
                  className={classes.Input}
                  required
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                <input
                  className={classes.Input}
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm password"
                />
              </div>
              <p>
                <Link className={classes.Link} to="/forgot-password">
                  Forgot password ?
                </Link>
              </p>

              <button className={classes.Button} type="submit">
                Sign up{" "}
              </button>
            </form>
            <p className={classes.Break}>or</p>
            <div className={classes.SpecialButtons}>
              <button className={classes.SpecialButton}>
                <img className={classes.Icon} src={google} alt="google" />
                <span>Google</span>
              </button>
              <button className={classes.SpecialButton}>
                <img className={classes.IconFB} src={facebook} alt="facebook" />
                <span>Facebook</span>
              </button>
            </div>
            <div className={classes.FormFooter}>
              Protected by recaptcha and subject to the Fenkei Privacy Policy
              and Terms of Service
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
