import {
  CREATE,
  UPDATE,
  LIKE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constant/actionType";

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPage: action.payload.totalPage,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case UPDATE:
    case LIKE:
      debugger;
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default postReducer;
