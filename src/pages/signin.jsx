import classes from "../styles/auth.module.css";
import google from "../assets/google.webp";
import facebook from "../assets/facebook1.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { GET_USER } from "../redux/actions/auth/authActions";
import Spinner from "../components/ui/spinner/spinner";
import { RESET_AUTH_STATE } from "../redux/actions/actions";
const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitFormHandler = (e) => {
    e.preventDefault();
    const data = {
      identity: email,
      password: password,
    };
    props.loginHandler(data);
  };
  useEffect(() => {
    props.resetState();
    if (props.token) {
      localStorage.setItem("auth", props.authenticated);
      localStorage.setItem("token", props.token);
      localStorage.setItem("userId", props.userId);
      navigate("/");
    }
    console.log(props);
  }, [props.token]);

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
                  Don't have an accout ?{" "}
                  <Link to="/sign-up" className={classes.Link}>
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className={classes.Inputs}>
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
              </div>
              <p className={classes.Forg}>
                <Link className={classes.Link} to="/forgot-password">
                  Forgot password ?
                </Link>
              </p>
              {props.loading ? (
                <div style={{ display: "grid", placeItems: "center" }}>
                  <Spinner />
                </div>
              ) : (
                <button className={classes.Button} type="submit">
                  Sign In
                </button>
              )}
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
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authenticated: state.auth.authenticated,
    loading: state.auth.loading,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginHandler: (data) => dispatch(GET_USER(data)),
    resetState: () => dispatch(RESET_AUTH_STATE()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
