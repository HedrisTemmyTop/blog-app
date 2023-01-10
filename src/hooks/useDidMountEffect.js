import { useRef, useEffect } from "react";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) func();
    // navigate("/sign-in");
  }, deps);
};
export default useDidMountEffect;
