import React, { useEffect, useContext } from "react";
import SkillList from "../skills/SkillList";
import Profile from "../../components/account/Profile";
import AuthContext from "../../context/auth/authContext";
import SkillContext from "../../context/skill/skillContext";

const User = ({ match }) => {
  const authContext = useContext(AuthContext);
  const skillContext = useContext(SkillContext);

  const { isAuthenticated, loadUser, getUser, user_ } = authContext;
  const { skills, getUsersSkills } = skillContext;

  useEffect(() => {
    getUser(match.params.user);
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    getUsersSkills(match.params.user);
    getUser(match.params.user);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <p>{user_.username}'s Profile</p>
      <Profile user={user_} showButton={false} />
      <SkillList skillState={skills} showButton={true} />
    </div>
  );
};

export default User;
