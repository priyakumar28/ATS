import {
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React from "react";
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
import { convertToRaw ,convertFromRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addJobPosting, updateJobPosting } from "../../../services/jobPostService";

const pako = require("pako");
const sidebarWidth = 21.6;

const PreviewPost = ({ jobPostingData, recruiters ,setJobPostingData }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const compressContent = (data) => {
    const compressedData = pako.deflate(data);
    return compressedData;
  };

  const deCompressContent = (data) => {
    const deCompressContent = pako.inflate(JSON.parse(data), {
      to: "string",
    });
    return deCompressContent;
  };

  const [data, setData] = useState(jobPostingData);

  const getEditorContentAsHtml = (data) => {
    const contentState = data.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    return { __html: htmlContent };
  };

  const findRecruiter = (id) => {
    let x = recruiters.find((recruiter) => recruiter.employeeId === id);
    return x.firstName + " " + x.lastName;
  };


  const updateJobPost = () => {
    setOpen(true);
    let newJobPostingData = jobPostingData;
    newJobPostingData.draft = true;
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
    newJobPostingData.modifiedBy = 1;
    newJobPostingData.branchId = 1;
    console.log(newJobPostingData);
    updateJobPosting(newJobPostingData).then((data) => {
      alert("Job Post " + data);
      navigate("/");
      setJobPostingData({
        id : 0,
        title:null,
        experience: "",
        noOfVaccancies:null,
        jobRecruiters:[],
        skillIds: [],
        type: "",
        location: "",
        openDate: "",
        closeDate: "",
        createdBy : "",
        status : "",
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
      {!open && data.recruitersIdWithAssignedCounts.length > 0 && (
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
              <IconButton sx={{ color: "black" }}>
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
                        {findRecruiter(recruiter.recruiterId)}
                      </Typography>
                      <Typography color={"white"}>
                        Task Assign: {recruiter.assignedTask}{" "}
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
              {/* <Button
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
              </Button> */}
              <Button
                variant="contained"
                sx={{ width: "190px", height: "55px" }}
                onClick={() => updateJobPost()}
              >
                Update
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
              {/* <Grid item container>
                <Grid item>
                  <Box display={"flex"} m={2} mt={2} alignItems={"center"}>
                    <ArchitectureIcon
                      color="primary"
                      sx={{ fontSize: "40px", mr: 1 }}
                    />
                    <Typography variant="h5" fontWeight={700}>
                      Job Posts in Draft
                    </Typography>
                  </Box>
                </Grid>
                <Grid item container>
                  <Grid item md={12} mx={2} mb={1}>
                    <Box
                      bgcolor={"white"}
                      sx={{
                        width: "370px",
                        height: "120px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                      }}
                      component={Paper}
                    >
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Box>
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: 700 }}
                            variant="h6"
                          >
                            Intern Java Developer
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px" }}
                            color={"GrayText"}
                            variant="body2"
                          >
                            Networking-Chennnai,India
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: 700 }}
                            variant="h6"
                          >
                            Vaccancies : 39
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"end"}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            width: "110px",
                            height: "30px",
                            fontSize: ".7rem",
                            mr: 2,
                            color: "black",
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "110px",
                            height: "30px",
                            fontSize: ".7rem",
                          }}
                        >
                          Post
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"white"}
                      sx={{
                        width: "370px",
                        height: "120px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                      }}
                      component={Paper}
                    >
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Box>
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: 700 }}
                            variant="h6"
                          >
                            Intern Java Developer
                          </Typography>
                          <Typography
                            sx={{ fontSize: "12px" }}
                            color={"GrayText"}
                            variant="body2"
                          >
                            Networking-Chennnai,India
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "15px", fontWeight: 700 }}
                            variant="h6"
                          >
                            Vaccancies : 39
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"end"}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            width: "110px",
                            height: "30px",
                            fontSize: ".7rem",
                            mr: 2,
                            color: "black",
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "110px",
                            height: "30px",
                            fontSize: ".7rem",
                          }}
                        >
                          Post
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid item container>
                <Grid item>
                  <Box display={"flex"} my={2} mx={2} alignItems={"center"}>
                    <WorkHistoryIcon
                      color="primary"
                      sx={{ fontSize: "40px", mr: 1 }}
                    />
                    <Typography sx={{ fontWeight: 700 }} variant="h5">
                      Ongoing Recruitments
                    </Typography>
                  </Box>
                </Grid>
                <Grid item rowSpacing={1} container>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"primary.main"}
                      sx={{
                        width: "370px",
                        height: "90px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        position: "relative",
                      }}
                      component={Paper}
                      elevation={5}
                    >
                      <Box className={"bubble1"}></Box>
                      <Box className={"bubble2"}></Box>
                      <Box
                        component={Paper}
                        elevation={5}
                        sx={{
                          position: "absolute",
                          top: "-17px",
                          left: "25px",
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          bgcolor: "white",
                          width: "100px",
                          height: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircleIcon
                          sx={{ fontSize: "12px", color: "green", mr: 1 }}
                        />
                        <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                          In-progress
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "white",
                          }}
                          variant="h6"
                        >
                          Intern Java Developer
                        </Typography>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "white",
                            }}
                            variant="h6"
                          >
                            Vaccancies : 39
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography color={"white"} fontSize={".8rem"}>
                          ExpiryDate : 31/05/2023{" "}
                        </Typography>
                        <Box sx={{ position: "relative", top: -10 }}>
                          <img
                            src="./images/person1.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 1,
                              top: 0,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 80,
                            }}
                          />
                          <img
                            src="./images/person3.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 2,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 65,
                            }}
                          />
                          <img
                            src="./images/person2.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 3,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 45,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"secondary.dark"}
                      sx={{
                        width: "370px",
                        height: "90px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        position: "relative",
                      }}
                      component={Paper}
                      elevation={5}
                    >
                      <Box className={"bubble1"}></Box>
                      <Box className={"bubble2"}></Box>
                      <Box
                        component={Paper}
                        elevation={5}
                        sx={{
                          position: "absolute",
                          top: "-17px",
                          left: "25px",
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          bgcolor: "white",
                          width: "100px",
                          height: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircleIcon
                          sx={{ fontSize: "12px", color: "green", mr: 1 }}
                        />
                        <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                          In-progress
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "white",
                          }}
                          variant="h6"
                        >
                          Intern Java Developer
                        </Typography>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "white",
                            }}
                            variant="h6"
                          >
                            Vaccancies : 39
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography color={"white"} fontSize={".8rem"}>
                          ExpiryDate : 31/05/2023{" "}
                        </Typography>
                        <Box sx={{ position: "relative", top: -10 }}>
                          <img
                            src="./images/person1.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 1,
                              top: 0,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 80,
                            }}
                          />
                          <img
                            src="./images/person3.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 2,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 65,
                            }}
                          />
                          <img
                            src="./images/person2.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 3,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 45,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"primary.light"}
                      sx={{
                        width: "370px",
                        height: "90px",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 3,
                        position: "relative",
                      }}
                      component={Paper}
                      elevation={5}
                    >
                      <Box className={"bubble1"}></Box>
                      <Box className={"bubble2"}></Box>
                      <Box
                        component={Paper}
                        elevation={5}
                        sx={{
                          position: "absolute",
                          top: "-17px",
                          left: "25px",
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          bgcolor: "white",
                          width: "100px",
                          height: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CircleIcon
                          sx={{ fontSize: "12px", color: "green", mr: 1 }}
                        />
                        <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                          In-progress
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        justifyContent={"space-between"}
                      >
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "white",
                          }}
                          variant="h6"
                        >
                          Intern Java Developer
                        </Typography>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "white",
                            }}
                            variant="h6"
                          >
                            Vaccancies : 39
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography color={"white"} fontSize={".8rem"}>
                          ExpiryDate : 31/05/2023{" "}
                        </Typography>
                        <Box sx={{ position: "relative", top: -10 }}>
                          <img
                            src="./images/person1.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 1,
                              top: 0,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 80,
                            }}
                          />
                          <img
                            src="./images/person3.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 2,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 65,
                            }}
                          />
                          <img
                            src="./images/person2.jpg"
                            style={{
                              width: "20px",
                              height: "20px",
                              zIndex: 3,
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              right: 45,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PreviewPost;
