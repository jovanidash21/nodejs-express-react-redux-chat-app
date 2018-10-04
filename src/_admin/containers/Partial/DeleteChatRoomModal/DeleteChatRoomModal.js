import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Button
} from 'muicss/react';
import mapDispatchToProps from '../../../actions';
import { Modal } from '../../../../components/Modal';
import { Avatar } from '../../../../components/Avatar';
import { Alert } from '../../../../components/Alert';
import './styles.scss';

class DeleteChatRoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  componentDidUpdate(prevProps) {
    if ( prevProps.chatRoom.isFetchingSelected && !this.props.chatRoom.isFetchingSelected ) {
      this.setState({
        isLoading: false
      });
    }

    if ( prevProps.chatRoom.isDeleting && this.props.chatRoom.isDeletingSuccess ) {
      this.props.handleCloseModal();
    }
  }
  handleAvatar(chatRoomData, type='account') {
    var roleChatType = '';
    var accountType = '';

    switch ( chatRoomData.chatType ) {
      case 'private':
        if ( chatRoomData.members.length > 0 ) {
          roleChatType = chatRoomData.members[0].role;
          accountType = chatRoomData.members[0].accountType;
        }
        break;
      case 'public':
        roleChatType = 'public';
        break;
      default:
        break;
    }

    if ( type === 'role-chat' ) {
      return roleChatType;
    }
    return accountType;
  }
  handleDeleteChatRoom(event) {
    event.preventDefault();

    const {
      chatRoom,
      deleteChatRoom
    } = this.props;
    const selectedChatRoom = chatRoom.selected;

    deleteChatRoom(selectedChatRoom._id);
  }
  render() {
    const {
      chatRoom,
      isModalOpen,
      handleCloseModal
    } = this.props;
    const { isLoading } = this.state;
    const selectedChatRoom = chatRoom.selected;

    return (
      <Modal
        className="delete-chat-room-modal"
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        isDanger
        isLoading={isLoading}
      >
        <Form onSubmit={::this.handleDeleteChatRoom}>
          <Modal.Header>
            <h3 className="modal-title">Delete ChatRoom</h3>
          </Modal.Header>
          <Modal.Body>
            {
              !chatRoom.isDeleting &&
              !chatRoom.isDeletingSuccess &&
              <Alert label="Error! Please try again" />
            }
            <div className="avatar-wrapper">
              <Avatar
                image={selectedChatRoom.chatIcon}
                size="100px"
                name={selectedChatRoom.name}
                roleChatType={::this.handleAvatar(selectedChatRoom, 'role-chat')}
                accountType={::this.handleAvatar(selectedChatRoom)}
                badgeBigger
                badgeCloser
              />
            </div>
            <p>
              <span className="chatRoom-name mui--text-danger">{selectedChatRoom.name}</span>&nbsp;
              will be deleted. This will permanently delete all of messages on the chat room.
            </p>
            <p>This action cannot be undone. Are you sure you want to delete this chat room?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="button button-default"
              onClick={handleCloseModal}
              disabled={chatRoom.isDeleting}
            >
              Cancel
            </Button>
            <Button
              className="button button-danger"
              type="submit"
              disabled={chatRoom.isDeleting}
            >
              Yes, Delete ChatRoom
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chatRoom: state.chatRoom
  }
}

DeleteChatRoomModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired
}

DeleteChatRoomModal.defaultProps = {
  isModalOpen: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteChatRoomModal);
