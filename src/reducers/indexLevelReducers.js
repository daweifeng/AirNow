import { SET_INDEX_LEVEL, KEEP_INDEX_LEVEL } from "../actions"

const airDataReducer = (state = {
  condition: "",
  color: "#70F1CE",
  background: "bg-white"

}, action) => {
  switch (action.type) {
    case SET_INDEX_LEVEL:
      return {
        ...state,
        condition: action.payload.condition,
        background: action.payload.background,
        color: action.payload.color
      }
    case KEEP_INDEX_LEVEL:
        return state;
    default:
      return state;
  }
};

export default airDataReducer;
