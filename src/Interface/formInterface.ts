export interface formInterface {
  submitFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setUserName: (value: string) => void;
  setLastName: (value: string) => void;
  password: string;
  email: string;
  loading: boolean;
  firstname: string;
  lastname: string;
  username: string;
  confirmPassword: string;
}

export interface signinInterface {
  password: string;
  loading: boolean;
  email: string;
  setPassword: (value: string) => void;
  submitFormHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
}
