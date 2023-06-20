import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { StylesProvider } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./style";
import Input from "./Input";
import "./style.css";
import { signUp, signIn } from "../../redux/actions/auth";

const initState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();
  const [formData, setFormData] = useState(initState);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // sign up logic
      dispatch(signUp(formData, history));
    } else {
      // sign in logic
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //toggle
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((prevState) => !prevState);

  const switchMode = () => {
    setFormData(initState);
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <StylesProvider injectFirst>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign up" : "Sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  handleShowConfirmPassword={handleShowConfirmPassword}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </StylesProvider>
  );
};

export default Auth;
