import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import AuthRoute from "components/auth/AuthRoute";
import Dashboard from "pages/Dashboard";
import ResetPasswordPage from "pages/ResetPasswordPage";
// import ProfilePage from "pages/ProfilePage";
import RefreshLoginModal from "components/auth/RefreshLoginModal";

const Router = () => (
  <BrowserRouter>
    <RefreshLoginModal />
    <Switch>
      <Route path="/auth/resetpassword/:token" component={ResetPasswordPage} />
      <Route path="/auth/resetpassword" component={ResetPasswordPage} />
      <Route path="/login" component={LoginPage} />
      {/* <AuthRoute path="/profile" component={ProfilePage} /> */}
      <AuthRoute path="/" component={Dashboard} allowUnverified />
    </Switch>
  </BrowserRouter>
);

export default Router;
