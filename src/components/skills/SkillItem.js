import React, { useContext } from "react";
import Remove from "./remove.svg";
import SkillContext from "../../context/skill/skillContext";

const SkillItem = ({ showButton, skill }) => {
  const skillContext = useContext(SkillContext);

  const { removeSkill } = skillContext;
  const { description } = skill;

  return (
    <span className="skillItem">
      <span>{description}</span>
      {showButton && (
        <button
          className="removeButton"
          onClick={() =>
            removeSkill(localStorage.getItem("idUser"), { description })
          }
        >
          <img
            src={Remove}
            alt="IMG..."
            style={{ width: "12px", marginRight: "10px" }}
          />
        </button>
      )}
    </span>
  );
};

export default SkillItem;
