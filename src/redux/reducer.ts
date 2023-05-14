
const initialState = {
  isLoggedIn:false,
  data:null,
  showSplash:true
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
      case 'SPLASH':
      return {
        ...state,
        showSplash: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
