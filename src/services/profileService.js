import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080",
});

const CONTEXT_PATH = "/applicant-service/api"

export const getProfile = async (id) => {
    let response = await http.get(`${CONTEXT_PATH}/view-my-profile/${id}`);
    console.log(response.data.value);
    if (response.data.statusCode == "2200") return response.data.value;
  }