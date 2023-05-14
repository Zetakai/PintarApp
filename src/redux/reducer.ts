
const initialState = {
  isLoggedIn:false,
  data:null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    //dispatch({type: dispatch.type, payload: dispatch.payload})
    case 'USER-AUTH':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
      case 'LOGIN-AUTH':
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
