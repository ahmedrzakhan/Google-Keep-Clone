import {
  GET_NOTES_BY_TYPE_REQUEST,
  GET_NOTES_BY_TYPE_SUCCESS,
  GET_NOTES_BY_TYPE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  GET_NOTE_BY_ID_REQUEST,
  GET_NOTE_BY_ID_SUCCESS,
  GET_NOTE_BY_ID_FAILURE,
  GET_NOTES_BY_SEARCH_REQUEST,
  GET_NOTES_BY_SEARCH_SUCCESS,
  GET_NOTES_BY_SEARCH_FAILURE,
} from "./actionTypes";

export const Status = {
  ACTIVE: "Active",
  ARCHIVE: "Archive",
};

const initialState = {
  areNotesLoading: false,
  isNoteLoading: false,
  errorGettingNotes: false,
  errorGettingNote: false,
  notes: [],
  filteredNotes: [], // for search results
  note: {},
};

export const notesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTES_BY_TYPE_REQUEST: {
      return {
        ...state,
        areNotesLoading: true,
      };
    }

    case GET_NOTES_BY_TYPE_SUCCESS: {
      return {
        ...state,
        areNotesLoading: false,
        notes: payload,
      };
    }

    case GET_NOTES_BY_TYPE_FAILURE: {
      return {
        ...state,
        areNotesLoading: false,
        errorGettingNotes: false,
      };
    }

    case UPDATE_NOTE_REQUEST: {
      return {
        ...state,
      };
    }

    case UPDATE_NOTE_SUCCESS: {
      return {
        ...state,
        notes: payload,
      };
    }

    case UPDATE_NOTE_FAILURE: {
      return {
        ...state,
      };
    }

    case DELETE_NOTE_REQUEST: {
      return {
        ...state,
      };
    }

    case DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        notes: payload,
      };
    }

    case DELETE_NOTE_FAILURE: {
      return {
        ...state,
      };
    }

    case ADD_NOTE_REQUEST: {
      return {
        ...state,
      };
    }

    case ADD_NOTE_SUCCESS: {
      return { ...state, notes: [...state.notes, payload] };
    }

    case ADD_NOTE_FAILURE: {
      return { ...state };
    }

    case GET_NOTE_BY_ID_REQUEST: {
      return { ...state, isNoteLoading: true };
    }

    case GET_NOTE_BY_ID_SUCCESS: {
      return { ...state, isNoteLoading: false, note: payload };
    }

    case GET_NOTE_BY_ID_FAILURE: {
      return { ...state, isNoteLoading: false, errorGettingNote: true };
    }

    case GET_NOTES_BY_SEARCH_REQUEST: {
      return { ...state, areNotesLoading: true, };
    }

    case GET_NOTES_BY_SEARCH_SUCCESS: {
      return { ...state, areNotesLoading: false, filteredNotes: payload };
    }

    case GET_NOTES_BY_SEARCH_FAILURE: {
      return { ...state, areNotesLoading: false, errorGettingNotes: false };
    }

    default:
      return state;
  }
};
