import $ from 'jquery';
import axios from 'axios';

const AUTH_URL = 'https://apis.google.com/js/client:plus.js?onload=gpAsyncInit';
const CLIENT_ID = '186649870077-vrb6g8dg8vp38on5uqki9lsg2jm3gvjr.apps.googleusercontent.com';
const USER_DATA = 'https://www.googleapis.com/auth/calendar email profile';
const CALLBACK_URL =
  'http://backend.proplanner.formula1.cloud.provectus-it.com/auth/google_oauth2/callback';

// (() => {
//   axios.get(AUTH_URL, {
//     params: {
//       dataType: 'script',
//       cache: true,
//     },
//   });
// })();
$(() => {
  $.ajax({
    url: AUTH_URL,

    dataType: 'script',

    cache: true,
  });
});

export function autoInit() {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth', () => {
      window.gpAsyncInit = () => {
        window.gapi.auth.authorize(
          {
            immediate: true,
            response_type: 'code',
            cookie_policy: 'single_host_origin',
            client_id: CLIENT_ID,
            scope: USER_DATA,
          },
          response => resolve(response)
        );
      };
    });
  });
}

export default function authorization() {
  return new Promise((resolve, reject) =>
    window.gapi.load('client:auth', () =>
      window.gapi.auth.authorize(
        {
          immediate: false,
          response_type: 'permission',
          cookie_policy: 'none',
          client_id: CLIENT_ID,
          scope: USER_DATA,
        },
        response => {
          if (response && !response.error) {
            window.gapi.auth.getToken()['g-oauth-window'] = null;
            console.log(response);

            axios(CALLBACK_URL, { params: response })
              .then(res => resolve(res.data))
              .catch(error => {
                throw new Error(error);
              });
          } else {
            reject(response.error);
          }
        }
      )
    )
  );
}

export function setTokenToStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function logOut() {
  localStorage.removeItem('user');
}
