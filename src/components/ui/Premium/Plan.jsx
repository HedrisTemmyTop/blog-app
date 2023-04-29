import classes from "../../../styles/Premium.module.css";
const Plan = ({ i }) => {
  return (
    <div
      className={classes.Card}
      style={i === 1 ? { marginInline: "10rem" } : null}
    >
      <div className={[classes.CardSide, classes.CardFront].join(" ")}>
        <div className={classes.CardPicture}></div>
        <div className={classes.CardHeading}>
          <span>The Basic Plan</span>
        </div>
        <div className={classes.CardDetails}>
          <ul>
            <li>Mode: Basic</li>
            <li>100 words only</li>
            <li>5 Readers per day</li>
            <li>Read 5 blog a day</li>
            <li>Lorem ipsum dolor, sit amet</li>
          </ul>
        </div>
      </div>
      <div className={[classes.CardSide, classes.CardBack].join(" ")}>
        <div className={classes.PriceBox}>
          <div className={classes.CardPrice}>
            <p className={classes.Only}>Only</p>
            <p className={classes.Price}>$100</p>
            <button className={classes.Btn}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
