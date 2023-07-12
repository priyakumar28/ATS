import "./Jobupdation.css";
import { createTheme, ThemeProvider } from "@mui/material";
import AssignJobPost from "../JobUpdation/AssignJobPost/Assignjobpost";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import {
  getDrafts,
  getJobById,
  getJobTemplates,
  getRecruitersByBranchId,
  getSkills,
} from "../../services/jobPostService";
import PreviewPost from "./Priviewpost/Priviewpost";
import Loader from "../Loader/Loader";
import CandidateListByJob from "../viewinterview/CandidateListByJob";
import UpdateJobPost from "./UpdateJobPost/UpdateJobPost";

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

function JobUpdation({jobPostingData , setJobPostingData,recruiters,skills }) {


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



  useEffect(() => {
    getJobTemplates(1)
      .then((data) => setTemplates(data))
      .then(() => getDrafts(1))
      .then((data) => setDrafts(data))
      .then(() => {setLoader(false); getRecruitersByBranchId(1)})
      .catch((error) => alert(error.message));
  }, []);


  // const updateJobPostingForm = () => {
  //   getJobById(80).then((data) => {
  //     console.log(data);
  //     const parsedContentState = convertFromRaw(
  //       JSON.parse(deCompressContent(data.description))
  //     );
  //     const desc = EditorState.createWithContent(parsedContentState);
  //     const parsedContentState1 = convertFromRaw(
  //       JSON.parse(deCompressContent(data.requirements))
  //     );
  //     const desc1 = EditorState.createWithContent(parsedContentState1);

  //     setJobPostingData({
  //       id: data.id,
  //       title: data.title,
  //       experience: data.experience,
  //       noOfVaccancies: data.noOfVaccancies,
  //       recruitersIdWithAssignedCounts: data.jobRecruiters.map(
  //         (item) => item.recruiterId
  //       ),
  //       skillIds: data.skills.map((item) => item.id),
  //       type: data.type,
  //       location: data.location,
  //       openDate: data.openDate,
  //       closeDate: data.closeDate,
  //       description: desc,
  //       requirement: desc1,
  //       createdBy: data.createdBy,
  //       modifiedBy: data.modifiedBy,
  //       status: data.status,
  //     });
  //   });
  // };

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
                  <UpdateJobPost
                    drafts={drafts}
                    jobPostingData={jobPostingData}
                    setJobPostingData={setJobPostingData}
                    templates={templates}
                    skills={skills}
                    recruiters={recruiters}
                  />
                }
              />
              <Route
                path={"/assign-job-post"}
                element={
                  <AssignJobPost
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
                    setJobPostingData={setJobPostingData}
                  />
                }
              />
              </Routes>
          </ThemeProvider>
        }
      </div>
    </>
  );
}

export default JobUpdation;
