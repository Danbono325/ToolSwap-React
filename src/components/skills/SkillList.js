import React, { useContext } from "react";
import SkillItem from "../skills/SkillItem";
import Spinner from "../layout/Spinner";
import SkillContext from "../../context/skill/skillContext";
import PropTypes from "prop-types";

const SkillList = ({ showButton, skillState }) => {
  const skillContext = useContext(SkillContext);

  const { loading, skills } = skillContext;

  //   if (skills !== null && skills.length === 0 && !loading) {
  //     return <h4 style={{ textAlign: "center" }}>Add some skills.</h4>;
  //   }

  return skills !== null && !loading ? (
    skillState.map((skill) => (
      <SkillItem key={skill.skillID} skill={skill} showButton={showButton} />
    ))
  ) : (
    <Spinner />
  );
};
SkillList.propTypes = {
  showButton: PropTypes.bool.isRequired,
};
export default SkillList;
