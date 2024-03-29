import React from "react";
import classes from "../../../styles/auth.module.css";
import google from "../../../assets/google.webp";
import facebook from "../../../assets/facebook1.png";

const FormBottom = () => {
  return (
    <React.Fragment>
      {" "}
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
        Protected by recaptcha and subject to the Fenkei Privacy Policy and
        Terms of Service
      </div>
    </React.Fragment>
  );
};

export default FormBottom;
