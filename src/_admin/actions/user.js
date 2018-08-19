import axios from 'axios';
import {
  FETCH_ACTIVE_USER,
  FETCH_SELECTED_USER,
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  SELECT_USER,
  DESELECT_USER
} from '../constants/user';

const localtionArr = window.location.href.split("/");
const baseURL = localtionArr[0] + "//" + localtionArr[2];

/**
 * Fetch active user
 */
export function fetchActiveUser() {
  return dispatch => {
    return dispatch({
      type: FETCH_ACTIVE_USER,
      payload: axios.get(baseURL + '/api/user')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch selected user
 * @param {string} userID
 */
export function fetchSelectedUser(userID) {
  let data = {
    userID
  };

  return dispatch => {
    return dispatch({
      type: FETCH_SELECTED_USER,
      payload: axios.post(baseURL + '/api/user/select', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Fetch users
 */
export function fetchUsers() {
  return dispatch => {
    return dispatch({
      type: FETCH_USERS,
      payload: axios.get(baseURL + '/api/user/all')
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Create user
 * @param {string} username
 * @param {string} name
 * @param {string} email
 * @param {string} role
 * @param {string} password
 */
export function createUser(username, name, email, role, password) {
  let data = {
    username,
    name,
    email,
    role,
    password
  };

  return dispatch => {
    return dispatch({
      type: CREATE_USER,
      payload: axios.post(baseURL + '/api/user/create', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Edit user
 * @param {string} userID
 * @param {string} username
 * @param {string} name
 * @param {string} email
 * @param {string} role
 */
export function editUser(userID, username, name, email, role) {
  let data = {
    userID,
    username,
    name,
    email,
    role
  };

  return dispatch => {
    return dispatch({
      type: EDIT_USER,
      payload: axios.post(baseURL + '/api/user/edit', data)
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Delete user
 * @param {string} userID
 */
export function deleteUser(userID) {
  let data = {
    userID
  };

  return dispatch => {
    return dispatch({
      type: DELETE_USER,
      payload: axios.post(baseURL + '/api/user/delete', data),
      meta: userID
    })
    .catch((error) => {
      if (error instanceof Error) {
        console.log(error);
      }
    });
  }
}

/**
 * Select user
 * @param {Object} user
 */
export function selectUser(user) {
  return dispatch => {
    dispatch({
      type: SELECT_USER,
      user: user
    });
  }
}

/**
 * Deselect user
 */
export function deselectUser() {
  return dispatch => {
    dispatch({
      type: DESELECT_USER
    });
  }
}
