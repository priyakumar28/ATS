import { http } from "../utils/commanUtils";

const baseUrl = "/applicant-service/api";

export const viewMyProfile = async (id) => {
  let response = await http.get(baseUrl + "/view-my-profile/" + id);
  return response.data;
};

export const viewAllRecuriters = async (branchId) => {
  let response = await http.get(
    baseUrl + "/view-recuriter-by-branchId/" + branchId
  );
  return response.data;
};

export const viewAllInterviewStatus = async (id, formdata) => {
  const params = new URLSearchParams(formdata).toString();
  let response = await http.get(
    baseUrl + "/view-scheduled-interview-status/" + id + "?" + params
  );
  return response.data;
};

export const viewAllInterviewStatusByJob = async (jobId) => {
  let response = await http.get(
    baseUrl + "/view-scheduler-details/" + jobId
  );
  return response.data;
};

export const viewInterviewsByApplicant = async (applicantId) => {
  console.log(applicantId);
  let response = await http.get(
    baseUrl + "/get-applicant-interviews/" + applicantId
  );
  return response.data;
};
