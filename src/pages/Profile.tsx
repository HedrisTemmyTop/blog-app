import React from "react";
import { useParams } from "react-router-dom";

import UserProfile from "./userProfile";
import VisitingProfile from "./visitingProfile";
const Profile = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  return userId === id ? <UserProfile /> : <VisitingProfile />;
};

export default Profile;
