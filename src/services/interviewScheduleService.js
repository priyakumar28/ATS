import { http } from "../utils/commanUtils";
const CONTEXT_PATH = "/applicant-service/api";

export const getInterviewRounds = async () => {
  console.log("function");

  let response = await http.get(CONTEXT_PATH + "/interview/rounds");

  return response.data.value;
};
export const getAssignedJobs = async (id) => {
  console.log("function");
  let response = await http.get(CONTEXT_PATH + `/recruit/${id}/jobs`);
  console.log(response.data.value,"?????????????????????");
  return response.data.value;
};
export const getInterviewers = async (branchId) => {
  console.log("function");
  let response = await http.get(CONTEXT_PATH + `/interviewer/${branchId}`);
  console.log(response);
  return response.data.value;
};

export const postInterview = async (data) => {

  let response = await http.post(CONTEXT_PATH + "/interview-schedule", data);
  console.log(response, "data on submit");
  if (response.data.statusCode == "2200") return response.data.value;
  else throw new Error(response.data.errors.errors);
};

export const getScheduledInterviews = async (id) => {
  let response = await http.get(
    CONTEXT_PATH + "/interview/" + id + "/schedules"
  );
  if (response.data.statusCode == "2200") return response.data.value;
  // throw new Error(response.data.errors);
};

export const findCandidate = async (candidateId) => {
  console.log(candidateId,"inservice");
  let response = await http.get(CONTEXT_PATH + `/view-single-applicant/${candidateId}`
  );
  console.log(response.data,"In service .......");
  if (response.data.statusCode == "2200") return response.data.value;
  else throw new Error(response.data.errors);
};

export const getAllScheduledInterviews = async (id) => {
  let response = await http.get(
    CONTEXT_PATH + "/allinterview/" + id + "/schedules"
  );
  if (response.data.statusCode == "2200") return response.data.value;
  // throw new Error(response.data.errors);
};

export const viewScheduledInterviews = async (id) => {
  let response = await http.get(CONTEXT_PATH + "/scheduled-interview/" + id);
  console.log(response.data.value);
  return response.data.value;
};

export const postInterviewRound = async (round) => {
  let response = await http.post(CONTEXT_PATH + "/rounds",round)
  console.log(response.data,"round info....");
  if(response.data.statusCode == "2200") return response.data;
  return response.data;
}

export const findRoundForApplicant = async(id) =>{
  let response = await http.get(CONTEXT_PATH+`/rounds/${id}/applicant`)
  if(response.data.statusCode == "2200") return response.data;
  return response.data.errors.errors;
}