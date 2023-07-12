import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  tableCellClasses,
  tooltipClasses,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { viewInterviewsByApplicant } from "../../services/ViewProfileServices";
import PreviousInterviewStatus from "./PreviousInterviewStatus";
import styled from "@emotion/styled";
import { viewFile } from "../../services/platformFileUploadService";
import EmailIcon from "@mui/icons-material/Email";
import Email from "../email/Email";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HistoryIcon from "@mui/icons-material/History";
import CircleIcon from "@mui/icons-material/Circle";
import LaunchIcon from "@mui/icons-material/Launch";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useHistory } from "react-router-dom";
import { TabContext, TabPanel } from "@mui/lab";
import FeedBackForm from "../feedback/viewFeedback";

const backgroundcolor = "white";
const fontColor = "black";
const oddColumn = "white";
const evenColumn = "#fafafa";
const keyColor = "black";

const StyledOddRow = styled(Grid)({
  backgroundColor: oddColumn,
  display: "flex",
  alignItems: "center",
  paddingRight: 1,
  paddingLeft: 1,
});

const StyledEvenRow = styled(Grid)({
  backgroundColor: evenColumn,
  display: "flex",
  alignItems: "center",
  paddingRight: 1,
  paddingLeft: 1,
});

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
  typography: {
    fontFamily: "lato",
  },
  palette: {
    primary: {
      main: "#4b0082",
    },
  },
});

const KeySideGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  height: "45px",
  paddingRight: "10px",
});

const ValueSideGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  minHeight: "45px",
  paddingLeft: "10px",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fafafa",
    color: fontColor,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: oddColumn,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fafafa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const convertTimeStampIntoYear = (year) => {
  return new Date(year).getFullYear();
};

const style = {
  position: "absolute",
  left: "50%",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "100vh",
};
const mailStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const feedBackStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "15px",
      width: 24,
      height: 24,
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const getJobStatusColor = (status) => {
  switch (status) {
    case "OPEN":
      return "darkblue";
      break;
    case "CLOSE":
      return "red";
      break;
    case "INPROCESS":
      return "green";
      break;
    default:
      return "black";
  }
};

const getResponseStatusColor = (status) => {
  switch (status) {
    case "SCHEDULED":
      return "darkblue";
      break;
    case "CANCELLED":
      return "red";
      break;
    case "COMPLETED":
      return "green";
      break;
    case "RESCHEDULED":
      return "yellow";
      break;
    default:
      return "black";
  }
};

const chooseColor = (status) => {
  switch (status) {
    // case "HIRED":
    //   return "green";
    //   break;
    // case "OFFERACCEPTED":
    //   return "orange";
    //   break;
    // case "OFFERED":
    //   return "purple";
    //   break;
    // case "DECLINED":
    //   return "red";
    //   break;
    // case "OFFERREJECTED":
    //   return "gray";
    //   break;
    // case "REJECTED":
    //   return "red";
    //   break;
    // case "NEW":
    //   return "darkblue";
    //   break;
    // case "INPROCESS":
    //   return "yellow";
    //   break;
    default:
      return "#4b0082";
  }
};

