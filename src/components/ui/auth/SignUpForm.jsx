import { Link } from "react-router-dom";
import classes from "../../../styles/auth.module.css";
import Spinner from "../../../components/ui/spinner/spinner";

const SignUpForm = ({
  submitFormHandler,
  firstname,
  lastname,
  username,
  email,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setUserName,
  setConfirmPassword,
  confirmPassword,
  password,
  loading,
}) => {
  return (
    <form className={classes.Form} onSubmit={(e) => submitFormHandler(e)}>
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
      {loading ? (
        <div
          style={{ display: "grid", placeItems: "center", marginTop: "2rem" }}
        >
          <Spinner />
        </div>
      ) : (
        <button className={classes.Button} type="submit">
          <span>Sign up</span>
        </button>
      )}
    </form>
  );
};

export default SignUpForm;
