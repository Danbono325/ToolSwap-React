import React, { useContext } from "react";
import SkillItem from "../skills/SkillItem";
import Spinner from "../layout/Spinner";
import SkillContext from "../../context/skill/skillContext";
import PropTypes from "prop-types";

const SkillList = ({ showButton, skillState }) => {
  const skillContext = useContext(SkillContext);

  const { loading, skills } = skillContext;

  if (skillState !== null && skillState.length === 0 && !loading) {
    return <h4 style={{ textAlign: "center" }}>No skills yet.</h4>;
  }

  return skills !== null && !loading ? (
    skillState.map((skill) => (
      <SkillItem key={skill.skillID} showButton={showButton} skill={skill} />
    ))
  ) : (
    <Spinner />
  );
};
SkillList.propTypes = {
  showButton: PropTypes.bool.isRequired,
};
export default SkillList;
