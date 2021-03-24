import {
  GET_ACTIVE_NOTES_REQUEST,
  GET_ACTIVE_NOTES_SUCCESS,
  GET_ACTIVE_NOTES_FAILURE,
  GET_ARCHIVED_NOTES_REQUEST,
  GET_ARCHIVED_NOTES_SUCCESS,
  GET_ARCHIVED_NOTES_FAILURE,
} from "./actionTypes";

const initialState = {
  areNotesLoading: false,
  error: false,
  notes: [],
};

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ACTIVE_NOTES_REQUEST: {
      return {
        ...state,
      };
    }

    case GET_ACTIVE_NOTES_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_ACTIVE_NOTES_FAILURE: {
      return { ...state };
    }

    case GET_ARCHIVED_NOTES_REQUEST: {
      return { ...state };
    }

    case GET_ARCHIVED_NOTES_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_ARCHIVED_NOTES_FAILURE: {
      return { ...state };
    }

    default:
      return state;
  }
};
