const initialAuthState = {
  token: null,
  loading: false,
  error: null,
  registered: false,
  authenticated: false,
};
export const authReducer = (state = initialAuthState, action) => {
  if (action.type === "RESET_AUTH_STATE") {
    return {
      token: null,
      loading: false,
      error: null,
      registered: false,
      authenticated: null,
    };
  }
  if (action.type === "REGISTER_SUCCES") {
    return {
      ...initialAuthState,
      registered: true,
      loading: false,
    };
  }
  if (action.type === "REGISTER_FAIL") {
    return {
      ...initialAuthState,
      error: action.error,
      loading: false,
    };
  }
  if (action.type === "REGISTER_START") {
    return {
      ...initialAuthState,
      loading: true,
    };
  }
  if (action.type === "LOGIN_SUCCESS") {
    console.log(action);
    return {
      ...initialAuthState,
      token: action.data,
      authenticated: true,
    };
  }

  return state;
};