const ViewInterviewerStatus = () => {
  const [viewDetails, setViewDetails] = useState();
  const [previous, setPrevious] = useState([]);
  const [applicantName, setApplicantName] = useState("");
  const [previousStatus, setPreviousStatus] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);
  const [resumeLink, setResumeLink] = useState("");
  const [mail, setMail] = useState("");
  const [openMailModel, setOpenMailModel] = useState(false);
  const handleOpenMailModel = () => setOpenMailModel(true);
  const handleCloseMailModel = () => setOpenMailModel(false);
  const [openFeedBackModel, setOpenFeedBackModel] = useState(false);
  const handleOpenFeedBackModel = () => setOpenFeedBackModel(true);
  const handleCloseFeedBackModel = () => setOpenFeedBackModel(false);

  const [status, setStatus] = useState();
  const applicantId = useParams();
  const [interview, setInterview] = useState([]);
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [value, setValue] = useState(0);
  const [jobPost, setJobPost] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    viewInterviewsByApplicant(applicantId.applicantId).then((resp) => {
      if (resp.statusCode == 2200) {
        setInterview(resp.value);
        console.log(resp.value);
        setJobPost(resp.value.jobPost?.reverse());
        setRender(true);
      } else {
      }
    });
  }, []);

  const viewProfileDetails = (recuriterId) => {
    setViewDetails(recuriterId);
  };

  const handePreviousStatus = () => {
    setPrevious(interview.jobPost);
    setStatus(
      interview.applicant.applicantResponseId.applicantId.applicantStatus
    );
    setApplicantName(
      interview.applicant.applicantResponseId.applicantId.firstName +
        " " +
        interview.applicant.applicantResponseId.applicantId.lastName
    );
    setPreviousStatus(false);
  };

  const handeOpenResume = async () => {
    console.log(interview.applicant.resumePath);
    await viewFile(
      "linux-commands-cheat-sheet-A42023-06-08T18:05:18.665250784.pdf"
    ).then((resp) => (setResumeLink(resp.value), console.log(resp.value)));
    handleOpenModel();
  };

  const sendMail = (email) => {
    console.log(email);
    setMail(email);
    handleOpenMailModel();
  };
  return (
    <ThemeProvider theme={theme}>
      {render ? (
        <Grid
          container
          sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: backgroundcolor,
          }}
        >
          <Grid
            item
            md={1}
            sx={{
              px: 3,
              width: "10vw",
              display: { md: "block", sm: "none", xs: "block" },
            }}
          ></Grid>
          <Grid item md={10} sx={{ width: "80vw", py: 3, mx: 1 }}>
            <Grid>
              <Grid>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Button
                      variant="outlined"
                      endIcon={<KeyboardBackspaceIcon />}
                      sx={{ textTransform: "none", color: "#4b0082" }}
                    >
                      Back
                    </Button> */}
                  <Tooltip
                    title={<Typography color="inherit">back</Typography>}
                    followCursor
                  >
                    <IconButton onClick={() => navigate(-1)}>
                      <ArrowBackIcon
                        color="primary"
                        sx={{ fontSize: 30 }}
                        onClick={() => console.log(-1)}
                      />
                    </IconButton>
                  </Tooltip>

                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: fontColor, fontWeight: "bold", mx: 2 }}
                    >
                      {
                        interview.applicant.applicantResponseId?.applicantId
                          .firstName
                      }{" "}
                      {
                        interview.applicant.applicantResponseId?.applicantId
                          .middleName
                      }{" "}
                      {
                        interview.applicant.applicantResponseId?.applicantId
                          .lastName
                      }
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        mx: 2,
                        backgroundColor: chooseColor(
                          interview.applicant.applicantResponseId.applicantId
                            .applicantStatus
                        ),
                        px: 2,
                        py: 1,
                        borderRadius: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .applicantStatus
                      }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    py: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" sx={{ color: fontColor }}>
                    Basic Information
                  </Typography>
                  <Grid sx={{ display: "flex" }}>
                    <Button
                      variant="text"
                      disableRipple
                      onClick={() => handeOpenResume()}
                      sx={{
                        color: "#4b0082",
                        textTransform: "none",
                        px: 2,
                        ":hover": {
                          backgroundColor: "white",
                        },
                        fontSize: 19,
                        display: "flex",
                        alignItems: "center",
                      }}
                      startIcon={<ContactPageIcon />}
                      size="large"
                    >
                      Resume
                    </Button>
                    <IconButton
                      variant="text"
                      disableRipple
                      sx={{
                        color: "#4b0082",
                        mx: 2,
                      }}
                      size="large"
                      onClick={() =>
                        sendMail(
                          interview.applicant.applicantResponseId.applicantId
                            .email
                        )
                      }
                    >
                      <EmailIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid md={6} sm={6} sx={12} item container>
                  <KeySideGrid item md={4} sx={{}}>
                    <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                      Name
                    </Typography>
                  </KeySideGrid>
                  <ValueSideGrid item md={8}>
                    <Typography sx={{ color: fontColor }}>
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .firstName
                      }{" "}
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .middleName
                      }{" "}
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .lastName
                      }
                    </Typography>
                  </ValueSideGrid>
                </Grid>
                <Grid md={6} sm={6} sx={12} item container>
                  <KeySideGrid item md={4} sx={{}}>
                    <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                      Email
                    </Typography>
                  </KeySideGrid>
                  <ValueSideGrid item md={8}>
                    <Typography sx={{ color: fontColor }}>
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .email
                      }
                    </Typography>
                  </ValueSideGrid>
                </Grid>
                <Grid md={6} sm={6} sx={12} item container>
                  <KeySideGrid item md={4} sx={{}}>
                    <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                      Contact Number
                    </Typography>
                  </KeySideGrid>
                  <ValueSideGrid item md={8}>
                    <Typography sx={{ color: fontColor }}>
                      {
                        interview.applicant.applicantResponseId.applicantId
                          .contactNo
                      }
                    </Typography>
                  </ValueSideGrid>
                </Grid>

                <Grid md={6} sm={6} sx={12} item container>
                  <KeySideGrid item md={4} sx={{}}>
                    <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                      Year of Experince
                    </Typography>
                  </KeySideGrid>
                  <ValueSideGrid item md={8}>
                    <Typography sx={{ color: fontColor }}>
                      {interview.applicant.yearOfExperience}
                    </Typography>
                  </ValueSideGrid>
                </Grid>

                {/* <StyledEvenRow container>
              <KeySideGrid item md={4} sx={{}}>
                <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                  Source
                </Typography>
              </KeySideGrid>
              <ValueSideGrid item md={8}>
                <Typography sx={{ color: fontColor }}>
                  {interview.applicant.source}
                </Typography>
              </ValueSideGrid>
            </StyledEvenRow>
            <StyledOddRow container>
              <KeySideGrid item md={4} sx={{}}>
                <Typography sx={{ color: keyColor, fontWeight: "bolder" }}>
                  Reference By
                </Typography>
              </KeySideGrid>
              <ValueSideGrid item md={8}>
                <Typography sx={{ color: fontColor }}>
                  {interview.applicant.referenceBy}
                </Typography>
              </ValueSideGrid>
            </StyledOddRow> */}
              </Grid>
              <Grid sx={{ height: "2vh" }} />
              {/* <Grid
            sx={{ display: "flex", py: 2, justifyContent: "space-between" }}
          >
            <Typography variant="h6" sx={{ color: fontColor }}>
              View Interview Response
            </Typography>
          </Grid> */}

              {/* <Grid
                  sx={{
                    display: "flex",
                    py: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ color: fontColor }}>
                    Education Details
                  </Typography>
                </Grid>
                <Grid>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Degree
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Department
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Institute or School Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Year of Passing
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {interview?.applicant?.applicantEducationalDetailses?.map(
                          (edu) => (
                            <StyledTableRow
                              key={edu.applicantEducationalDetailsId}
                            >
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <Typography>{edu.degree}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>{edu.department}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>
                                  {edu.instituteOrSchoolName}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>
                                  {convertTimeStampIntoYear(edu.yearOfPassing)}
                                </Typography>
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid sx={{ height: "2vh" }} />
                <Grid
                  sx={{
                    display: "flex",
                    py: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ color: fontColor }}>
                    Experince Details
                  </Typography>
                </Grid>
                <Grid>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">
                            Company Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Occupation
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Summary
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Year of Experince
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {interview?.applicant?.applicantExperienceDetailses?.map(
                          (edu) => (
                            <StyledTableRow key={edu.applicantExpDetailsId}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <Typography>{edu.companyName}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>{edu.occupationName}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>{edu.summary}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography>{edu.yearOfExperience}</Typography>
                              </StyledTableCell>
                            </StyledTableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid sx={{ height: "2vh" }} /> */}

              <Grid
                sx={{
                  display: "flex",
                  py: 2,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" sx={{ color: fontColor }}>
                  Scheduled Interviews
                </Typography>
              </Grid>
              {/* <Grid>
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <CircleIcon
                      sx={{
                        mr: 1,
                        color: getJobStatusColor(
                          jobPost[0]
                            .customJobPosting.status
                        ),
                        width: "15px",
                        height: "15px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: fontColor, my: 1, fontWeight: "bold" }}
                    >
                      {
                        jobPost[0]
                          .customJobPosting.title
                      }{" "}
                      {" - "}
                      {
                        jobPost[0]
                          .customJobPosting.type
                      }
                    </Typography>
                  </Grid>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead
                        sx={{ backgroundColor: "#fafafa" }}
                        aria-label="customized table"
                      >
                        <TableRow>
                          <StyledTableCell align="center">
                            Round Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Round Description
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Mode of Interview
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Interview Status
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Feedback
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Recruiter Id
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Recruiter Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Interviewers
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {interview.jobPost[0].viewInterviewResponse?.map((edu) => (
                          <StyledTableRow key={edu.applicantExpDetailsId}>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <Typography>{edu.interviewRound.name}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>
                                {edu.interviewRound.description}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>{edu.modeOfInterview}</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Grid
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <CircleIcon
                                  sx={{
                                    mr: 1,
                                    color: getResponseStatusColor(
                                      edu.interviewStatus
                                    ),
                                    width: "15px",
                                    height: "15px",
                                  }}
                                />
                                <Typography>
                                  {edu.interviewStatus.toLowerCase()}
                                </Typography>
                              </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Box display={"flex"} alignItems={"center"}>
                                <LaunchIcon
                                  sx={{
                                    mr: 1,
                                    color: "#4B0082",
                                    height: "17px",
                                  }}
                                />
                                view
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>
                                {edu.jobRecruiter.recruiterId}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Typography>
                                {edu.jobRecruiterDetails.firstName}{" "}
                                {edu.jobRecruiterDetails.lastName}
                              </Typography>
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <Stack
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                direction="row"
                                spacing={-1}
                              >
                                {edu.panel?.map((recruiter) => (
                                  <HtmlTooltip
                                    title={
                                      <Typography color="inherit">
                                        {recruiter.firstName}{" "}
                                        {recruiter.lastName}
                                      </Typography>
                                    }
                                    followCursor
                                  >
                                    <Avatar
                                      {...stringAvatar(recruiter.firstName)}
                                    />
                                  </HtmlTooltip>
                                ))}
                              </Stack>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid> */}
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  sx={{ textColor: "black" }}
                  indicatorColor="primary"
                >
                  {jobPost?.toReversed().map((respo, i) => (
                    <Tab value={i} label={respo.customJobPosting.title} />
                  ))}
                </Tabs>
                <Grid sx={{ height: "3vh" }} />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead
                      sx={{ backgroundColor: "#fafafa" }}
                      aria-label="customized table"
                    >
                      <TableRow>
                        <StyledTableCell>Round Name</StyledTableCell>
                        <StyledTableCell>Round Description</StyledTableCell>
                        <StyledTableCell>Mode of Interview</StyledTableCell>
                        <StyledTableCell>Interview Status</StyledTableCell>
                        <StyledTableCell>Feedback</StyledTableCell>
                        <StyledTableCell>Recruiter Name</StyledTableCell>
                        <StyledTableCell>Interviewers</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobPost[value].viewInterviewResponse?.map((edu) => (
                        <StyledTableRow key={edu.applicantExpDetailsId}>
                          <StyledTableCell component="th" scope="row">
                            <Typography>{edu.interviewRound.name}</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>
                              {edu.interviewRound.description}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>{edu.modeOfInterview}</Typography>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <CircleIcon
                                sx={{
                                  mr: 1,
                                  color: getResponseStatusColor(
                                    edu.interviewStatus
                                  ),
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                              <Typography>
                                {edu.interviewStatus.toLowerCase()}
                              </Typography>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              onClick={handleOpenFeedBackModel}
                            >
                              <LaunchIcon
                                sx={{
                                  mr: 1,
                                  color: "#4B0082",
                                  height: "17px",
                                }}
                              />
                              view
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography>
                              {edu.jobRecruiterDetails.firstName}{" "}
                              {edu.jobRecruiterDetails.lastName}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell>
                            <Stack
                              sx={{
                                display: "flex",
                                ml: 2,
                              }}
                              direction="row"
                              spacing={-1}
                            >
                              {edu.panel?.map((recruiter) => (
                                <HtmlTooltip
                                  title={
                                    <Typography color="inherit">
                                      {recruiter.firstName} {recruiter.lastName}
                                    </Typography>
                                  }
                                  followCursor
                                >
                                  <Avatar
                                    {...stringAvatar(recruiter.firstName)}
                                  />
                                </HtmlTooltip>
                              ))}
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>

          <Modal
            open={openModel}
            onClose={handleCloseModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <iframe src={resumeLink} height={"100%"} width={"100%"}></iframe>
            </Box>
          </Modal>
          <Modal
            open={openMailModel}
            onClose={handleCloseMailModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={mailStyle}>
              <Email email={mail} setOpenModel={setOpenMailModel} />
            </Box>
          </Modal>
          <Modal
            open={openFeedBackModel}
            onClose={handleCloseFeedBackModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={feedBackStyle}>
              <FeedBackForm />
            </Box>
          </Modal>
        </Grid>
      ) : (
        <Grid
          container
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      )}
    </ThemeProvider>
  );
};

export default ViewInterviewerStatus;
