import classes from "../styles/auth.module.css";

import { REGISTER_USER } from "../redux";
import { toast } from "react-toastify"; // <-- Import toast
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { SignUpForm, FormBottom } from "../components/ui/auth";
import { useDispatch, useSelector } from "react-redux";
import ErrorHandler from "../logic/errorHandler";
import AlertMessage from "../components/alertMessage/alertMessage";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setError] = useState(null);

  const dispatch = useDispatch();
  const { loading, registered, error } = useSelector((state) => state.auth);

  // when user is registered display alert modal for 2s then move to sign in
  useEffect(() => {
    if (registered) {
      toast.success("Registeration successful 😎😀", {
        autoClose: 1800,
        toastId: "success-toast",
      });
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2500);
    }
  }, [registered]);

  // For error when user already exists
  useEffect(() => {
    if (error) {
      setError(error);
      toast.error(error, {
        autoClose: 4000,
        toastId: "error-toast",
      });
    }
  }, [error]);

  // submit form to backend;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (password.split("").length < 6) {
      toast.warning("Password not the same ☹🙃", {
        autoClose: 4000,
        toastId: "warning-toast",
      });
    } else if (password !== confirmPassword) {
   
      toast.warning("Password not the same ☹🙃", {
        autoClose: 4000,
        toastId: "warning-toast",
      });
    } else {
      const data = {
        firstname: firstname,
        password: password,
        lastname: lastname,
        username: username,
        email: email,
      };

      dispatch(REGISTER_USER(data));
    }
  };

  return (
    <ErrorHandler errorMessage={errorMessage}>
      <AlertMessage />
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
              <div>
                <SignUpForm
                  submitFormHandler={submitFormHandler}
                  firstname={firstname}
                  lastname={lastname}
                  username={username}
                  email={email}
                  setEmail={setEmail}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setPassword={setPassword}
                  setUserName={setUserName}
                  setConfirmPassword={setConfirmPassword}
                  confirmPassword={confirmPassword}
                  password={password}
                  loading={loading}
                />
                <FormBottom />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};

export default SignUp;
