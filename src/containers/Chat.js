import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container } from 'muicss/react';
import io from 'socket.io-client';
import { fetchUser } from '../actions/user';
import {
  isTyping,
  isNotTyping
} from '../actions/typer';
import {
  fetchChatRooms,
  createChatRoom
} from '../actions/chat-room';
import {
  fetchMessages,
  sendMessage
} from '../actions/message';
import Header from './Common/Header';
import SideDrawer from './Part/SideDrawer';
import Head from '../components/Head';
import ChatBubble from '../components/Chat/ChatBubble';
import ChatInput from '../components/Chat/ChatInput';
require('../styles/Chat.scss');

const socket = io('');

class Chat extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }
  componentDidMount() {
    const {
      isTyping,
      isNotTyping
    } = this.props;

    socket.on('typing broadcast', name =>
      isTyping(name)
    );
    socket.on('not typing broadcast', name =>
      isNotTyping(name)
    );

    ::this.handleScrollToBottom();
  }
  componentDidUpdate() {
    ::this.handleScrollToBottom();
  }
  handleScrollToBottom() {
    this.messagesBottom.scrollIntoView();
  }
  handleSendMessage(data) {
    this.props.dispatch(sendMessage(data));
  }
  render() {
    const { 
      user,
      typer,
      message
    } = this.props;

    return (
      <div className="chat-page">
        <Head title="Chat App" />
        <Header />
        <SideDrawer />
        <div className="chat-box">
          <Container fluid={true}>
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <ChatBubble
              userData={user.userData}
              message="Hello World"
              isSender={false}
            />
            <ChatBubble 
              userData={user.userData}
              message="Hi World" 
              isSender={true}
            />
            <div style={{ float:"left", clear: "both" }}
              ref={(element) => { this.messagesBottom = element; }}>
            </div>
          </Container>
        </div>
        <ChatInput
          userData={user.userData}
          socket={socket}
          handleSendMessage={::this.handleSendMessage}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {  
  return {
    user: state.user,
    typer: state.typer,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    isTyping,
    isNotTyping,
    fetchChatRooms,
    createChatRoom,
    fetchMessages,
    sendMessage
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);