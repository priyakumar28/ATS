import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Grid,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";

import { Routes, Route, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import avimg from "../../images/avatar.svg";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import sec from "../../images/sec.svg";
import third from "../../images/time.svg";
import four from "../../images/settings.svg";
import five from "../../images/orr.svg";
import Profile from "../my-profile/Profile";
import Jobpost from "../jobCreation/Jobpost";
import JobList from "../JobPosts/JobList";
import { getProfile } from "../../services/profileService";
import ViewPost from "../ViewPost/ViewPost";
import { EditorState, convertFromRaw } from "draft-js";
import {
  getOnGoingRequirements,
  getRecruitersByBranchId,
  getSkills,
} from "../../services/jobPostService";
import ViewCandidates from "../viewinterview/ViewCandidate";
import CandidateListByJob from "../viewinterview/CandidateListByJob";
import JobUpdation from "../JobUpdation/JobUpdation";
import { useEffect } from "react";
import Feedback from "../feedback/feedback";
import OnboardCandidates from "../Candidate/OnboardCandidates";
import RecruitingForm from "../interviewScheduling/RecruitingForm";
import ViewInterviewerStatus from "../viewinterview/ViewInterviewerStatus";
import OTPVerification from "../Candidate/OTPVerification";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AlertContext from "../contextProvider/AlertContext";
import AlertMsg from "../sweetalert/AlertMsg";
import HomePage from "../home/HomePage2";
import RecruiterDB from "../Recruiter/RecruiterDB";
const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(7.5)} + 1px)`,
  },

  [theme.breakpoints.down("md")]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#ffffff",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const pako = require("pako");

export default function Appbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [onGoingRequirements, setOnGoingRequirements] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [profile, setProfile] = React.useState({
    id : "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    dateOfJoining: "",
    maritalStatus: "",
  });

  React.useEffect(() => {
    getProfile(1)
      .then((data) => {
        setProfile({
          id : data.employeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.contactNumber,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          dateOfJoining: data.dateOfJoining,
          maritalStatus: data.maritalStatus,
        });
      })
      .then(() => getOnGoingRequirements(1))
      .then((data) => setOnGoingRequirements(data))
      .then(getSkills)
      .then((res) => setSkills(res));
  }, []);

  const [jobPostingData, setJobPostingData] = React.useState({
    id: 0,
    title: null,
    experience: "",
    noOfVaccancies: null,
    recruitersIdWithAssignedCounts: [],
    skillIds: [],
    type: "",
    location: "",
    openDate: "",
    closeDate: "",
    description: EditorState.createEmpty(),
    requirement: EditorState.createEmpty(),
  });

  

  const [jobPostingData1, setJobPostingData1] = React.useState({
    id: 0,
    title: null,
    experience: "",
    noOfVaccancies: null,
    jobRecruiters: [],
    skillIds: [],
    type: "",
    location: "",
    openDate: "",
    closeDate: "",
    createdBy: "",
    status: "",
    description: EditorState.createEmpty(),
    requirement: EditorState.createEmpty(),
  });

  const [recruiters, setRecruiters] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHomepage = () => {
    navigate("/Homepage");
  };

  const handleProfile = () => {
    navigate("/Profile");
  };

  const deCompressContent = (data) => {
    const deCompressContent = pako.inflate(JSON.parse(data), {
      to: "string",
    });
    return deCompressContent;
  };

  const updateJobPostingForm = (data) => {
    const parsedContentState = convertFromRaw(
      JSON.parse(deCompressContent(data.description))
    );
    const desc = EditorState.createWithContent(parsedContentState);
    const parsedContentState1 = convertFromRaw(
      JSON.parse(deCompressContent(data.requirement))
    );
    const desc1 = EditorState.createWithContent(parsedContentState1);

    setJobPostingData1({
      id: data.id,
      title: data.title,
      experience: data.experience,
      noOfVaccancies: data.noOfVaccancies,
      jobRecruiters: data.jobRecruiters,
      skillIds: data.skills.map((item) => item.id),
      type: data.type,
      location: data.location,
      openDate: data.openDate,
      closeDate: data.closeDate,
      description: desc,
      requirement: desc1,
      createdBy: data.createdBy,
      status: data.status,
    });
    navigate("/job-updation");
  };

  React.useEffect(() => {
    getProfile(1)
      .then((data) => {
        setProfile({
          id : data.employeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.contactNumber,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          dateOfJoining: data.dateOfJoining,
          maritalStatus: data.maritalStatus,
        });
      })
      .then(() => getRecruitersByBranchId(1))
      .then((data) => {
        setRecruiters(data);
      });
  }, []);

  const { alert, setAlert } =React.useContext(AlertContext);

  return (
    <Box display={"flex"}>
      <CssBaseline />
      <AlertMsg alert={alert} setAlert={setAlert} />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Grid
            container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Grid item>
              <Grid
                container
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                spacing={3}
              >
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                  >
                    <img src={logo} height={"22px"} width={"25px"} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography
                    color={"black"}
                    fontFamily={"cursive"}
                    fontSize={"18px"}
                  >
                    Hello!
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton onClick={handleProfile}>
                <Badge
                  badgeContent={7}
                  color="secondary"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Avatar src={avimg} />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Divider />
        <DrawerHeader>
          <Grid
            container
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Grid item>
              {open && (
                <IconButton onClick={handleDrawerClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </DrawerHeader>
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/")}
              sx={{ justifyContent: "center", borderRadius: "30px" }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <ShutterSpeedIcon sx={{ color: "#003D62" }} />
              </ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/joblist")}
              sx={{ justifyContent: "center", borderRadius: "30px" }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <img src={sec} height={"18px"} width={"18px"} />
              </ListItemIcon>
              <ListItemText>Job List</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => navigate("/scheduled-candidate")}
              sx={{ justifyContent: "center", borderRadius: "30px" }}
 >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <img src={third} height={"18px"} width={"18px"} />
              </ListItemIcon>
              <ListItemText>Scheduled Interviews</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/candidate")}
              sx={{ justifyContent: "center", borderRadius: "30px" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                {/* <img src={five} height={"18px"} width={"18px"} /> */}
                <PeopleAltIcon sx={{color:"#205576"}}/>
              </ListItemIcon>
              <ListItemText>Applicants</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
        <Routes>
          <Route path="/" element={<RecruiterDB/>} />
          {/* <Route
            path="/"
            element={
              <HomePage open={open} onGoingRequirements={onGoingRequirements} />
            }
          /> */}
          <Route path="/Profile" element={<Profile profile={profile} />} />
          <Route
            path="/Jobpost/*"
            element={
              <Jobpost
                profile={profile}
                skills={skills}
                onGoingRequirements={onGoingRequirements}
                jobPostingData={jobPostingData}
                setJobPostingData={setJobPostingData}
                recruiters={recruiters} />  } />
          <Route path="/joblist"   element={<JobList setJobPostingData={setJobPostingData1} />}   />
          <Route path="/view-job-post"   element={  <ViewPost  onGoingRequirements={onGoingRequirements} jobPostingData={jobPostingData1} updateJobPostingForm={updateJobPostingForm}   recruiters={recruiters}   draft={false}  />}  />
          <Route path="/scheduled-candidate/*" element={<ViewCandidates />} />
          <Route path="/job-updation/*" element={  <JobUpdation skills={skills} jobPostingData={jobPostingData1}  recruiters={recruiters} setJobPostingData={setJobPostingData1} /> }  />
          <Route path="/candidate/*" element={<OnboardCandidates />} />
          <Route path="/candidate/Recruitingform/:id" element={<RecruitingForm />} />
          <Route path="/applicant-interviews/:applicantId"  element={<ViewInterviewerStatus />}/>
          <Route path="/Candidates/otp" element={<OTPVerification />} />
        </Routes>
      </Box>
    </Box>
  );
}
