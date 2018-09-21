import types from './types';

const initialState = {
  loading: false,
  deleting: false,
  eventsList: null,
  eventsSingleEvent: null,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case types.LOAD_EVENTS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsList: payload.events,
      };
    case types.LOAD_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    case types.DELETE_EVENT_START:
      return {
        ...state,
        deleting: true,
      };
    case types.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        error: null,
        eventsList: state.eventsList.filter(ev => ev.id !== payload.id),
      };
    case types.DELETE_EVENT_FAIL:
      return {
        ...state,
        deleting: false,
        error,
      };

    case types.LOAD_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsSingleEvent: payload.event,
      };
    case types.LOAD_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.REMOVE_SINGLE_EVENT:
      return {
        ...state,
        loading: false,
        eventsSingleEvent: null,
      };

    case types.UPDATE_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsSingleEvent: payload.res,
      };
    case types.UPDATE_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };

    case types.CREATE_SINGLE_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_SINGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        eventsSingleEvent: payload.res,
      };
    case types.CREATE_SINGLE_EVENT_FAIL:
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return state;
  }
};
