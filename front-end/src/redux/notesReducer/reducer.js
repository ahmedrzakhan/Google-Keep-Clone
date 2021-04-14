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
  TOGGLE_DARK_THEME,
  CLEAR_NOTES,
  CLEAR_NOTE,
} from "./actionTypes";

export const Status = {
  ACTIVE: "Active",
  ARCHIVE: "Archive",
};

export const loadData = (key) => {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return undefined;
  }
};

export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  areNotesLoading: false,
  isNoteLoading: false, // for single note
  isUpdatingNote: false,
  isDeletingNote: false,
  errorGettingNotes: false,
  errorGettingNote: false, // for single note
  notes: [],
  note: {}, // for single note
  darkThemeEnabled:
    (loadData("theme") && loadData("theme").darkThemeEnabled) || false,
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
        errorGettingNotes: true,
      };
    }

    case UPDATE_NOTE_REQUEST: {
      return {
        ...state,
        isUpdatingNote: true,
      };
    }

    case UPDATE_NOTE_SUCCESS: {
      return {
        ...state,
        isUpdatingNote: false,
        notes: payload,
      };
    }

    case UPDATE_NOTE_FAILURE: {
      return {
        ...state,
        isUpdatingNote: false,
      };
    }

    case DELETE_NOTE_REQUEST: {
      return {
        ...state,
        isDeletingNote: true,
      };
    }

    case DELETE_NOTE_SUCCESS: {
      return {
        ...state,
        isDeletingNote: false,
        notes: payload,
      };
    }

    case DELETE_NOTE_FAILURE: {
      return {
        ...state,
        isDeletingNote: false,
      };
    }

    case ADD_NOTE_REQUEST: {
      return {
        ...state,
        isAddingNote: true,
      };
    }

    case ADD_NOTE_SUCCESS: {
      return {
        ...state,
        isAddingNote: false,
        notes: [payload, ...state.notes],
      };
    }

    case ADD_NOTE_FAILURE: {
      return { ...state, isAddingNote: false };
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
      return { ...state, areNotesLoading: true };
    }

    case GET_NOTES_BY_SEARCH_SUCCESS: {
      return {
        ...state,
        areNotesLoading: false,
        notes: payload,
      };
    }

    case GET_NOTES_BY_SEARCH_FAILURE: {
      return { ...state, areNotesLoading: false, errorGettingNotes: false };
    }

    case TOGGLE_DARK_THEME: {
      saveData("theme", {
        darkThemeEnabled: !state.darkThemeEnabled,
      });
      return { ...state, darkThemeEnabled: !state.darkThemeEnabled };
    }

    case CLEAR_NOTES: {
      return { ...state, notes: [] };
    }

    case CLEAR_NOTE: {
      return { ...state, note: {} };
    }

    default:
      return state;
  }
};
