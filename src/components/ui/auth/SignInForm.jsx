import { Link } from "react-router-dom";
import classes from "../../../styles/auth.module.css";
import Spinner from "../../../components/ui/spinner/spinner";

const SignInForm = ({
  submitFormHandler,
  setEmail,
  email,
  setPassword,
  password,
  loading,
}) => {
  return (
    <form className={classes.Form} onSubmit={(e) => submitFormHandler(e)}>
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
        <div style={{ display: "grid", placeItems: "center" }}>
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
