import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './actions';

const oauth = '187086391250-9m9j95u84r8bprfocq0g6db7gh34n7oj.apps.googleusercontent.com'

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: oauth,
        scope: 'email',
        prompt: "select_account"
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    }
    if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui button google red">
          <i className="google icon" />
          sign out
        </button>
      );
    }
    return (
      <button onClick={this.onSignInClick} className="ui button google primary">
        <i className="google icon" />
        sign in
      </button>
    );
  }

  render() {
    return <div className="item">{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return ({
    isSignedIn: state.auth.isSignedIn
  });
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);