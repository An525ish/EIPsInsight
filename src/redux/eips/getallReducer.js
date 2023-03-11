import {
    FETCH_GETALL_SUCCESS,
  } from './eipsTypes'
  
  const initialState = {
    dataStore: false,
    eips: [],
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETALL_SUCCESS:
        return {
          ...state,
          dataStore: true,
          eips: action.payload,
          error: ''
        }
      default: return state
    }
  }
  
  export default reducer