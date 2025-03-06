import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

export default instance;
