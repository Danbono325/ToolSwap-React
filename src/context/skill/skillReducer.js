import {
  ADD_SKILL,
  REMOVE_SKILL,
  GET_SKILLS,
  RESET_LOADING,
  CLEAR_SKILLS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_SKILL:
      return {
        ...state,
      };
    case REMOVE_SKILL:
      return {
        ...state,
        skills: state.skills.filter(
          (skill) => skill.skillID !== action.payload
        ),
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
      };
    default:
      return {
        state,
      };
  }
};
