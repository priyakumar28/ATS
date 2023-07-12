import styled from "@emotion/styled";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const backgroundcolor = "white";
const fontColor = "black";
const oddColumn = "white";
const evenColumn = "#fafafa";
const keyColor = "black";

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
    backgroundColor: evenColumn,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const PreviousInterviewStatus = ({
  jobPosts,
  setViewProfile,
  applicant,
  id,
  status,
}) => {
  // const navigate = useNavigate();

  useEffect(() => {
    console.log(jobPosts);
  }, []);

  const viewProfileDetails = (recuriterId) => {
    // setViewDetails(recuriterId);
    // setViewProfile(false);
    // navigate("/Dashboard/MyProfile/" + recuriterId);
  };

  return (
    <Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: backgroundcolor,
        }}
      >
        <Grid sx={{ p: 3, width: "90vw" }}>
          <Grid
            sx={{
              display: "flex",
              py: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setViewProfile(true)}
              sx={{ height: "5vh", textTransform: "none", color: "#4b0082" }}
              endIcon={<KeyboardBackspaceIcon />}
            >
              Back
            </Button>
            <Grid sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                sx={{ color: fontColor, fontWeight: "bold", mx: 2 }}
              >
                {applicant} Interviews
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  mx: 2,
                  backgroundColor: chooseColor(status),
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {status}
              </Typography>
            </Grid>
          </Grid>

          <Grid>
            {jobPosts.map((post) => (
              <Grid key={post.customJobPosting.id}>
                <Grid sx={{ my: "5vh" }}>
                  <Typography
                    variant="body1"
                    sx={{ color: fontColor, my: 1, fontWeight: "bold" }}
                  >
                    {post.customJobPosting.title} {" - "}
                    {post.customJobPosting.type}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
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
                          {/* <StyledTableCell align="center">
                            Recruiter Id
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            Recruiter Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Interviewers
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {post.viewInterviewResponse?.map((edu) => (
                          <StyledTableRow key={edu.id}>
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
                            {/* <StyledTableCell align="center">
                              <Typography>
                                {edu.jobRecruiter.recruiterId}
                              </Typography>
                            </StyledTableCell> */}
                            <StyledTableCell align="center">
                              <Typography>
                                {edu.jobRecruiterDetails.firstName}{" "}
                                {edu.jobRecruiterDetails.lastName}
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {edu.panel?.map((pan, i) => (
                                <Grid>
                                  <Typography sx={{ wordWrap: "break-word" }}>
                                    {i + 1}
                                    {". "}
                                    {pan.firstName} {pan.lastName}
                                  </Typography>
                                </Grid>
                              ))}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PreviousInterviewStatus;
