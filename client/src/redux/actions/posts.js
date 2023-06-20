import * as api from "../../api/index";
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

//action creators

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    const action = { type: FETCH_ALL, payload: data }; //data is data in which all post are stored
    dispatch(action);

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostBySearch(searchQuery);

    const action = { type: FETCH_BY_SEARCH, payload: data };
    dispatch(action);

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.response.data);
  }
};
