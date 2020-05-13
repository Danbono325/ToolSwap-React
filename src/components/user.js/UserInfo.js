import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const UserInfo = () => {
  const authContext = useContext(AuthContext);

  const { user, getUser } = authContext;

  return (
    <div>
      <p>User Profile</p>
    </div>
  );
};

export default UserInfo;
