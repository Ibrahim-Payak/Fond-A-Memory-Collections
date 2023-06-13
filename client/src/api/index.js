import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const baseUrl = "http://localhost:5000/posts"; //this url contains our all posts

const userUrl = "http://localhost:5000/users";

//sending token to backend
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get(baseUrl);

export const createPost = (newPost) => API.post(baseUrl, newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`${baseUrl}/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`${baseUrl}/${id}`);

export const likePost = (id) => API.patch(`${baseUrl}/${id}/likePost`);

export const signIn = (formData) => API.post(`${userUrl}/signin`, formData);
export const signUp = (formData) => API.post(`${userUrl}/signup`, formData);
