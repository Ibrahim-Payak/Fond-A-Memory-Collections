import { AUTH } from "../constant/actionType";
import * as api from "../../api/index";

import { toast } from "react-toastify";

//redux thunk
export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
    toast.success("Account created successfully");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    history.push("/");
    toast.success("Successfully Login");
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
