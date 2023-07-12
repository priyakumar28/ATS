import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8080",
});

export const mailHttp = axios.create({
  baseURL: "http://localhost:8083",
});

export const fileUploadHttp = axios.create({
  baseURL:"http://localhost:9090/file/"
})