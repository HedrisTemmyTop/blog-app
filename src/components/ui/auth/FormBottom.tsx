import React, { useEffect } from "react";
import classes from "../../../styles/auth.module.css";
import google from "../../../assets/google.webp";
import facebook from "../../../assets/facebook1.png";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const FormBottom = () => {
  const handleCallBack = () => {};
  useEffect(() => {
    /*global google */
    // google.accounts.id.initalize({
    //   client_id:
    //     "640327187146-9t0mmgkfecocr490j1ca6nolsvibfr99.apps.googleusercontent.com",
    //   callback: handleCallBack,
    // });
    // // google.accounts.id.renderButton({});
    // // function start() {
    // //   gapi.client.init({
    // //     clientId:
    // //       "http://1023918515781-pitfhkn7je286blu3h8bl063oeh5kfgg.apps.googleusercontent.com/",
    // //     scope: "email",
    // //   });
    // // }
    // // gapi.load("client.auth2", start);
  }, []);

  const handleSuccess = (response: any) => {
    // console.log(response);
  };
  const handleError = (response: any) => {
    // console.log(response);
  };

  return (
    <React.Fragment>
      {" "}
      <p className={classes.Break}>or</p>
      <div className={classes.SpecialButtons}>
        <button className={classes.SpecialButton}>
          <img className={classes.Icon} src={google} alt="google" />
          <span>Google</span>
        </button>
        {/* <GoogleLogin
          clientId="640327187146-9t0mmgkfecocr490j1ca6nolsvibfr99.apps.googleusercontent.com"
          onSuccess={handleSuccess}
          onFailure={handleError}
          // onRequest={handleSuccess}
        /> */}
        <button className={classes.SpecialButton}>
          <img className={classes.IconFB} src={facebook} alt="facebook" />
          <span>Facebook</span>
        </button>
      </div>
      <div className={classes.FormFooter}>
        Protected by recaptcha and subject to the Fenkei Privacy Policy and
        Terms of Service
      </div>
    </React.Fragment>
  );
};

export default FormBottom;
