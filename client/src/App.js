import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            component={() => <Redirect to="/posts" />}
          ></Route>
          <Route path="/posts" exact component={Home}></Route>
          <Route path="/posts/search" exact component={Home}></Route>
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          ></Route>
        </Switch>
        <ToastContainer autoClose={3000} />
      </Container>
    </BrowserRouter>
  );
};

export default App;
