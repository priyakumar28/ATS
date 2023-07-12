import {
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useContext } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { Box } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import "../Priviewpost/Priviewpost.css";
import { convertToRaw ,EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJobPosting } from "../../../services/jobPostService";
import person1 from "../../../images/person1.jpg";
import person2 from "../../../images/person2.jpg";
import person3 from "../../../images/person3.jpg";
import OngoingRecuirements from "../../OnoingRecuiremments/OngoingRecuirements";
import AlertContext from "../../contextProvider/AlertContext";

const pako = require("pako");
const sidebarWidth = 21.6;

const PreviewPost = ({onGoingRequirements, jobPostingData, recruiters ,setJobPostingData }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const compressContent = (data) => {
    const compressedData = pako.deflate(data);
    return compressedData;
  };

  const [data, setData] = useState(jobPostingData);
  const { setAlert } = useContext(AlertContext);

  const getEditorContentAsHtml = (data) => {
    const contentState = data.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    return { __html: htmlContent };
  };

  const findRecruiter = (id) => {
    let x = recruiters.find((recruiter) => recruiter.employeeId === id);
    return x.firstName + " " + x.lastName;
  };

  const addJobPostAsDraft = () => {
    setOpen(true);
    let newJobPostingData = jobPostingData;
    newJobPostingData.draft = false;
    console.log(newJobPostingData);
    const compressedDescription = compressContent(
      JSON.stringify(
        convertToRaw(newJobPostingData.description.getCurrentContent())
      )
    );
    newJobPostingData.description = JSON.stringify(compressedDescription);
    const compressedRequirements = compressContent(
      JSON.stringify(convertToRaw(data.requirement.getCurrentContent()))
    );
    const convertedArray = newJobPostingData.recruitersIdWithAssignedCounts.map(
      ({ recruiterId, assignedTask }) => ({
        [recruiterId]: assignedTask,
      })
    );
    newJobPostingData.recruitersIdWithAssignedCounts = convertedArray;
    newJobPostingData.requirement = JSON.stringify(compressedRequirements);
    newJobPostingData.status = "OPEN";
    newJobPostingData.createdBy = 1;
    newJobPostingData.modifiedBy = 1;
    newJobPostingData.branchId = 1;
    addJobPosting(newJobPostingData).then((data) => {
      setAlert({
        message : "Job Post " + data ,
        open : true
      });
      setJobPostingData({
        id : 0,
        title:null,
        experience: "",
        noOfVaccancies:null,
        recruitersIdWithAssignedCounts:[],
        skillIds: [],
        type: "",
        location: "",
        openDate: "",
        closeDate: "",
        description: EditorState.createEmpty(),
        requirement : EditorState.createEmpty()
  })
  navigate("/");;
      setOpen(false);
    });
  };

  const addJobPost = () => {
    setOpen(true);
    let newJobPostingData = jobPostingData;
    newJobPostingData.draft = true;
    const compressedDescription = compressContent(
      JSON.stringify(
        convertToRaw(newJobPostingData.description.getCurrentContent())
      )
    );
    newJobPostingData.description = JSON.stringify(compressedDescription);
    const compressedRequirements = compressContent(
      JSON.stringify(convertToRaw(data.requirement.getCurrentContent()))
    );
    const convertedArray = newJobPostingData.recruitersIdWithAssignedCounts.map(
      ({ recruiterId, assignedTask }) => ({
        [recruiterId]: assignedTask,
      })
    );
    newJobPostingData.recruitersIdWithAssignedCounts = convertedArray;
    newJobPostingData.requirement = JSON.stringify(compressedRequirements);
    newJobPostingData.status = "OPEN";
    newJobPostingData.createdBy = 1;
    newJobPostingData.modifiedBy = 1;
    newJobPostingData.branchId = 1;

    addJobPosting(newJobPostingData).then((data) => {
      setAlert({
        message : "Job Post " + data , 
        open : true
      });
      navigate("/joblist");
      setJobPostingData({
        id : 0,
        title:null,
        experience: "",
        noOfVaccancies:null,
        recruitersIdWithAssignedCounts:[],
        skillIds: [],
        type: "",
        location: "",
        openDate: "",
        closeDate: "",
        description: EditorState.createEmpty(),
        requirement : EditorState.createEmpty()
  });
            setOpen(false);
      
    });
  };

  return (
    <>
      {open && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      { (!open &&  data.recruitersIdWithAssignedCounts.length > 0) && (
        <Grid container lg={12} display={"flex"}>
          <Grid item container width={`calc(100% - ${sidebarWidth}%)`}>
            <Grid
              item
              md={12}
              m={3}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography variant="h4" fontWeight={700}>
                Preview Job Post
              </Typography>
              <IconButton sx={{ color: "black" }} onClick={()=>navigate(-2)} >
                <EditNoteIcon sx={{ fontSize: "35px" }} />
                {/* <Typography variant="h5" fontWeight={700}>
                  Edit
                </Typography> */}
              </IconButton>
            </Grid>
            {/* //------------------------------------------------------------ */}
            <Grid item container md={12} m={3}>
              <Box>
                <Typography
                  variant="h4"
                  color={"primary.main"}
                  fontWeight={700}
                >
                  {data.title}
                </Typography>
                <Typography variant="body1">{data.location}</Typography>
              </Box>
            </Grid>
            {/* ------------------------------------------------------------------------------- */}
            <Grid
              item
              lg={12}
              display={"flex"}
              m={3}
              rowSpacing={3}
              flexDirection={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
            >
              <Grid
                item
                mb={3}
                lg={4}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <BusinessCenterIcon
                  sx={{ color: "primary.main", mr: 1.5, fontSize: "30px" }}
                />
                <Typography variant="body1">Type : {data.type}</Typography>
              </Grid>
              <Grid
                item
                mb={3}
                lg={4}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <AssessmentIcon
                  sx={{ color: "primary.main", mr: 1.5, fontSize: "30px" }}
                />
                <Typography variant="body1">
                  {" "}
                  Experience : {data.experience}
                </Typography>
              </Grid>
              <Grid
                item
                mb={3}
                lg={4}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <GroupsIcon
                  sx={{ color: "primary.main", mr: 1.5, fontSize: "30px" }}
                />
                <Typography variant="body1">
                  Number Of Openings - {data.noOfVaccancies}
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <CalendarMonthIcon
                  sx={{ color: "primary.main", mr: 1.5, fontSize: "30px" }}
                />
                <Typography variant="body1">
                  {" "}
                  From/End : {data.openDate} /{data.closeDate}
                </Typography>
              </Grid>
            </Grid>
            {/* ------------------------------------------------------------------------------------ */}
            <Grid item container lg={12} mt={3} marginLeft={4}>
              <Typography variant="h4" fontWeight={700}>
                Recruiters
              </Typography>
            </Grid>
            {/* ------------------------------------------------------------------------------------- */}

            <Grid
              container
              lg={12}
              p={3}
              display={"flex"}
              justifyContent={"flex-start"}
            >
              {data.recruitersIdWithAssignedCounts.map((recruiter, index) => (
                <Box
                  bgcolor={"primary.main"}
                  sx={{
                    width: "370px",
                    height: "100px",
                    p: 2,
                    mr: 5,
                    mb: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    position: "relative",
                  }}
                  component={Paper}
                  elevation={10}
                >
                  <Box className={"bubble4"}></Box>
                  <Box className={"bubble5"}></Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src={index %2 == 0 ? person1 : person2}
                      alt=""
                      style={{
                        height: "65px",
                        width: "65px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                    />
                    <Box>
                      <Typography color={"white"} fontWeight={700}>
                        {findRecruiter(recruiter.recruiterId)}
                      </Typography>
                      <Typography color={"white"}>
                        Assigned Task: {recruiter.assignedTask}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
            {/* <Box
              bgcolor={"primary.main"}
              sx={{
                width: "370px",
                height: "100px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                position: "relative",
              }}
              component={Paper}
              elevation={10}
            >
              <Box className={"bubble4"}></Box>
              <Box className={"bubble5"}></Box>
              <Box display={"flex"} alignItems={"center"}>
                <img
                  src="./images/person1.jpg"
                  alt=""
                  style={{
                    height: "65px",
                    width: "65px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <Box>
                  <Typography color={"white"} fontWeight={700}>
                    Jagadish
                  </Typography>
                  <Typography color={"white"}>Task Assign: 45 </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor={"primary.main"}
              sx={{
                width: "370px",
                height: "100px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                position: "relative",
              }}
              component={Paper}
              elevation={10}
            >
              <Box className={"bubble4"}></Box>
              <Box className={"bubble5"}></Box>
              <Box display={"flex"} alignItems={"center"}>
                <img
                  src="./images/person2.jpg"
                  alt=""
                  style={{
                    height: "65px",
                    width: "65px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <Box>
                  <Typography color={"white"} fontWeight={700}>
                    Jagadish
                  </Typography>
                  <Typography color={"white"}>Task Assign: 45 </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              bgcolor={"primary.main"}
              sx={{
                width: "370px",
                height: "100px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                position: "relative",
              }}
              component={Paper}
              elevation={10}
            >
              <Box className={"bubble4"}></Box>
              <Box className={"bubble5"}></Box>
              <Box display={"flex"} alignItems={"center"}>
                <img
                  src="./images/person3.jpg"
                  alt=""
                  style={{
                    height: "65px",
                    width: "65px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "15px",
                  }}
                />
                <Box>
                  <Typography color={"white"} fontWeight={700}>
                    Jagadish
                  </Typography>
                  <Typography color={"white"}>Task Assign: 45 </Typography>
                </Box>
              </Box>
            </Box> 
          </Grid> 
          {/* ----------------------------------------------------------------------------------------- */}
            <Grid
              item
              container
              lg={12}
              m={3}
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography variant="h4" fontWeight={700} mb={3}>
                About the job
              </Typography>
              <Typography variant="body1">
                Desired Experience Range : 2-3 yrs
              </Typography>
              <Typography variant="body1">Location : Chennai</Typography>
              <Typography variant="body1">
                Required technical skill set : Html ,Css ,JavaScript ,Bootstrap
              </Typography>
            </Grid>
            {/* ------------------------------------------------------------------------------------ */}

            <Grid
              item
              container
              lg={12}
              px={3}
              display={"flex"}
              flexDirection={"column"}
            >
              <Grid item>
                <Typography variant="h5" my={3}>
                  Description
                </Typography>
              </Grid>
              <Box
                mx={3}
                dangerouslySetInnerHTML={getEditorContentAsHtml(
                  data.description
                )}
              ></Box>
            </Grid>
            {/* --------------------------------------------------------------------------------------- */}

            <Grid
              item
              container
              lg={12}
              p={3}
              display={"flex"}
              flexDirection={"column"}
            >
              <Grid item>
                <Typography variant="h5" my={3}>
                  Requirements
                </Typography>
              </Grid>
              <Box
                mx={3}
                dangerouslySetInnerHTML={getEditorContentAsHtml(
                  data.requirement
                )}
              ></Box>
            </Grid>
            {/* --------------------------------------------------------------------------------------- */}

            <Grid container p={3} display={"flex"} justifyContent={"flex-end"}>
              <Button
                variant="outlined"
                sx={{
                  width: "190px",
                  height: "55px",
                  mr: 2,
                  color: "black",
                }}
                onClick={() => addJobPostAsDraft()}
              >
                Save as Draft
              </Button>
              <Button
                variant="contained"
                sx={{ width: "190px", height: "55px" }}
                onClick={() => addJobPost()}
              >
                Post
              </Button>
            </Grid>
          </Grid>
          <Grid
            sx={{ width: sidebarWidth + "%" }}
            item
            container
            bgcolor={"secondary.main"}
            minHeight={"100vh"}
          >
            <Grid item container position={"fixed"}>
            <OngoingRecuirements onGoingRequirements={onGoingRequirements} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PreviewPost;
