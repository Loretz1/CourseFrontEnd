import axios from 'axios'

export const login = (username, password) =>
  post("/user/login", {
    username: username,
    password: password,
  });

