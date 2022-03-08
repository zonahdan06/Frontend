import { LOGIN_USER } from "../_actions/types";
import { REGISTER_USER, LOGINDUP_USER } from "../_actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload
      };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGINDUP_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
}
