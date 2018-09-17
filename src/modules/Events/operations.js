import axios from 'axios';
import { loadEventsStart, loadEventsSuccess, loadEventsFail } from './actions';
import { normalizeData } from './utils';
import { apiURL } from '../../config';

const eventsURL = `${apiURL}/events/`;

const loadEvents = () => dispatch => {
  dispatch(loadEventsStart());

  axios(eventsURL)
    .then(res => {
      const events = normalizeData(res.data.data);
      dispatch(loadEventsSuccess(events));
    })
    .catch(err => {
      dispatch(loadEventsFail(err));
      throw new Error(err);
    });
};

export default {
  loadEvents,
};
