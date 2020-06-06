import React, { useState, useContext, useEffect } from "react";
import SkillContext from "../../context/skill/skillContext";
import AlertContext from "../../context/alert/alertContext";

const SkillForm = () => {
  const skillContext = useContext(SkillContext);
  const alertContext = useContext(AlertContext);

  const { addSkill, returnMessage, error } = skillContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    console.log("ran");
    console.log("returnMessage" + returnMessage);

    if (returnMessage) {
      setAlert(returnMessage, "success");
    } else if (error) {
      setAlert(error, "danger");
    }

    // eslint-disable-next-line
  }, [returnMessage, error]);

  const [skill, setSkill] = useState({
    description: "",
  });

  const { description } = skill;

  const onChange = (e) => setSkill({ description: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (description === "") {
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
