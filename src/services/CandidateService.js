import axios from "axios";
import { http } from "../utils/commanUtils";
import { useContext } from "react";
const CONTEXT_PATH = "/applicant-service/api/";

export async function getCandidate() {
  let res = await http.get(CONTEXT_PATH + "view-applicant");
  return res.data.value;
}

export async function getSingleCandidate(id) {
  let res = await http.get(CONTEXT_PATH + "view-single-applicant/" + id);
  return res.data.value;
}


export async function getSingleCandidates(id) {
  let res = await http.get(CONTEXT_PATH + "view-single-applicants/" + id);
  return res.data.value;
}
export async function statusApp(data, statusId) {
  let resp = await http.post(
    CONTEXT_PATH + `${data.applicantId}/status?sts=` + statusId
  );
}

export async function addCandidate(data) {
  let res = await http.post(CONTEXT_PATH + "add-applicant-details", data);
  if (res.data.statusCode === "2200") {
    return res.data.value;
  } else {
    alert("unable to add an applicant");
  }
}

export async function updateCandidate(data) {
  let resp = await http.put(
    CONTEXT_PATH + "update/" + data.applicantDetailsId,
    data
  );
  console.log(resp.data.value, "result>>>>");
  if (resp.data.statusCode === "2200") {
    // alert("applicant updated successfully");
    return resp.data.value;
  } else {
    alert("unable to update applicant");
  }
}

export async function updateCandidateBasic(data) {
  let resp = await http.put(
    CONTEXT_PATH + "updateBasic/" + data.applicantId,
    data
  );
  if (resp.data.statusCode === "2200") {
    // alert("Applicant updated successfully");
    return resp.data.value;
  } else {
    alert("unable to update applicant");
  }
}

export async function addbasicdetails(data) {
  let resp = await http.post(CONTEXT_PATH + "add-applicant", data);
  if (resp.data.statusCode === "2200") {
    return resp.data.value;
  } else {
    return resp.data.statusCode;
  }
}

export async function addbasicdetailsEmail(data) {
  let resp = await http.post(CONTEXT_PATH + "add-applicant?email=true", data);
  if (resp.data.statusCode === "2200") {
    alert("Applicant added successfully");
    return resp.data.value;
  } else {
    alert("Applicant already exist");
    return resp.data.value;
  }
}

export const getAssignedJob = async (id) => {
  let response = await http.get(CONTEXT_PATH + id + "/job");
  return response.data.value;
};

export const getApplicantByJob = async () => {
  let response = await http.get(CONTEXT_PATH + "applicantjob");
  return response.data.value;
};

export async function getApplicantBySts(data) {
  let resp = await http.get(CONTEXT_PATH + "findBySts?sts=" + data);
  return resp.data.value;
}
export async function getApplicantByJobs(id) {
  let resp = await http.get(CONTEXT_PATH + "view-applicant-job/" + id);
  return resp.data.value;
}

export async function getApplicantByMob(data) {
  let resp = await http.get(CONTEXT_PATH + "findByMobile?mob=" + data);
  return resp.data.value;
}
export async function deleteApplicant(data) {
  let resp = await http.delete(CONTEXT_PATH + "deleteApplicantById/" + data);
  return resp.data.value;
}
