import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'muicss/react';
import './styles.scss';

class RegisterButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      type,
      isDisabled
    } = this.props;

    return (
      <div>
        {
          ((type === undefined) && (!isDisabled))
            ?
            <Link to="/register">
              <Button
                className='button button-register'
                size="large"
                variant="raised"
                disabled={false}
              >
                Register
              </Button>
            </Link>
            :
            <Button
              className='button button-register'
              size="large"
              type={type}
              variant="raised"
              disabled={isDisabled}
              to="/register" tag={Link}
            >
              Register
            </Button>
        }
      </div>
    )
  }
}

RegisterButton.propTypes = {
  type: PropTypes.string,
  isDisabled: PropTypes.bool
}

export default RegisterButton;
