import * as AuthApi from "../api/AuthRequests";
export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL", message: error.response.data });
  }
};

export const verifyotp = (userId, otp) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.verifyOtp(userId, otp);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "AUTH_FAIL", message: error.response.data });
  }
};

export const adminLogin = (formData) => async (dispatch) => {
  dispatch({ type: "ADMIN_AUTH_START" });
  try {
    const { data } = await AuthApi.adminLogin(formData)
    dispatch({ type: "ADMIN_AUTH_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "ADMIN_AUTH_FAIL" });
  }
}

export const resetPass = (email) => async (dispatch) => {
  try {
    const { data } = await AuthApi.resetPass(email)
    return data;
  } catch (error) {
    return error;
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" })
}

export const reset = () => async (dispatch) => {
  dispatch({ type: "RESET" })
}

export const adminLogOut = () => async (dispatch) => {
  dispatch({ type: "ADMIN_LOG_OUT" })
}