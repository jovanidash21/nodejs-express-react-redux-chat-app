import {
  FETCH_ACTIVE_USER,
  FETCH_USERS_COUNT,
  FETCH_USERS_GRAPH,
  FETCH_SELECTED_USER,
  FETCH_USERS,
  SEARCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER
} from '../constants/user';

const initialState = {
  count: 0,
  isFetchingActive: false,
  isFetchingActiveSuccess: false,
  isFetchingCount: false,
  isFetchingCountSuccess: false,
  isFetchingGraph: false,
  isFetchingGraphSuccess: false,
  isFetchingSelected: false,
  isFetchingSelectedSuccess: false,
  isFetchingAll: false,
  isFetchingAllSuccess: false,
  isCreating: false,
  isCreatingSuccess: true,
  isEditing: false,
  isEditingSuccess: true,
  isDeleting: false,
  isDeletingSuccess: true,
  active: {},
  graph: [],
  all: [],
  selected: {},
  search: []
};

const user = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_ACTIVE_USER}_LOADING`:
      return {
        ...state,
        isFetchingActive: true
      };
    case `${FETCH_USERS_COUNT}_LOADING`:
      return {
        ...state,
        isFetchingCount: true
      };
    case `${FETCH_USERS_GRAPH}_LOADING`:
      return {
        ...state,
        isFetchingGraph: true
      };
    case `${FETCH_SELECTED_USER}_LOADING`:
      return {
        ...state,
        isFetchingSelected: true
      };
    case `${FETCH_USERS}_LOADING`:
      return {
        ...state,
        isFetchingAll: true
      };
    case `${SEARCH_USER}_LOADING`:
      return {
        ...state,
        search: []
      };
    case `${CREATE_USER}_LOADING`:
      return {
        ...state,
        isCreating: true
      };
    case `${EDIT_USER}_LOADING`:
      return {
        ...state,
        isEditing: true
      };
    case `${DELETE_USER}_LOADING`:
      return {
        ...state,
        isDeleting: true
      };
    case `${FETCH_ACTIVE_USER}_SUCCESS`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: true,
        active: action.payload.data
      };
    case `${FETCH_USERS_GRAPH}_SUCCESS`:
      return {
        ...state,
        isFetchingGraph: false,
        isFetchingGraphSuccess: true,
        graph: action.payload.data
      };
    case `${FETCH_USERS_COUNT}_SUCCESS`:
      return {
        ...state,
        count: action.payload.data.count,
        isFetchingCount: false,
        isFetchingCountSuccess: true
      };
    case `${FETCH_SELECTED_USER}_SUCCESS`:
      return {
        ...state,
        isFetchingSelected: false,
        isFetchingSelectedSuccess: true,
        selected: action.payload.data
      };
    case `${FETCH_USERS}_SUCCESS`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: true,
        all: action.payload.data
      };
    case `${SEARCH_USER}_SUCCESS`:
      return {
        ...state,
        search: action.payload.data
      };
    case `${CREATE_USER}_SUCCESS`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: true
      };
    case `${EDIT_USER}_SUCCESS`:
      return {
        ...state,
        isEditing: false,
        isEditingSuccess: true
      };
    case `${DELETE_USER}_SUCCESS`:
      var users = [...state.all];
      var userID = action.meta;

      users = users.filter((user) => user._id !== userID);

      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: true,
        all: [...users]
      };
    case `${FETCH_ACTIVE_USER}_ERROR`:
      return {
        ...state,
        isFetchingActive: false,
        isFetchingActiveSuccess: false
      };
    case `${FETCH_USERS_COUNT}_ERROR`:
      return {
        ...state,
        isFetchingCount: false,
        isFetchingCountSuccess: false
      };
    case `${FETCH_USERS_GRAPH}_ERROR`:
      return {
        ...state,
        isFetchingGraph: false,
        isFetchingGraphSuccess: false
      };
    case `${FETCH_SELECTED_USER}_ERROR`:
      return {
        ...state,
        isFetchingSelected: false,
        isFetchingSelectedSuccess: false
      };
    case `${FETCH_USERS}_ERROR`:
      return {
        ...state,
        isFetchingAll: false,
        isFetchingAllSuccess: false
      };
    case `${SEARCH_USER}_ERROR`:
      return {
        ...state,
        search: []
      };
    case `${CREATE_USER}_ERROR`:
      return {
        ...state,
        isCreating: false,
        isCreatingSuccess: false
      };
    case `${EDIT_USER}_ERROR`:
      return {
        ...state,
        isEditing: false,
        isEditingSuccess: false
      };
    case `${DELETE_USER}_ERROR`:
      return {
        ...state,
        isDeleting: false,
        isDeletingSuccess: false
      };
    default:
      return state;
  }
}

export default user;
