const adminAuthReducer = (state = { adminData: null, loading: false, error: false }, action) => {
  switch (action.type) {
    case "ADMIN_AUTH_START":
      return { ...state, loading: true, error: false };

    case "ADMIN_AUTH_SUCCESS":
      localStorage.setItem("adminProfile", JSON.stringify({ ...action.data }));
      return { ...state, adminData: action.data, loading: false, error: false };

    case "ADMIN_AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "ADMIN_LOG_OUT":

      localStorage.clear();
      return { ...state, adminData: null, loading: false, error: false, updateLoading: false }

    default:
      return state;
  }
}
export default adminAuthReducer