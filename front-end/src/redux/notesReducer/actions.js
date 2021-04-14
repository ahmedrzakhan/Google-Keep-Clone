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
import { apiCall } from "./../utils";

// GET NOTES BY TYPE
export const getNotesByTypeRequest = (payload) => ({
  type: GET_NOTES_BY_TYPE_REQUEST,
  payload,
});

export const getNotesByTypeSuccess = (payload) => ({
  type: GET_NOTES_BY_TYPE_SUCCESS,
  payload,
});

export const getNotesByTypeFailure = (payload) => ({
  type: GET_NOTES_BY_TYPE_FAILURE,
  payload,
});

export const getNotesByType = (payload) => async (dispatch) => {
  dispatch(getNotesByTypeRequest(payload));

  try {
    const response = await apiCall({
      method: "get",
      url: `/api/notes/get-notes?status=${payload}`,
    });
    dispatch(getNotesByTypeSuccess(response.data));
  } catch (err) {
    dispatch(getNotesByTypeFailure(err));
  }
};

// UPDATE NOTE
export const updateNoteRequest = (payload) => ({
  type: UPDATE_NOTE_REQUEST,
  payload,
});

export const updateNoteSuccess = (payload) => ({
  type: UPDATE_NOTE_SUCCESS,
  payload,
});

export const updateNoteFailure = (payload) => ({
  type: UPDATE_NOTE_FAILURE,
  payload,
});

export const updateNote = (payload) => async (dispatch, getState) => {
  dispatch(updateNoteRequest(payload));
  const { note, _id } = payload;

  try {
    const response = await apiCall({
      method: "post",
      url: `/api/notes/update-note/${_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: note,
    });
    const { notes } = getState();
    const { notes: notesList } = notes;

    const data = notesList.map((note) =>
      note._id === _id ? response.data : note
    );

    dispatch(updateNoteSuccess(data));
  } catch (err) {
    dispatch(updateNoteFailure(err));
  }
};

// DELETE NOTE
export const deleteNoteRequest = (payload) => ({
  type: DELETE_NOTE_REQUEST,
  payload,
});

export const deleteNoteSuccess = (payload) => ({
  type: DELETE_NOTE_SUCCESS,
  payload,
});

export const deleteNoteFailure = (payload) => ({
  type: DELETE_NOTE_FAILURE,
  payload,
});

export const deleteNote = (payload) => async (dispatch, getState) => {
  dispatch(deleteNoteRequest(payload));

  try {
    const { notes } = getState();
    const { notes: notesList } = notes;

    await apiCall({
      method: "delete",
      url: `/api/notes/delete-note/${payload}`,
    });
    const data = notesList.filter((note) => note._id !== payload);

    dispatch(deleteNoteSuccess(data));
  } catch (err) {
    dispatch(deleteNoteFailure(err));
  }
};

// ADD NOTE
export const addNoteRequest = (payload) => ({
  type: ADD_NOTE_REQUEST,
  payload,
});

export const addNoteSuccess = (payload) => ({
  type: ADD_NOTE_SUCCESS,
  payload,
});

export const addNoteFailure = (payload) => ({
  type: ADD_NOTE_FAILURE,
  payload,
});

export const addNote = (payload) => async (dispatch) => {
  dispatch(addNoteRequest(payload));

  try {
    const response = await apiCall({
      method: "post",
      url: "/api/notes/add-note",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    });

    dispatch(addNoteSuccess(response.data));
  } catch (err) {
    dispatch(addNoteFailure(err));
  }
};

// GET NOTE BY ID
export const getNoteByIdRequest = (payload) => ({
  type: GET_NOTE_BY_ID_REQUEST,
  payload,
});

export const getNoteByIdSuccess = (payload) => ({
  type: GET_NOTE_BY_ID_SUCCESS,
  payload,
});

export const getNoteByIdFailure = (payload) => ({
  type: GET_NOTE_BY_ID_FAILURE,
  payload,
});

export const getNoteById = (payload) => async (dispatch) => {
  dispatch(getNoteByIdRequest(payload));

  try {
    const response = await apiCall({
      method: "get",
      url: `/api/notes/get-note/${payload}`,
    });
    // axios(config);
    dispatch(getNoteByIdSuccess(response.data));
  } catch (err) {
    dispatch(getNoteByIdFailure(err));
  }
};

// GET NOTES BY SEARCH
export const getNotesBySearchRequest = (payload) => ({
  type: GET_NOTES_BY_SEARCH_REQUEST,
  payload,
});

export const getNotesBySearchSuccess = (payload) => ({
  type: GET_NOTES_BY_SEARCH_SUCCESS,
  payload,
});

export const getNotesBySearchFailure = (payload) => ({
  type: GET_NOTES_BY_SEARCH_FAILURE,
  payload,
});

export const getNotesBySearch = (payload) => async (dispatch) => {
  dispatch(getNotesBySearchRequest(payload));

  try {
    const response = await apiCall({
      method: "get",
      url: `/api/notes/search-by-char/${payload}`,
    });
    dispatch(getNotesBySearchSuccess(response.data));
  } catch (err) {
    dispatch(getNotesBySearchFailure(err));
  }
};

export const toggleDarkTheme = () => ({
  type: TOGGLE_DARK_THEME,
});

export const clearNotes = () => ({
  type: CLEAR_NOTES,
});

export const clearNote = () => ({
  type: CLEAR_NOTE,
});
