import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './login/styles.css';
import logo from 'assets/images/logo.svg';
import { bindActionCreators } from 'redux';
import { authorizeOperations } from 'modules/Authentication/index.js';
import { connect } from 'react-redux';
import Button from './login/Button.js';

const LogoText = styled.p`
  margin: 0;
  margin-bottom: 52px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: #6a2789;

  &:before {
    content: url(${logo});
    display: inline-block;
    vertical-align: bottom;
    width: 70px;
    height: 42px;
  }

  @media (min-width: 1200px) {
    margin-bottom: 47px;
  }
`;

const Header = styled.h1`
  margin: 0;
  margin-bottom: 18px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: 52px;
  font-size: 48px;
  letter-spacing: -0.01em;
  color: #344662;

  @media (min-width: 1200px) {
    font-size: 64px;
  }
`;

const Text = styled.p`
  margin: 0 auto;
  text-align: left;
  max-width: 540px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: 25px;
  font-size: 18px;
  color: rgba(52, 70, 98, 0.8);

  @media (min-width: 768px) {
    margin: 0;
    max-width: auto;
  }
`;

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  componentWillMount() {
    const { authorization } = this.props;

    if (authorization.loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidUpdate() {
    const {
      authorization: { loggedIn },
    } = this.props;

    if (loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  login = authorize => {
    authorize();
  };

  render() {
    const {
      authorization: { loading },
      location: { state },
    } = this.props;

    const { from } = state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    const { authorize } = this.props;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <div className="content">
          <LogoText>ProPlanner</LogoText>

          <Header>Become a member</Header>

          <Text>
            ProPlanner - is a tool which help to put in order your work and personal goals using the
            SMART methodology. Just try it and you will not be able to plan in a different way!
          </Text>

          <Button clickHandle={() => this.login(authorize)} loading={loading} />

          <div className="contentBottom">
            <Text>Made with &hearts; from the ProPlanner team</Text>
          </div>
        </div>
        <div className="imgWrapper" />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  authorization: store.auth,
});

const mapDispatchToProps = dispatch => ({
  authorize: bindActionCreators(authorizeOperations.authorize, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

Login.propTypes = {
  authorize: PropTypes.func.isRequired,
  authorization: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
