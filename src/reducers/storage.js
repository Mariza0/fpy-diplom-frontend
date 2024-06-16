// import { STORAGE_UPLOAD, STORAGE_FAILURE, STORAGE_SUCCESS, STORAGE_LIST_REQUEST } from "../actions/actionTypes";

// const initialState = { files: null, loading: false, error: null}//{message: null, status: null }};

// export default function storageReducer(state = initialState, action) {
//     switch(action.type) {
//         case STORAGE_UPLOAD:
//             console.log(action,'action')
//             return {...state, files: action.payload, loading: true, }
//         case STORAGE_SUCCESS:
//                 return {...state, files: action.payload.data, loading: false, }
//                 case STORAGE_LIST_REQUEST:
//                     return {...state, files: action.payload, loading: false, }
//         case STORAGE_FAILURE:
//             return { ...state, loading: false, error: action.payload.error }//{message: action.payload.error.message, 
//                                                     //status: action.payload.error.status } }
//         default: return state
//     }
// };