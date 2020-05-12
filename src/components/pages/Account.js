import React, { useEffect, useContext } from "react";
import Profile from "../account/Profile";
import SkillForm from "../skills/SkillForm";
import SkillList from "../skills/SkillList";
import AuthContext from "../../context/auth/authContext";
import SkillContext from "../../context/skill/skillContext";

const Account = () => {
  const authContext = useContext(AuthContext);
  const skillContext = useContext(SkillContext);

  const { isAuthenticated, loadUser } = authContext;
  const { skills, getUsersSkills } = skillContext;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser(localStorage.getItem("idUser"));
    } else {
      loadUser(0);
    }
    getUsersSkills(localStorage.getItem("idUser"));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SkillForm />
      <SkillList skillState={skills} showButton={true} />
      <Profile />
    </div>
  );
};
export default Account;
