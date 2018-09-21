import types from './types';

export const loadEventsStart = () => ({
  type: types.LOAD_EVENTS_START,
});

export const loadEventsSuccess = events => ({
  type: types.LOAD_EVENTS_SUCCESS,
  payload: { events },
});

export const loadEventsFail = error => ({
  type: types.LOAD_EVENTS_FAIL,
  error,
});

export const deleteEventStart = () => ({
  type: types.DELETE_EVENT_START,
});

export const deleteEventSuccess = id => ({
  type: types.DELETE_EVENT_SUCCESS,
  payload: { id },
});

export const deleteEventFail = error => ({
  type: types.DELETE_EVENT_FAIL,
  error,
});

export const loadSingleEventStart = () => ({
  type: types.LOAD_SINGLE_EVENT_START,
});

export const loadSingleEventSuccess = event => ({
  type: types.LOAD_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const loadSingleEventFail = err => ({
  type: types.LOAD_SINGLE_EVENT_FAIL,
  payload: { err },
});

export const removeSingleEvent = () => ({
  type: types.REMOVE_SINGLE_EVENT,
});

export const updateEventStart = data => ({
  type: types.UPDATE_SINGLE_EVENT_START,
  payload: { data },
});

export const updateEventSuccess = event => ({
  type: types.UPDATE_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const updateEventFail = err => ({
  type: types.UPDATE_SINGLE_EVENT_FAIL,
  payload: { err },
});

export const createEventStart = data => ({
  type: types.CREATE_SINGLE_EVENT_START,
  payload: { data },
});

export const createEventSuccess = event => ({
  type: types.CREATE_SINGLE_EVENT_SUCCESS,
  payload: { event },
});

export const createEventFail = err => ({
  type: types.CREATE_SINGLE_EVENT_FAIL,
  payload: { err },
});
