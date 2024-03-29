import { Link } from "react-router-dom";
import classes from "../../../styles/auth.module.css";
import Spinner from "../spinner/spinner";
import { signinInterface } from "../../../Interface/formInterface";

const SignInForm = (props: signinInterface) => {
  const { submitFormHandler, setEmail, email, setPassword, password, loading } =
    props;
  return (
    <form
      className={classes.Form}
      onSubmit={(e) => submitFormHandler(e)}
      data-testid="sign-in-form"
      name="sign-in-form"
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
      {loading ? (
        <div
          style={{ display: "grid", placeItems: "center" }}
          data-testid="loading-spinner"
        >
          <Spinner />
        </div>
      ) : (
        <button className={classes.Button} type="submit">
          Sign In
        </button>
      )}
    </form>
  );
};

export default SignInForm;
