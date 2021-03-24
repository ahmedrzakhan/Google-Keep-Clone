import {
  GET_ACTIVE_NOTES_REQUEST,
  GET_ACTIVE_NOTES_SUCCESS,
  GET_ACTIVE_NOTES_FAILURE,
  GET_ARCHIVED_NOTES_REQUEST,
  GET_ARCHIVED_NOTES_SUCCESS,
  GET_ARCHIVED_NOTES_FAILURE,
} from "./actionTypes";

export const getActiveNotesRequest = () => ({
  type: GET_ACTIVE_NOTES_REQUEST,
});

export const getActiveNotesSuccess = () => ({
  type: GET_ACTIVE_NOTES_SUCCESS,
});

export const getActiveNotesFailure = () => ({
  type: GET_ACTIVE_NOTES_FAILURE,
});

export const getActiveNotes = () => ({});

export const getArchivedNotesRequest = () => ({
  type: GET_ARCHIVED_NOTES_REQUEST,
});

export const getArchivedNotesSuccess = () => ({
  type: GET_ARCHIVED_NOTES_SUCCESS,
});

export const getArchivedNotesFailure = () => ({
  type: GET_ARCHIVED_NOTES_FAILURE,
});

export const getArchivedNotes = () => ({});
