import {
  CREATE,
  UPDATE,
  LIKE,
  FETCH_ALL,
  DELETE,
} from "../constant/actionType";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload];
    case FETCH_ALL:
      return action.payload;
    case UPDATE:
    case LIKE:
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export default postReducer;
