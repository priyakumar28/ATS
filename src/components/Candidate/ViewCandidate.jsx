import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import React, { useEffect, useState } from "react";
import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BlockIcon from "@mui/icons-material/Block";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
// import {BrowserRouter} from  'react-router-dom';
import {
  getApplicantByJob,
  getApplicantByJobs,
  getApplicantByMob,
  getApplicantBySts,
  getAssignedJob,
  getCan,
  getSingleCandidate,
  getSingleCandidates,
  statusApp,
} from "../../services/CandidateService";
import Candidateviewskeleton from "./Candidateviewskeleton";

import { MailLockOutlined } from "@mui/icons-material";
import Email from "../email/Email";

import Loader from "../Loader/Loader";

const Tablecell1 = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FAFAFA",

    color: theme.palette.common.black,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

    position: "relative",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#FAFAFA",
  },


  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function ViewCandidate(props) {
  const style = {
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 920,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);
  const [viewsingleemp, setViewsingleemp] = useState([]);
  const navigate = useNavigate();
  const [verify, setVerify] = useState();
  const [exists, setExist] = useState();
  const [buttonFlag, setButtonFlag] = useState(false);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [jobId, setJobId] = useState(0);
  const [status, setStatus] = useState("");
  const [status1, setStatus1] = useState(false);
  const [disp, setDisp] = useState(false);
  const [disp1, setDisp1] = useState(false);
  const [disp2, setDisp2] = useState(false);
  const [screen, setScreen] = useState({ tableViewSkeleton: true });

  const method1 = (id) => {
    getSingleCandidate(id).then((data) => {
      let findSkillId = [];
      data.skill.map((skill) => findSkillId.push(skill.id));
      let candidates = {
        applicantId: data.applicantId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastcdName,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        contactNo: data.contactNo,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        source: data.source,
        currentCtc: data.currentCtc,
        expectedCtc: data.expectedCtc,
        reasonForChange: data.reasonForChange,
        currentCompany: data.currentCompany,
        yearOfExperience: data.yearOfExperience,
        holdingOffer: data.holdingOffer,
        applicantStatus: data.applicantStatus,
        skill: findSkillId,
        addressId: data.addressId,
        doorNo: data.doorNo,
        pinCode: data.pinCode,
        street: data.street,
        state: data.state,
        city: data.city,
        country: data.country,
        // applicantExperienceDetailses: [
        //   {
        //     applicantExpDetailsId:
        //       data.applicantExperienceDetailses.applicantExpDetailsId,
        //     occupationName: data.applicantExperienceDetailses.occupationName,
        //     companyName: data.applicantExperienceDetailses.companyName,
        //     summary: data.applicantExperienceDetailses.summary,
        //     yearOfExperience: data.applicantExperienceDetailses.yearOfExperience,
        //   },
        // ],
        // applicantEducationalDetailses: [
        //   {
        //     applicantEducationalDetailsId:
        //       data.applicantEducationalDetailses.applicantEducationalDetailsId,
        //     instituteOrSchoolName: data.applicantEducationalDetailses.instituteOrSchoolName,
        //     department: data.applicantEducationalDetailses.department,
        //     degree: data.applicantEducationalDetailses.degree,
        //     yearOfPassing: data.applicantEducationalDetailses.yearOfPassing,
        //   },
        // ],
        resumePath: data.resumePath,
        addedAt: data.addedAt,
        applicantDetailsId: data.applicantDetailsId,
        // jobRecruiterId: data.jobRecruiterId,
        applicantResponseId: data.applicantResponseId,
      };
      console.log(candidates, "??????????????????");
      props.setUpdateCan(candidates);
      navigate("EditCanditate");
    });
  };
  const [candidate, setCandidate] = useState();
  const handleChange1 = (e, can) => {
    statusApp(can, e.target.value);
  };
  const handleFunction = () => {
    navigate("Basicdetails");
    // navigate(`AddCanditate?email=${mail}`);
  };
  const method2 = (id) => {
    navigate(`Recruitingform/${id}`);
  };
  // const getRoleName = (roles) => {
  //   let x = roles.map((role) => role.roleName);
  //   return x.join(" / ");
  // };
  const function1 = (e) => {
    getApplicantBySts(e.target.value).then((resp) => props.setCandidate(resp));
  };

  const funtionjob = (e) => {
    getApplicantByJobs(e.target.value).then((resp) => props.setCandidate(resp));
  };

  const [filterCode, setFilterCode] = useState("");
  const [title, setTitle] = useState("");
  const handleSearch = () => {
    getApplicantByMob(title).then((resp) => props.setCandidate(resp));
    setStatus(title);
    setTitle("");
    // setButtonFlag(true);
  };
  // useEffect(()=>{
  //   if(props.candidate.length > 0) setScreen({tableViewSkeleton:false})
  // },[props.candidate])
  const handleCandidateFunction = () => {
    props.setTrigger(1);
    setButtonFlag(false);
    props.setLoader(true);
    setTitle("");
  };
  const viewsingleApplicant = (id) => {
    props.setId(id);
    navigate("/candidate/viewsinglecandidate");
  };

  // useEffect(() => {
  //   getApplicantByJob().then((data) => setAssignedJobs(data));
  // }, []);
  useEffect(() => {
    // props.candidate.length == 0 ? setLoader(true):setLoader(false);

    getAssignedJob(1).then((data) => setAssignedJobs(data));
  }, []);

  const methodApp = (id) => {
    getSingleCandidates(id).then((data) => {
      let singlecandidate = {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        contactNo: data.contactNo,
        email: data.email,
      };
      props.setBasicDetail(singlecandidate);
      navigate("/candidate/AddCanditate");
    });
  };

  const handleMobile = (e) => {
    if (e.target.value.length == 10) {
      setTitle(e.target.value);
      setDisp2(false);
    } else {
      setDisp2(true);
    }
  };
  return (
    <>
      {/* {screen.tableViewSkeleton && <Candidateviewskeleton/>} */}
      {/* {!screen.tableViewSkeleton &&  */}
      {/* {props.screen.tableViewSkeleton && <EmployeViewSkeleton />} */}
      {/* {!screen.tableViewSkeleton &&   */}
      <Grid container paddingLeft={4} paddingRight={3} marginTop={5}>
        {props.loader && <Loader />}

        {/* <Typography variant="h3">AcceptedCount:{props.statusCounts.acceptedCount}</Typography> */}
        <Grid item lg={12}>
          <Grid
            item
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item display={"flex"} alignItems={"center"}>
              <IconButton
                sx={{ color: "#4B0082" }}
                onClick={() => navigate(-1)}
              >
                <KeyboardBackspaceIcon sx={{ fontSize: "30px" }} />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    md: "1.4rem",
                    lg: "1.7rem",
                    xl: "2rem",
                  },
                }}
                fontWeight={700}
              >
                Applicant List
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Tablecell1
                align="left"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: 0,
                }}
              >
                <Tooltip title="Add a new applicant">
                  <IconButton
                    onClick={handleFunction}
                    // sx={{ marginLeft: "200px" }}
                  >
                    <AddCircleOutlineIcon
                      sx={{ color: "#4B0082", fontSize: "30px" }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Send mail">
                  <IconButton
                    onClick={() => handleOpenModel()}
                    // sx={{ ml: "25px" }}
                  >
                    <MailLockOutlined
                      sx={{
                        color: "#4B0082",
                        fontSize: "30px",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <FormControl size="small" sx={{ width: "150px", mr: 2 }}>
                  <InputLabel>Filter by status</InputLabel>
                  <Select
                    size="small"
                    // error={Boolean(errors.jobRecruiterId)}
                    // helperText={errors.jobRecruiterId?.message
                    onChange={(e) => (
                      setStatus(e.target.value),
                      function1(e),
                      setDisp1(true),
                      setDisp2(true)
                    )}
                    value={status}
                    disabled={disp}
                  >
                    <MenuItem value={"DECLINED"}>Declined</MenuItem>
                    <MenuItem value={"OFFERREJECTED"}>Offer Rejected</MenuItem>
                    <MenuItem value={"REJECTED"}>Rejected</MenuItem>
                    {/* <MenuItem value={1}>All Applicants</MenuItem> */}
                    {/* <MenuItem
                      onClick={() => (
                        props.setTrigger(1), props.setLoader(true)
                      )}
                    >
                      All Applicants
                    </MenuItem> */}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ width: "150px", mr: 2 }}>
                  <InputLabel>Filter by job</InputLabel>
                  <Select
                    size="small"
                    // error={Boolean(errors.jobRecruiterId)}
                    // helperText={errors.jobRecruiterId?.message}
                    variant="outlined"
                    required
                    color="secondary"
                    // {...register("jobPostingId")}
                    // value={jobId}
                    onChange={(e) => (
                      setStatus1(true),
                      funtionjob(e),
                      setDisp(true),
                      setDisp2(true)
                    )}
                    disabled={disp1}
                  >
                    {assignedJobs.map((job) => (
                      <MenuItem key={job.id} value={job.id}>
                        {job.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box width={"350px"}>
                  <TextField
                    placeholder="search by contact no"
                    id="search"
                    value={title}
                    // onChange={(e) => handleMobile(e)}
                    onChange={(e) => (setTitle(e.target.value))}
                    InputProps={{
                      style: {
                        padding: "10px",
                        height: "40px",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                        borderBottomLeftRadius: "8px",
                      },
                    }}
                  />
                  <Button
                    onClick={() => handleSearch()}
                    variant="contained"
                    sx={{
                      height: "40px",
                      fontSize: "14px",
                      borderTopLeftRadius: "0px",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderBottomLeftRadius: "0px",
                      backgroundColor: "#4B0082",
                    }}
                    disabled={disp2}
                  >
                    search
                  </Button>
                </Box>
                {/* {buttonFlag && (
                  <IconButton onClick={handleCandidateFunction}>
                    <HighlightOffIcon />
                  </IconButton>
                )} */}
              </Tablecell1>
            </Grid>
          </Grid>
          <Grid item lg={1}>
            {status1 && (
              <Box
                sx={{
                  bgcolor: "#4B0082",
                  height: "28px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  px: 2.5,
                  py: 0.5,
                  mx: 1,
                }}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography color={"white"}>Close</Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (
                    props.setTrigger(1),
                    props.setLoader(true),
                    setDisp(false),
                    setDisp1(false),
                    setDisp2(false),
                    setStatus1(false),
                    setTitle("")
                  )}
                />
              </Box>
            )}
            {status != "" && (
              <Box
                sx={{
                  bgcolor: "#4B0082",
                  height: "28px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.5,
                  mx: 1,
                }}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography color={"white"}>{status}</Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (
                    setStatus(""),
                    props.setTrigger(1),
                    props.setLoader(true),
                    setDisp(false),
                    setDisp1(false),
                    setDisp2(false)
                  )}
                />
              </Box>
            )}
          </Grid>

          {props.candidate.length == 0 ? (
            <Grid
              item
              display={"flex"}
              justifyContent={"center"}
              sx={{ mt: 30 }}
            >
              <Typography variant="h5">No such data</Typography>
            </Grid>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "400px" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "400px" }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "400px" }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "400px" }}
                  >
                    Status
                  </TableCell>
                  {/* <Tablecell1 width="20px">
                    Edit
                  </Tablecell1> */}
                  {/* <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "350px" }}
                  >
                    Schedule Interview
                  </TableCell> */}
                  {/* <TableCell  sx={{ fontWeight: "900", fontSize: "17px", width: "350px" }}>Rounds</TableCell> */}
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "350px" }}
                  >
                    Job Title
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "900", fontSize: "17px", width: "350px" }}
                  >
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.candidate
                  //  .filter((can) => {
                  //   if (filterCode === "") {
                  //     return can;
                  //   } else if (
                  //     JSON.stringify(can.contactNo).match(filterCode)
                  //   )
                  //   return can;
                  // })
                  .map((can) => (
                    <StyledTableRow key={can.applicantId}>
                      <Tablecell1>
                        {can.firstName}
                        {"."}
                        {can.middleName}
                        {can.lastName}
                      </Tablecell1>
                      <Tablecell1>{can.email}</Tablecell1>
                      <Tablecell1>{can.contactNo}</Tablecell1>
                      <Tablecell1>
                        {" "}
                        {can.applicantStatus}
                        {/* <Select
                          sx={{
                            width: "155px",
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={can.applicantStatus}
                          size={"small"}
                          variant={"outlined"}
                          onChange={(e) => handleChange1(e, can)}
                        >
                          <MenuItem value={"NEW"}>Interested</MenuItem>
                          <MenuItem value={"OFFERACCEPTED"}>
                            OfferAccepted
                          </MenuItem>
                          <MenuItem value={"OFFERED"}>Offered</MenuItem>
                          <MenuItem value={"DECLINED"}>Declined</MenuItem>
                          <MenuItem value={"HIRED"}>Hired</MenuItem>
                          <MenuItem value={"OFFERREJECTED"}>
                            OfferRejected
                          </MenuItem>
                          <MenuItem value={"INPROCESS"}>Inprocess</MenuItem>
                          <MenuItem value={"REJECTED"}>Rejected</MenuItem>
                        </Select> */}
                      </Tablecell1>
                      {/* <TableCell>
                        <IconButton onClick={() => method1(can.applicantId)}>
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </TableCell> */}
                      {/* {can.applicantFlag == 1 ? (
                        <Tablecell1>
                          <IconButton onClick={() => method2(can.applicantId)}>
                            <RecordVoiceOverIcon sx={{ color: "black" }} />
                          </IconButton>
                        </Tablecell1>
                      ) : (
                        <Tablecell1>
                          <Tooltip title="Need to fill additional details">
                            <IconButton>
                              <BlockIcon sx={{ color: "black" }} />
                            </IconButton>
                          </Tooltip>
                        </Tablecell1>
                      )} */}
                      {/* <TableCell>
                  {(can.roundId==0)?"-":(can.roundId==1)?"First Round":(can.roundId==2)?"Second Round":(can.roundId==3)?"Third Round":"HR Interview"}
                        </TableCell> */}
                      <TableCell>{can.jobTitle}</TableCell>
                      {can.applicantFlag == 1 ? (
                        <TableCell>
                          <IconButton>
                            <EditIcon
                              sx={{ color: "black" }}
                              onClick={() => method1(can.applicantId)}
                            />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Tooltip title="Need to fill additional details">
                            <IconButton>
                              <BlockIcon
                                sx={{ color: "black" }}
                                onClick={() => methodApp(can.applicantId)}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          )}
          <Modal
            open={openModel}
            onClose={handleCloseModel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Email email={""} setOpenModel={setOpenModel} />
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </>
  );
}

export default ViewCandidate;
