import classes from "../styles/auth.module.css";

import { REGISTER_USER } from "../redux";
import { toast } from "react-toastify"; // <-- Import toast
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { SignUpForm, FormBottom } from "../components/ui/auth";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/alertMessage/alertMessage";
import AuthInterface from "../Interface/AuthInterface";
const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch: any = useDispatch();
  const { loading, registered, error } = useSelector(
    (state: AuthInterface) => state.auth
  );

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
      toast.error(error, {
        autoClose: 4000,
        toastId: "error-toast",
      });
    }
  }, [error]);

  // submit form to backend;

  const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
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
  );
};

export default SignUp;
