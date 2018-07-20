import { FETCH_MEMBERS } from '../constants/member';
import { CHANGE_CHAT_ROOM } from '../constants/chat-room';
import {
  SOCKET_BROADCAST_USER_LOGIN,
  SOCKET_BROADCAST_USER_LOGOUT
} from '../constants/auth';

const initialState = {
  isFetching: false,
  isFetchingSuccess: true,
  activeChatRoom: {
    data: {}
  },
  all: []
};

const member = (state=initialState, action) => {
  switch(action.type) {
    case `${FETCH_MEMBERS}_LOADING`:
      return {
        ...state,
        isFetching: true
      };
    case `${FETCH_MEMBERS}_SUCCESS`:
      return {
        ...state,
        isFetching: false,
        isFetchingSuccess: true,
        all: action.payload.data
      };
    case `${FETCH_MEMBERS}_ERROR`:
      return {
        ...state,
        isFetching: false,
        isFetchingSuccess: false
      };
    case CHANGE_CHAT_ROOM:
      return {
        ...state,
        activeChatRoom: action.chatRoom
      };
    case SOCKET_BROADCAST_USER_LOGIN:
      var user = action.user;
      var userID = user._id;
      var activeChatRoom = {...state.activeChatRoom};
      var members = [...state.all];
      var isMemberExist = false;

      for (var i = 0; i < members.length; i++) {
        var member = members[i];

        if ( member._id === userID ) {
          member.isOnline = true;
          isMemberExist = true;
          break;
        } else {
          continue
        }
      }

      if ( activeChatRoom.data.chatType === 'public' && !isMemberExist ) {
        user.isOnline = true;
        members.push(user);
      }

      return {
        ...state,
        all: [...members]
      }
    case SOCKET_BROADCAST_USER_LOGOUT:
      var userID = action.userID;
      var members = [...state.all]

      for (var i = 0; i < members.length; i++) {
        var member = members[i];

        if ( member._id === userID ) {
          member.isOnline = false;
          break;
        } else {
          continue
        }
      }

      return {
        ...state,
        all: [...members]
      }
    default:
      return state;
  }
}

export default member;
