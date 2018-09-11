import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './login/styles.css';
import logo from 'assets/images/Logo.svg';
import { bindActionCreators } from 'redux';
import { authorizeOperations } from 'modules/Authentication/index.js';
import { connect } from 'react-redux';
import Button from './login/Button.js';

const LogoText = styled.p`
  position: relative;
  margin: 0;
  margin-bottom: 52px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  letter-spacing: 0.02em;
  color: #6a2789;

  &:before {
    content: url(${logo});
    position: relative;
    top: 20%;
    left: 5px;
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

const Link = styled.a`
  margin-left: 5px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  text-decoration-line: underline;
  cursor: pointer;
  color: #00bcd4;
`;

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  componentWillMount() {
    const { init, authorization } = this.props;

    init();

    if (authorization.loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  componentDidUpdate() {
    if (this.props.authorization.loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  login = authorize => {
    authorize();
  };

  render() {
    const loading = this.props.authorization.loading;

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    const { authorize } = this.props;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <div className="content">
          <LogoText>Pro planner</LogoText>

          <Header>Become a member</Header>

          <Text>
            Lorem ipsum dolor sit amet, sed do eiusmod tempor ut labore et dolore magna aliqua ut
            enim ad minim veniam.
          </Text>

          <Button clickHandle={() => this.login(authorize)} loading={loading} />

          <div className="contentBottom">
            <Text>
              Lorem ipsum dolor sit amet, sed do eiusmod
              <Link>Lorem ipsum dolor</Link>
            </Text>
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
  init: bindActionCreators(authorizeOperations.initialize, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
