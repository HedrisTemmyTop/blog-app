import { UserData } from "./ProfileInterface";

interface Auth {
  loading: boolean;
  registered: boolean;
  error: string;
  token: string;
  authenticated: boolean;
  data: UserData;
}

interface AuthInterface {
  auth: Auth;
}

export interface loginData {
  identity: string;
  password: string;
}

export interface RegisterData {
  firstname: string;
  password: string;
  lastname: string;
  username: string;
  email: string;
}

export default AuthInterface;
