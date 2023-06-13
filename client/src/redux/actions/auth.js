import { AUTH } from "../constant/actionType";
import * as api from "../../api/index";

//redux thunk
export const signUp = (formData, history) => async (dispatch) => {
  try {
    debugger;

    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, history) => async (dispatch) => {
  try {
    debugger;
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
