import classes from "../styles/auth.module.css";

import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // <-- Import toast
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { GET_USER } from "../redux/";
import { FormBottom, SignInForm } from "../components/ui/auth";
import AuthInterface, { loginData } from "../Interface/AuthInterface";
import AlertMessage from "../components/alertMessage/alertMessage";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch: any = useDispatch();
  const { token, loading, authenticated, error, data } = useSelector(
    (state: AuthInterface) => state.auth
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", JSON.stringify(authenticated));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", data._id);

      const userInfo = {
        username: data.username,
        socialHandles: data.socialHandle,
        profileImage: data.profileImage ? data.profileImage : "",
        firstname: data.firstname,
        lastname: data.lastname,
        uid: data._id,
      };
      localStorage.setItem("data", JSON.stringify(userInfo));
      toast.success("You successfully logged in to Fenkei 😎😃", {
        autoClose: 1700,
        toastId: "toast-success",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }
  }, [token, data, authenticated]);

  // set error if user credentials are invalid
  useEffect(() => {
    if (error) {
      toast.error(error, {
        autoClose: 4000,
        toastId: "error-toast",
      });
    }
  }, [error]);
  // login user
  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: loginData = {
      identity: email,
      password: password,
    };
    dispatch(GET_USER(data));
  };
  return (
    <div className={classes.Auth}>
      <AlertMessage duration={1700} />
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
  );
};

export default SignIn;
