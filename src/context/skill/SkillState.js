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
} from "../types";

const SkillState = (props) => {
  const initialState = {
    skills: null,
    loading: false,
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

    await axios.post(`/skill/create.php?user_id=${user_id}`, skill, config);

    dispatch({ type: ADD_SKILL });
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

    await axios.post(`/skill/delete.php?user_id=${user_id}`, skill, config);
    dispatch({ type: REMOVE_SKILL, payload: skill.skillID });
    getUsersSkills(user_id);
  };

  const getUsersSkills = async (user_id) => {
    resetLoading();

    const res = await axios.get(`/skill/readUserSkills.php?user_id=${user_id}`);

    dispatch({ type: GET_SKILLS, payload: res.data["data"] });
  };

  const resetLoading = () => dispatch({ type: RESET_LOADING });

  const clearSkills = () => dispatch({ type: CLEAR_SKILLS });

  return (
    <SkillContext.Provider
      value={{
        skills: state.skills,
        loading: state.loading,
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
