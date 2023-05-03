import classes from "../styles/auth.module.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // <-- Import toast
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/alertMessage/alertMessage";
import { GET_USER } from "../redux/";
import { FormBottom, SignInForm } from "../components/ui/auth";
import ErrorHandler from "../logic/errorHandler";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { token, loading, userId, authenticated, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", authenticated);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      toast.success("You successfully logged in to Fenkei 😎😃");

      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }
  }, [token]);

  // set error if user credentials are invalid
  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 4000,
        toastId: "error-toast",
      });
    }
    setErrorMessage(error);
  }, [error]);
  // login user
  const submitFormHandler = (e) => {
    e.preventDefault();
    const data = {
      identity: email,
      password: password,
    };
    dispatch(GET_USER(data));
  };
  return (
    <ErrorHandler errorMessage={errorMessage}>
      <AlertMessage
        duration={1700}
        bgColor="success"
        message="You successfully logged in to Fenkei 😎😃"
      />

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
              <SignInForm
                submitFormHandler={submitFormHandler}
                setEmail={setEmail}
                email={email}
                setPassword={setPassword}
                password={password}
                loading={loading}
              />

              <FormBottom />
            </div>
          </div>
        </div>
      </div>
    </ErrorHandler>
  );
};

export default SignIn;
