import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

const CONTEXT_PATH = "/applicant-service/api";

export const getJobTemplates = async (id) => {
  let response = await http.get(CONTEXT_PATH + "/get-job-templates");
  return response.data.value;
};

export const getSkills = async () => {
  let response = await http.get("skill/get-skills");
  if (response.data.statusCode === "2200") return response.data.value;
  throw new Error(response.data.errors);
};

export const getRecruitersByBranchId = async (id) => {
  let response = await http.get(
    `${CONTEXT_PATH}/view-recuriter-by-branchId/${id}`
  );
  if (response.data.statusCode === "2200") return response.data.value;
};

export const getJobById = async (id) => {
  let response = await http.get(CONTEXT_PATH + "/view-job/" + id);
  return response.data.value;
};

export const addJobPosting = async (data) => {
  let response = await http.post(CONTEXT_PATH + "/job-post", data);
  if (response.data.statusCode === "2200") return response.data.value;
  alert(response.data.errors.errors);
};

export const updateJobPosting = async (data) => {
  let response = await http.put(
    CONTEXT_PATH + "/update-job-post/" + data.id,
    data
  );
  if (response.data.statusCode === "2200") return response.data.value;
  alert(response.data.errors.errors);
};

export const addJobTemplate = async (data) => {
  let response = await http.post(CONTEXT_PATH + "/job-template", data);
  if (response.data.statusCode === "2200") return response.data.value;
  alert(response.data.errors.errors);
};

// export const getFilterAllJobPosting = async (id, selectedOption, searchValue) => {
//     let response = await http.get(`/jobListings/${id}?${selectedOption}=${searchValue}`)
//     console.log(response.data.value);
//     if (response.data.statusCode == "2200") return response.data.value;
//     // throw new Error(response.data.errors);
//   };
export const getFilterAllJobPosting = async (id, formdata) => {
  const params = new URLSearchParams(formdata).toString();
  console.log(params);
  let response = await http.get("/jobListings/" + id + "?" + params);
  console.log(response.data);
  return response.data;

};

// export const getAllInterviewsScheduled = async (id, formData) => {
//   const params = new URLSearchParams(formdata).toString();
//   console.log(params);
//   let response = await http.get(" " + id + "?" + params);
//   console.log(response.data);
//   return response.data;
// }

export const getAllJobPosting = async (id) => {
  let response = await http.get(`/jobListings/${id}`);
  if (response.data.statusCode == "2200") return response.data.value;
  // throw new Error(response.data.errors);
};

export const getJobStatistics = async (id) => {
  let response = await http.get(`${CONTEXT_PATH}/get-job-statics/${id}`);
  if (response.data.statusCode == "2200") return response.data.value;
};

export const getDrafts = async (id) => {
  let response = await http.get(`${CONTEXT_PATH}/get-job-draft/${id}`);
  if (response.data.statusCode == "2200") return response.data.value;
};

export const updateDraft = async (id) => {
  let response = await http.put(`${CONTEXT_PATH}/update-draft/${id}`);
  if (response.data.statusCode == "2200") return response.data.value;
};

export const getJobREcruiterStatistics = async (id, branchId) => {
  let response = await http.get(
    `${CONTEXT_PATH}/get-recruiters-statics?jobId=${id}&branchId=${branchId}`
  );
  if (response.data.statusCode == "2200") return response.data.value;
  else return [];
};

export const getOnGoingRequirements = async (branchId) => {
  let response = await http.get(`${CONTEXT_PATH}/jobs-inprocess/${branchId}`);
  if (response.data.statusCode == "2200") return response.data.value;
};
