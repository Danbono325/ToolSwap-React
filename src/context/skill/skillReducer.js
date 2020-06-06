import {
  ADD_SKILL,
  REMOVE_SKILL,
  GET_SKILLS,
  RESET_LOADING,
  CLEAR_SKILLS,
  SKILL_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_SKILL:
      return {
        ...state,
        returnMessage: action.payload,
      };
    case REMOVE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(
          (skill) => skill.skillID !== action.payload.id
        ),
        returnMessage: action.payload.message,
      };
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload,
        loading: false,
      };
    case RESET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_SKILLS:
      return {
        ...state,
        skills: null,
        returnMessage: null,
        error: null,
      };
    case SKILL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        state,
      };
  }
};
