import classes from "../styles/auth.module.css";

import { REGISTER_USER } from "../redux";

import { useEffect, useState } from "react";
import { SignUpForm, FormBottom } from "../components/ui/auth";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/alertMessage/alertMessage";
import ErrorHandler from "../logic/errorHandler";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setError] = useState(null);

  const dispatch = useDispatch();
  const { loading, registered, error } = useSelector((state) => state.auth);

  // when user is registered display alert modal for 2s then move to sign in
  useEffect(() => {
    if (registered) {
      setIsRegistered(true);
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    }
  }, [registered]);

  // For error when user already exists
  useEffect(() => {
    setError(error);
  }, [error]);

  // check if both password are equal
  const dataValidation = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsAlert(true);
      return false;
    }
  }
  
  // submit form to backend;

  const submitFormHandler = async (e) => {
    dataValidation(e);
    const data = {
      firstname: firstname,
      password: password,
      lastname: lastname,
      username: username,
      email: email,
    };

    dispatch(REGISTER_USER(data));
  };

  return (
    <ErrorHandler errorMessage={errorMessage}>
      <div className={classes.Auth}>
        {isRegistered ? (
          <AlertMessage
            duration="1500"
            bgColor="success"
            message="You successfully registered to Fenkei 🎉🎉"
          />
        ) : null}
        {isAlert ? (
          <AlertMessage
            duration="5000"
            bgColor="warning"
            message="Password and confirm password must be the same"
            cancelBtn={true}
          />
        ) : null}
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
