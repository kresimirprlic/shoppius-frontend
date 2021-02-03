import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import SignupScreen from "./auth/pages/SignupScreen"
import LoginScreen from "./auth/pages/LoginScreen"
import SnackBar from "./shared/components/Feedback/SnackBar"
import ErrorModal from "./shared/components/Feedback/ErrorModal"
import AlertModal from "./shared/components/Feedback/AlertModal"
import NavAppBar from './shared/components/Navigation/NavAppBar';
import WelcomeScreen from "./shared/pages/Welcome"
import Test from "./shoppius/ShopPage"
import parseISO from "date-fns/parseISO";
import * as actionCreators from "./store/actions/index"
import './App.css';
import { CssBaseline } from '@material-ui/core';
import CheckoutScreen from "./shoppius/CheckoutPage"

let logoutTimer;

const App = (props) => {
  const {
    token,
    expirationDate,
    onLogout,
    role
  } = props;
 
  useEffect(() => {
    if (token && expirationDate) {
      const remainingTime = parseISO(expirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(onLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [expirationDate, onLogout, token])

  let routes;
  if (token && role.includes("isAuthorized")) {
    routes = (
      <Switch>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/checkout" component={CheckoutScreen} />
        <Route exact path="/test" component={Test} />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupScreen} />
        <Redirect to="/login" />

      </Switch>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <nav style={{ minWidth: 500 }}>
        <NavAppBar />
      </nav>
      <main >
        {routes}
      </main>
      {/* actionCreators.showSnackbar("message") */}
      <SnackBar />
      {/* actionCreators.showErrorModal("message") */}
      <ErrorModal />
      {/* props.onShowAlertModal("title","message",{ modalProps}); */}
      <AlertModal />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  expirationDate: state.auth.expirationDate,
  role:state.auth.role

});

const mapDispatchToProps = (dispatch) => ({
  // onSignup: (values) => dispatch(actionCreators.signup(values)), test
  onLogout: () => dispatch(actionCreators.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);