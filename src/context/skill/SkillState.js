import React, { useReducer } from "react";
import axios from "axios";
import SkillContext from "./skillContext";
import SkillReducer from "./skillReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  ADD_SKILL,
  REMOVE_SKILL,
  GET_SKILLS,
  RESET_LOADING,
  CLEAR_SKILLS,
  SKILL_ERROR,
} from "../types";

const SkillState = (props) => {
  const initialState = {
    skills: null,
    loading: false,
    returnMessage: null,
    error: null,
  };

  const [state, dispatch] = useReducer(SkillReducer, initialState);

  const addSkill = async (user_id, skill) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.post(
      `/skill/create.php?user_id=${user_id}`,
      skill,
      config
    );

    if ((res.data.Message = "Skill Added")) {
      dispatch({ type: ADD_SKILL, payload: res.data.Message });
    } else {
      dispatch({ type: SKILL_ERROR, payload: res.data.Message });
    }
    getUsersSkills(user_id);
  };

  const removeSkill = async (user_id, skill) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const res = await axios.post(
      `/skill/delete.php?user_id=${user_id}`,
      skill,
      config
    );

    if (res.data.Message === "Skill Removed") {
      dispatch({
        type: REMOVE_SKILL,
        payload: { id: skill.skillID, message: res.data.Message },
      });
    } else {
      dispatch({ type: SKILL_ERROR, payload: res.data.Message });
    }
    getUsersSkills(user_id);
  };

  const getUsersSkills = async (user_id) => {
    resetLoading();

    const res = await axios.get(`/skill/readUserSkills.php?user_id=${user_id}`);

    if (res.data.data) {
      dispatch({ type: GET_SKILLS, payload: res.data.data });
    } else {
      dispatch({
        type: SKILL_ERROR,
        payload: "Trouble loading skills, try again.",
      });
    }
  };

  const resetLoading = () => dispatch({ type: RESET_LOADING });

  const clearSkills = () => dispatch({ type: CLEAR_SKILLS });

  return (
    <SkillContext.Provider
      value={{
        skills: state.skills,
        loading: state.loading,
        returnMessage: state.returnMessage,
        error: state.error,
        addSkill,
        removeSkill,
        getUsersSkills,
        clearSkills,
      }}
    >
      {props.children}
    </SkillContext.Provider>
  );
};
export default SkillState;
