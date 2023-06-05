import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import logo from "./images/logo.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyle from "./style";
import { getPosts } from "./redux/actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyle();
  // dispatch is hook
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Fond
        </Typography>
        <img
          className={classes.image}
          src={logo}
          alt="logo"
          height="60"
          width="60"
        />
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
