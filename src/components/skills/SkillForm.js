import React, { useState, useContext } from "react";
import SkillContext from "../../context/skill/skillContext";
import AlertContext from "../../context/alert/alertContext";

const SkillForm = () => {
  const skillContext = useContext(SkillContext);
  const alertContext = useContext(AlertContext);

  const { addSkill } = skillContext;
  const { setAlert } = alertContext;

  const [skill, setSkill] = useState({
    description: "",
  });

  const { description } = skill;

  const onChange = (e) => setSkill({ description: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (skill === "") {
      setAlert("Please add a skill.", "warning");
    } else {
      addSkill(localStorage.getItem("idUser"), skill);
      setSkill({ description: "" });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="skill"
          value={description}
          onChange={onChange}
          placeholder="Skill..."
        />
        <button type="submit" className="btn btn-primary">
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
