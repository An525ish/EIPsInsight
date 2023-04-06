import {
  FETCH_GETALL_SUCCESS,
} from './eipsTypes'

export const fetcheips = (data) => {
  return (dispatch) => {
    dispatch(fetcheipsSuccess(data))
  }
}

export const fetcheipsSuccess = (eips) => {
  return {
    type: FETCH_GETALL_SUCCESS,
    payload: eips
  }
}