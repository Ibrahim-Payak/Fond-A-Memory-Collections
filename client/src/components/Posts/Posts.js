import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import useStyle from "./style";

const Posts = ({ setCurrentId }) => {
  /* fetch data from redux store */
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyle();

  if (!posts.length && !isLoading) return "No Posts";

  // console.log(posts);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
