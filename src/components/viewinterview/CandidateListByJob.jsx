import {
  Grid,
  IconButton,
  Modal,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, display, fontSize, maxWidth } from "@mui/system";
import React, { Component, useEffect, useState } from "react";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faListCheck,
  faSackDollar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import LaunchIcon from "@mui/icons-material/Launch";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { viewAllInterviewStatusByJob } from "../../services/ViewProfileServices";
import { JoinFull } from "@mui/icons-material";
import ViewInterviewerStatus from "./ViewInterviewerStatus";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { viewFile } from "../../services/platformFileUploadService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const style = {
  position: "absolute",
  left: "50%",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "100vh",
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#EAF3F9",
  },
}));

const CandidateListByJob = () => {
  const { jobId } = useParams();
  const { branchId } = useParams();
  const [candidateList, setCandidateList] = useState([]);
  const [job, setJob] = useState({});
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [openResume, setOpenResume] = useState("");

  useEffect(() => {
    viewAllInterviewStatusByJob(jobId).then((resp) => {
      if (resp.statusCode == 2200) {
        setCandidateList(resp.value.applicantDetails);
        setJob(resp.value.jobPost);
        setRender(true);
        console.log(resp.value.applicantDetails);
      }
    });
  }, []);

  const getRandomColor = () => {
    const colors = ["secondary.main", "secondary.dark", "primary.main"];
    return colors[Math.floor(Math.random() * 3)];
  };

  const [renderAll, setRenderAll] = useState(true);
  const [applicant, setApplicant] = useState({});

  const handleViewProfile = (applicant) => {
    console.log(applicant);
    navigate("/applicant-interviews/" + applicant);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "HIRED":
        return "green";
        break;
      case "OFFERACCEPTED":
        return "orange";
        break;
      case "OFFERED":
        return "purple";
        break;
      case "DECLINED":
        return "red";
        break;
      case "OFFERREJECTED":
        return "gray";
        break;
      case "REJECTED":
        return "red";
        break;
      case "NEW":
        return "darkblue";
        break;
      case "INPROCESS":
        return "yellow";
        break;
      default:
        return "black";
    }
  };

  const [resumeLink, setResumeLink] = useState("");

  const handeOpenResume = async (resume) => {
    await viewFile(
      "linux-commands-cheat-sheet-A42023-06-08T18:05:18.665250784.pdf"
    ).then((resp) => setResumeLink(resp.value));
    handleOpen();
  };

  const getType = (type) => {
    switch (type) {
      case "FULLTIME":
        return "Full Time";
        break;
      case "PARTTIME":
        return "Part Time";
        break;
      case "REMOTE":
        return "Remote";
        break;
      default:
        return "Not Disclosed";
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "NEW":
        return "New";
        break;
      case "OFFERACCEPTED":
        return "Part Time";
        break;
      case "OFFERED":
        return "Offered";
        break;
      case "DECLINED":
        return "Declined";
        break;
      case "HIRED":
        return "Hired";
        break;
      case "OFFERREJECTED":
        return "Offer Rejected";
        break;
      case "REJECTED":
        return "Rejected";
        break;
      case "INPROCESS":
        return "InProcess";
        break;
      default:
        return "Not Disclosed";
    }
  };

  return (
    <div>
      {render && (
        <Grid container>
          <Grid item xl={9.5} md={9.5} sm={12} xs={12} px={2}>
            <Grid item mt={1}>
              <IconButton onClick={() => navigate(-1)} disableRipple>
                <ArrowBackIcon sx={{ fontSize: 30 }} color="primary" />
              </IconButton>
            </Grid>
            <Grid item mt={1}>
              <Typography variant="h5" color={"purple"} fontSize={32}>
                {job.title}
              </Typography>
              <Typography mt={1} fontSize={16}>
                BAssure, Chennai, Tamil Nadu, India(On-site).
              </Typography>
            </Grid>
            <Grid container marginTop="1%" rowSpacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" alignItems="center">
                  <BusinessCenterIcon sx={{ color: "purple", mb: 1 }} />
                  <span style={{ marginLeft: "10px" }}>
                    {getType(job.type)}
                  </span>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faUsers} color="purple" />
                  <span style={{ marginLeft: "10px", paddingTop: "5px" }}>
                    {job.noOfVaccancies} vacancies
                  </span>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faSackDollar} color="purple" />
                  <span style={{ margin: "10px", paddingTop: "5px" }}>
                    {job.experience}
                    {" Experience"}
                  </span>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faBookOpen} color="purple" />
                  <span style={{ marginLeft: "10px", marginTop: "5px" }}>
                    {job.location}
                  </span>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Box display="flex" alignItems="center">
                  <FontAwesomeIcon icon={faListCheck} color="purple" />
                  <Grid sx={{ display: "flex", ml: "10px" }}>
                    {job.skills.map(
                      (skill, i) =>
                        i < 4 && (
                          <Typography
                            sx={{ mx: "4px" }}
                          >{`${skill.name}`}</Typography>
                        )
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: { xl: "none", md: "none", sm: "block", xs: "block" },
              }}
            >
              <Grid item>
                <Box display={"flex"} mt={3} mx={2} alignItems={"center"}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    color="purple"
                    fontSize={32}
                  />

                  <Typography sx={{ fontWeight: 700 }} variant="h5" ml={2}>
                    Recruiters
                  </Typography>
                </Box>
              </Grid>
              <Grid container rowSpacing={3} mt={1}>
                {job.jobRecruiters.map((recuriter) => (
                  <Grid item md={4} sx={{ m: { sm: 2, xs: 0 } }}>
                    <Box
                      bgcolor={getRandomColor()}
                      sx={{
                        width: "250px",
                        height: "90px",
                        opacity: "60%",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space",
                        borderRadius: 3,
                        position: "relative",
                      }}
                      component={Paper}
                      elevation={5}
                    >
                      <Box className={"bubbleBottom1"}></Box>
                      <Box className={"bubbleBottom2"}></Box>
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
                          {recuriter.recuriterDetails.firstName}{" "}
                          {recuriter.recuriterDetails.lastName}
                        </Typography>
                        <Box
                          component={Paper}
                          eleveation={10}
                          sx={{
                            bgcolor: "white",
                            height: "45px",
                            opacity: "10%",
                            width: "45px",
                            borderRadius: "50%",
                            position: "relative",
                            top: "-35px",
                            boxShadow: "0px 6px 17px 0px #00000040",
                          }}
                          zIndex={-1}
                        >
                          <Box
                            style={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                              position: "absolute",
                              top: 20,
                              left: 25,
                              backgroundColor: "white",
                              opacity: "70%",
                            }}
                            alt=""
                          />
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        direction={"column"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography color={"white"} fontSize={".8rem"}>
                          {recuriter.recuriterDetails.designation}
                        </Typography>
                        <Box>
                          <Typography color={"white"} fontSize={".8rem"}>
                            Assigned Task : {recuriter.assignedCounts}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid>
              <Typography variant="h6" mt={3} ml={2} fontSize={34}>
                Applicants
              </Typography>
            </Grid>

            <Grid mt={2} mx={2}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Applicant Name</StyledTableCell>
                      <StyledTableCell align="left">E-Mail</StyledTableCell>
                      <StyledTableCell align="left">Phone</StyledTableCell>
                      <StyledTableCell align="left" sx={{ pl: 3 }}>
                        Status&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Feed back&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Resume&nbsp;
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        View Profile&nbsp;
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidateList?.map((row) => (
                      <StyledTableRow key={row.applicantId}>
                        <StyledTableCell
                          onClick={() => handleViewProfile(row.applicantId)}
                          component="th"
                          scope="row"
                        >
                          {row?.firstName} {row?.lastName}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.contactNo}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box display={"flex"} alignItems={"center"}>
                            <FiberManualRecordIcon
                              sx={{
                                color: chooseColor(row?.applicantStatus),
                              }}
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {getStatus(row?.applicantStatus)}
                            </span>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box display={"flex"} alignItems={"center"}>
                            <LaunchIcon sx={{ color: "purple" }} />
                            <span style={{ marginLeft: "10px" }}>view</span>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box display={"flex"} alignItems={"center"}>
                            <LaunchIcon
                              sx={{ color: "purple" }}
                              onClick={() => handeOpenResume(row?.resumePath)}
                            />
                            <span
                              style={{ marginLeft: "10px" }}
                              onClick={() => handeOpenResume(row?.resumePath)}
                            >
                              view
                            </span>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Box display={"flex"} alignItems={"center"}>
                            <LaunchIcon
                              sx={{ color: "purple" }}
                              onClick={() => handleViewProfile(row.applicantId)}
                            />
                            <span
                              style={{ marginLeft: "10px" }}
                              onClick={() => handleViewProfile(row.applicantId)}
                            >
                              view
                            </span>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid
            item
            xl={2.5}
            md={2.5}
            container
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            bgcolor={"secondary.light"}
            height={"100vh"}
          >
            <Grid item container position={"fixed"}>
              <Grid item container>
                <Grid item>
                  <Box display={"flex"} my={3} mx={2} alignItems={"center"}>
                    <FontAwesomeIcon
                      icon={faUsers}
                      color="purple"
                      fontSize={22}
                    />

                    <Typography sx={{ fontWeight: 700 }} variant="h5" ml={2}>
                      Recruiters
                    </Typography>
                  </Box>
                </Grid>
                <Grid item container rowSpacing={3}>
                  {job.jobRecruiters.map((recuriter, index) => (
                    <Grid item md={12} m={2}>
                      <Box
                        bgcolor={
                          index % 2 == 0 ? "primary.main" : "secondary.dark"
                        }
                        sx={{
                          width: "17vw",
                          height: { md: "110px", sm: "120px" },
                          opacity: "60%",
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
                        <Box className={"bubbleBottom1"}></Box>
                        <Box className={"bubbleBottom2"}></Box>
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
                            {recuriter.recuriterDetails.firstName}{" "}
                            {recuriter.recuriterDetails.lastName}
                          </Typography>
                          <Box
                            component={Paper}
                            eleveation={10}
                            sx={{
                              bgcolor: "white",
                              height: "45px",
                              opacity: "10%",
                              width: "45px",
                              borderRadius: "50%",
                              position: "relative",
                              top: "-10px",
                              boxShadow: "0px 6px 17px 0px #00000040",
                            }}
                            zIndex={-1}
                          >
                            <Box
                              style={{
                                height: "30px",
                                width: "30px",
                                borderRadius: "50%",
                                position: "absolute",
                                top: 20,
                                left: 25,
                                backgroundColor: "white",
                                opacity: "70%",
                              }}
                              alt=""
                            />
                          </Box>
                        </Box>
                        <Grid container display={"flex"}>
                          <Grid item md={6.5} sm={12}>
                            <Typography color={"white"} fontSize={".8rem"}>
                              {recuriter.recuriterDetails.designation}
                            </Typography>
                          </Grid>

                          <Grid item md={5.5} sm={12}>
                            <Typography color={"white"} fontSize={".8rem"}>
                              Assigned Task : {recuriter.assignedCounts}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <iframe
                // src={resumeLink}
                src={resumeLink}
                height={"100%"}
                width={"100%"}
              ></iframe>
            </Box>
          </Modal>
        </Grid>
      )}
    </div>
  );
};

export default CandidateListByJob;
