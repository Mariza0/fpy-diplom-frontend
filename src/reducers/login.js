// import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, LOGIN_RESET_ERROR } from "../actions/actionTypes";

// const initialState = { username: null, isAuthenticated: false, loading: false, error: {message: null, status: null }};

// export default function loginReducer(state = initialState, action) {
//     switch(action.type) {
//         case LOGIN_REQUEST:
//             return {...state, loading: true, }
//         case LOGIN_SUCCESS:
//             return {...state, username: action.payload.username, isAuthenticated: action.payload.isAuthenticated, loading: false, }
//         case LOGIN_FAILURE:
//             return { username: null, loading: false, error: {message: action.payload.error.message, 
//                                                             status: action.payload.error.status } }

//         case LOGOUT:
//             return { ...state, loading: false, username: null}
//         case LOGIN_RESET_ERROR:
//             return {...state, error: null, loading: false }

//         default: return state
//     }
// };