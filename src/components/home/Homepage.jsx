import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Grid,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  Link,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Menu,
  Select,
  MenuItem,
  FormControl,
  Box,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LinearProgress } from "@mui/material";
import bgimg from "../../images/jobimg.svg";
import view from "../../images/view.svg";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import av1 from "../../images/av1.svg";
import it from "../../images/it.svg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import {
  getAllJobPosting,
  getJobREcruiterStatistics,
  getJobStatistics,
  getRecruitersByBranchId,
} from "../../services/jobPostService";
import { useState } from "react";
import Loader from "../Loader/Loader";
import  "./HomePage.css";

import OngoingRecuirements from "../OnoingRecuiremments/OngoingRecuirements";

const sidebarWidth = 21.6;

function createData(
  recruiter,
  openingsassigned,
  positionsfilled,
  category,
  status
) {
  return { recruiter, openingsassigned, positionsfilled, category, status };
}

const rows = [
  createData("Dhanalakshmi", 30, 10, "Java", "In-progress"),
  createData("Mythli", 30, 10, "Java", "In-progress"),
  createData("Ani", 30, 10, "React JS", "New"),
  createData("Dhanalakshmi", 30, 10, "React JS", "Completed"),
  createData("Dhanalakshmi", 30, 10, "Java", "In-progress"),
  createData("Ani", 30, 10, "React JS", "New"),
];
function Homepage({ onGoingRequirements }) {
  const [jobList, setJobList] = useState([]);
  const [filteredJob, setFilteredJob] = useState({
    completed: "",
    scheduled: "",
    rescheduled: "",
    cancelled: "",
  });
  const [selectedJob, SetSelectedJob] = useState("");
  const [recruiterStatics, setRecruiterStatics] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [count,setCount ] = useState({
    openings : 0 ,
    hired : 0,
    inProgress : 0,
    rejected : 0
  }); 

  const findRecruiter = (id) => {
    let x = recruiters.find((recruiter) => recruiter.employeeId === id);
    return x.firstName + " " + x.lastName;
  };



  useEffect(() => {
    getAllJobPosting(1)
      .then((data) => { 
        // setLoader(true);
        SetSelectedJob(data[data.length-1].id);
        getJobStatistics(data[data.length-1].id)
          .then((data) => {setFilteredJob(data);})
          .then(() => getJobREcruiterStatistics(data[data.length-1].id,1))
          .then((data) => {
            setRecruiterStatics(data);
            // setLoader(false);
          });setJobList(data); 
        })
      .then(() => getRecruitersByBranchId(1))
      .then((data) => {
        setRecruiters(data);
        setLoader(false);
      })
      .catch((error) => alert(error.message));
  }, []);

  const handleJobFilter = (id) => {
    setLoader(true);
    SetSelectedJob(id);
    getJobStatistics(id)
      .then((data) => {setFilteredJob(data);})
      .then(() => getJobREcruiterStatistics(id,1))
      .then((data) => {
        setRecruiterStatics(data);
        setLoader(false);
      });
  };

  
  useEffect(()=>{

    let count = {
      openings : 0 ,
      hired : 0,
      inProgress : 0,
      rejected : 0
    }

    recruiterStatics.map( data => {
     count = {
      openings : count.openings + data.assignedCounts,
      hired : count.hired + data.positionFilled ,
      inProgress : count.inProgress + data.inProcess ,
      rejected : count.rejected +data.rejected
      }
      setCount(count);
    });
    
  },[recruiterStatics])


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

  return (
    <>
      {loader && <Loader />}
      <ThemeProvider theme={theme}>
        <Grid container display={"flex"} flexDirection={"row"}>
          <Grid item p={2} sx={{ width: `calc(100% - ${sidebarWidth}%)` }}>
            <Grid container display={"flex"}  flexDirection={"row"} spacing={3}>
              <Grid item md={9.5} >
                <Card sx={{ p: 5 }}>
                  <Grid
                    container
                    display={"flex"}
                    flexDirection={"column"}
                    spacing={3}
                  >
                    <Grid item>
                      <Grid
                        container
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <Grid item>
                          <Typography variant="h5" fontWeight={"bold"}>
                            Recruitment Progress
                          </Typography>
                        </Grid>
                        <Grid item>
                          <FormControl sx={{ width: "200px" }} size="small">
                            <Select
                              displayEmpty
                              placeholder="select an job"
                              value={selectedJob}
                              onChange={(e) => handleJobFilter(e.target.value)}
                            >
                              {jobList.map((job) => (
                                <MenuItem value={job.id}>{job.title}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid item>
                      <Grid
                        container
                        display={"flex"}
                        flexDirection={"column"}
                        spacing={1}
                      >
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            columnGap={3}
                          >
                            <Grid item>
                              <LinearProgress
                                variant="determinate"
                                value={filteredJob.completed}
                                color="success"
                                sx={{
                                  width: "900px",
                                  borderRadius: 5,
                                  height: 10,
                                }}
                              />
                            </Grid>
                            <Grid>
                              <Typography>
                                {filteredJob.completed === ""
                                  ? 0
                                  : filteredJob.completed}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            columnGap={3}
                          >
                            <Grid item>
                              <LinearProgress
                                variant="determinate"
                                value={filteredJob.rescheduled}
                                color="warning"
                                sx={{
                                  width: "900px",
                                  borderRadius: 5,
                                  height: 10,
                                }}
                              />
                            </Grid>
                            <Grid>
                              <Typography>
                                {filteredJob.rescheduled === ""
                                  ? 0
                                  : filteredJob.rescheduled}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            columnGap={3}
                          >
                            <Grid item>
                              <LinearProgress
                                variant="determinate"
                                value={filteredJob.cancelled}
                                color="error"
                                sx={{
                                  width: "900px",
                                  borderRadius: 5,
                                  height: 10,
                                }}
                              />
                            </Grid>
                            <Grid>
                              <Typography>
                                {filteredJob.cancelled === ""
                                  ? 0
                                  : filteredJob.cancelled}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid> */}
                    {/* <Grid item>
                      <Grid
                        container
                        display={"flex"}
                        flexDirection={"row"}
                        columnGap={2}
                      >
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            spacing={2}
                          >
                            <Grid item>
                              <Badge variant="dot" color="success" />
                            </Grid>
                            <Grid item>
                              <Typography>Hired</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            spacing={2}
                          >
                            <Grid item>
                              <Badge variant="dot" color="warning" />
                            </Grid>
                            <Grid item>
                              <Typography>In-Progress</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            display={"flex"}
                            flexDirection={"row"}
                            spacing={2}
                          >
                            <Grid item>
                              <Badge variant="dot" color="error" />
                            </Grid>
                            <Grid item>
                              <Typography>Rejected</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                       
                      </Grid>
                    </Grid> */}
                    <Grid item display={"flex"} justifyContent={'space-around'} >
                      <Grid item md={2.5} >
                        <Box sx={{width : "100%" ,position: 'relative' }} bgcolor={"primary.main"} display={'flex'} flexDirection={'column'} borderRadius={4} elevation={10} alignItems={'center'} justifyContent={"center"} height={155} component={Paper} >
                        <Box className={"countBubble"}></Box>
                        <Box className={"countBubble2"}></Box>
                          <Typography color={"white"} fontWeight={700} fontSize={50}  >{count.openings}</Typography>
                          <Typography color={"white"} fontWeight={700} >Openings</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={2.5}  >
                        <Box sx={{width : "100%" , position: 'relative'}} bgcolor={"secondary.dark"} display={'flex'} flexDirection={'column'} borderRadius={4} elevation={10} alignItems={'center'} justifyContent={"center"} height={155} component={Paper} >
                        <Box className={"countBubble"}></Box>
                        <Box className={"countBubble2"}></Box>
                          <Typography color={"white"} fontWeight={700} fontSize={50}  >{count.hired}</Typography>
                          <Typography color={"white"} fontWeight={700} >Hired</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={2.5}  >
                        <Box sx={{width : "100%" , position : 'relative'}} bgcolor={"primary.light"} display={'flex'} flexDirection={'column'} borderRadius={4} elevation={10} alignItems={'center'} justifyContent={"center"} height={155} component={Paper} >
                        <Box className={"countBubble"}></Box>
                        <Box className={"countBubble2"}></Box>
                          <Typography color={"white"} fontWeight={700} fontSize={50}  >{count.inProgress}</Typography>
                          <Typography color={"white"} fontWeight={700} >In-progress</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={2.5}  >
                        <Box sx={{width : "100%" , position : 'relative'}} bgcolor={"primary.main"} display={'flex'} flexDirection={'column'} borderRadius={4} elevation={10} alignItems={'center'} justifyContent={"center"} height={155} component={Paper} >
                        <Box className={"countBubble"}></Box>
                        <Box className={"countBubble2"}></Box>
                          <Typography color={"white"} fontWeight={700} fontSize={50}  >{count.rejected}</Typography>
                          <Typography color={"white"} fontWeight={700} >Rejected</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item md={2.5} >
                <Card sx={{ p: 3 }}>
                  <Grid
                    container
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Grid item>
                      <img src={bgimg} height={"190px"} />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/Jobpost")}
                        sx={{
                          textTransform: "none",
                          background: "#4B0082",
                          borderRadius: 5,
                          width: "200px",
                        }}
                      >
                        Add Job Post
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid container display={"flex"} mt={3}>
              <Card sx={{ p: 2 }}>
                <Grid item>
                  <Grid
                    container
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item>
                      <Typography variant="h5" fontWeight={"bold"}>
                        Recruiter's Progress
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link href="#">See All</Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TableContainer>
                    <Table sx={{ width: "1380px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Recruiter
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Openings Assigned
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Positions filled
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Rejected
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            IN-Progress
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Recruiter Profile
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recruiterStatics.map((row) => (
                          <TableRow key={row[0]}>
                            <TableCell>{findRecruiter(row.recruiterId)}</TableCell>
                            <TableCell>{row.assignedCounts}</TableCell>
                            <TableCell>{row.positionFilled}</TableCell>
                            <TableCell>{row.rejected}</TableCell>
                            <TableCell>{row.inProcess}</TableCell>
                            <TableCell>
                              <IconButton disabled>
                                <img src={view} />
                              </IconButton>
                              View
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Card>
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
      </ThemeProvider>
    </>
  );
}

export default Homepage;