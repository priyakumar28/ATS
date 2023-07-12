import CreateJobPost from "./Createjobpost/Createjobpost";
import "./Jobpost.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AssignJobPost from "./Assignjobpost/Assignjobpost";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import {
  getDrafts,
  getJobById,
  getJobTemplates,
  getRecruitersByBranchId,
  getSkills,
} from "../../services/jobPostService";
import PreviewPost from "./Priviewpost/Priviewpost";
import CreateTemplate from "./JobTemplate/CreateTemplate";
import Loader from "../Loader/Loader";
import CandidateListByJob from "../viewinterview/CandidateListByJob";
import AlertContext from "../contextProvider/AlertContext";

const pako = require("pako");

const theme = createTheme({
  typography: {
    fontFamily: "lato",
  },
  palette: {
    primary: {
      main: "#4b0082",
      light: "#003D62",
    },
    secondary: {
      main: "#F2F1F3",
      light: "#FAFAFA",
      dark: "#820078",
    },
  },
});

function Jobpost({jobPostingData , onGoingRequirements, profile,setJobPostingData,recruiters , skills}) {


const [jobTemplate , setJobTemplate] = useState({
  title:"",
  skillIds: [],
  branchId : "",
  createdBy : "",
  modifiedBy : "",
  description: EditorState.createEmpty(),
  requirement : EditorState.createEmpty()
}) 

const [templates,setTemplates] = useState([]);
const [loader, setLoader] = useState(true);
const [drafts ,setDrafts ] = useState([]);

const { setAlert } = useContext(AlertContext);


  useEffect(() => {
    getJobTemplates(1)
      .then((data) => setTemplates(data))
      .then(() => getDrafts(1))
      .then((data) => setDrafts(data))
      .then(() => {setLoader(false)})
      .catch((error) => setAlert({
        message : error.message,
        open : true
      }
        ));
  }, []);

 
  

  return (
    <>
      {loader && <Loader />}
      <div>
        {
          <ThemeProvider theme={theme}>
            <Routes>
              <Route
                path={"/"}
                element={
                  <CreateJobPost
                    drafts={drafts}
                    jobPostingData={jobPostingData}
                    setJobPostingData={setJobPostingData}
                    templates={templates}
                    skills={skills}
                    onGoingRequirements={onGoingRequirements}
                    recruiters={recruiters}
                  />
                }
              />
              <Route
                path={"/assign-job-post"}
                element={
                  <AssignJobPost
                  profile={profile}
                    recruiters={recruiters}
                    jobPostingData={jobPostingData}
                    setJobPostingData={setJobPostingData}
                  />
                }
              />
              <Route
                path={"/preview-post"}
                element={
                  <PreviewPost
                    jobPostingData={jobPostingData}
                    recruiters={recruiters}
                    onGoingRequirements={onGoingRequirements}
                    setJobPostingData={setJobPostingData}
                  />
                }
              />
              <Route
                path={"/create-template"}
                element={
                  <CreateTemplate
                    setTemplates={setTemplates}
                    jobTemplate={jobTemplate}
                    skills={skills}
                    onGoingRequirements={onGoingRequirements}
                  />
                }
              />
                <Route
                  path={"/candidates-job/:jobId"}
                  element={<CandidateListByJob />}
                />
              </Routes>
          </ThemeProvider>
        }
      </div>
    </>
  );
}

export default Jobpost;
