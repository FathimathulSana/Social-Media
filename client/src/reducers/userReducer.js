const userReducer = (
    state = { userData: null, loading: false, error: false }, action
) => {
    switch (action.type) {
        case "FETCH_USER_DETAILS":
            return { ...state, loading: true, error: false };
        case "USER_DETAILS_FETCHED":
            return { ...state, userData: action.data, loading: false, error: false };
        case "USER_DETAILS_FETCHING_FAIL":
            return { ...state, loading: false, error: true };

        case "FETCH_ALL_USERS":
            return { ...state, loading: true, error: false };

        case "ALL_USERS_FETCHED":
            return { ...state, userData: action.data, loading: false, error: false };

        case "ALL_USERS_FETCHING_FAIL":
            return { ...state, loading: false, error: true }

        default:
            return state;
    }

}

export default userReducer