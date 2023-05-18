import Plan from "../components/ui/Premium/Plan";
import classes from "../styles/Premium.module.css";

const Premium = () => {
  const plans = [{}, {}, {}];
  return (
    <section className={classes.Premium}>
      <h2 className={classes.Heading}>Premium Plans</h2>
      <div className={classes.Plans}>
        {plans.map((plan, i) => (
          <Plan key={i} i={i} />
        ))}
      </div>
    </section>
  );
};

export default Premium;
