import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    styled,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
  import HistoryIcon from "@mui/icons-material/History";
  import "../Assignjobpost/Assignjobpost.css";
  import CloseIcon from "@mui/icons-material/Close";
  import { useContext, useState } from "react";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import cat from "../../../images/cat.png";
  import person1 from "../../../images/person1.jpg";
  import person2 from "../../../images/person2.jpg";
  import person3 from "../../../images/person3.jpg";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AlertContext from "../../contextProvider/AlertContext";
  
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    // Increase the font size and padding
    "& .MuiTooltip-tooltip": {
      fontSize: "13px",
      padding: theme.spacing(1),
    },
  }));

  const AssignJobPost = ({ recruiters ,jobPostingData ,profile  , setJobPostingData}) => {
  
    const navigate = useNavigate();
  
    const [recruiter, setRecruiter] = useState("");
    const [currentRecruiter, setCurrentRecruiter] = useState("");
    const [currentTasks, setCurrentTasks] = useState("");
    const [assignedTask, setAssignedTask] = useState([]);
    const [data, setData] = useState(recruiters);
    const {setAlert} = useContext(AlertContext);
  
    const assignTask = () => {
      let verified = true;
      if (currentRecruiter === "" && currentTasks === "") {
        setAlert({
          message : "Please select an recruiter and assign the task",
          open : true
        });
        verified = false;
      }
      if (currentRecruiter === "") {
        setAlert({
          message : "Please select an recruiter for assigned tasks",
          open : true
        });
        verified = false;
      }
      if (currentTasks === "") {
        verified = false;
        setAlert({
          message : "Please assign some task to " +recruiters.find((rec) => currentRecruiter === rec.id).name,
          open : true
        });
        
      }
  
      if (verified) {
        setAssignedTask([
          ...assignedTask,
          {
            recruiterId: currentRecruiter,
            assignedTask: currentTasks,
          },
        ]);
      }
  
      setCurrentRecruiter("");
      setCurrentTasks("");
    };
  
    const validateTask = () =>{
      let count = 0;
      assignedTask.map( task => count+= Number(task.assignedTask) )
      if(count != jobPostingData.noOfVaccancies) setAlert({
          message : "no of vaccancies must be equal to assigned task" , 
          open : true
        })
      else {
        let obj = {...jobPostingData};
        obj.recruitersIdWithAssignedCounts = assignedTask;
        setJobPostingData(obj);
        navigate("/Jobpost/preview-post");
      }
    }
  
    const handleChange = (e) => {
      if (e.target.name === "recruiter") setCurrentRecruiter(e.target.value);
      else setCurrentTasks(e.target.value);
    };
  
    const findRecruiter = (id) => {
      let x = recruiters.find((recruiter) => recruiter.employeeId === id);
      return x.firstName+" "+x.lastName;
    };
  
    const removeRecruiter = (id) => {
      setAssignedTask( assignedTask.filter( task => task.recruiterId !== id ) );
    }
  
    useEffect(() => {
      let newJobPostingData = jobPostingData;
      newJobPostingData.openDate = new Date(jobPostingData.openDate).toISOString().split("T")[0];
      newJobPostingData.closeDate = new Date(jobPostingData.closeDate).toISOString().split("T")[0];
      setJobPostingData(newJobPostingData);
      if (assignedTask.length > 0) {
        const task = [];
        recruiters.map((recruiter) => {
          let alreadyAssinged = true;
          assignedTask.map((data) => {
            if (recruiter.employeeId === data.recruiterId) alreadyAssinged = false;
          });
          if (alreadyAssinged) {
            task.push(recruiter);
          }
        });
        // const task = recruiters.filter(recruiter => !assignedTask.some(data => recruiter.id === data.recruiterId));
        setData(task);
      }else{
        setData(recruiters);
      }
    }, [assignedTask]);
  
    return (
      <>
        <Grid container>
          <Grid md={9.5} height={"100vh"}  item >
            <Grid item my={1}>
            <Box display={"flex"} alignItems={'center'} >
              <CustomTooltip
                title="Back"
                placement="bottom"
                arrow
                disableInteractive
              >
                <IconButton
                  sx={{ color: "#4b0082" }}
                  onClick={() => navigate(-1)}
                >
                  <KeyboardBackspaceIcon fontSize="large" />
                </IconButton>
              </CustomTooltip>
              <Stack
                display={"flex"}
                direction={"row"}
                mx={3}
                alignItems={"center"}
              >
                <Typography
                  variant="h4"
                  my={3}
                  color={"#C9D6DE"}
                  fontWeight={700}
                >
                  Create Job Post
                </Typography>
                <ArrowForwardIosIcon sx={{ mx: 2 }} />
                <Typography variant="h4"  fontWeight={700}>
                  Assign Job Post
                </Typography>
              </Stack>
              </Box>
             
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" bgcolor={"secondary.light"} p={2} px={3}>
                Job Assign
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Box
                m={3}
                display={"flex"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h6"}
                  fontWeight={700}
                  color={"primary.main"}
                >
                  {jobPostingData.title}
                </Typography>
                <Typography variant={"h6"} fontWeight={700}>
                  {" "}
                  Number Of Vaccancies : {jobPostingData.noOfVaccancies}{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12} height= {566} display={"flex"} direction={"column"} justifyContent={"space-between"} >
            <Grid
              item
              md={12}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mx={3}
            >
              <Grid item md={5}>
                <Typography mb={1}>* Recruiter</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentRecruiter}
                    name="recruiter"
                    onChange={handleChange}
                  >
                    {data.map((recruiter) => (
                      <MenuItem key={recruiter.employeeId} value={recruiter.employeeId}>
                        {" "}
                        {
                      console.log(recruiter.employeeId , profile.id)
                        }
                        {recruiter.firstName}{" "}{recruiter.lastName}{" "} {recruiter.employeeId == profile.id && "(Self Assign)"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={5}>
                <Typography mb={1}>* Number of Openings to assign</Typography>
                <TextField
                  onChange={handleChange}
                  value={currentTasks}
                  type={"number"}
                  fullWidth
                />
              </Grid>
              <Grid item md={1} mt={3}>
                <Button variant="contained" onClick={assignTask} fullWidth>
                  Assign
                </Button>
              </Grid>
            </Grid>
            <Grid item md={12} m={3}  >
              { assignedTask.length>0 && assignedTask.map((task,index) => (
                <Grid container md={12} px={2} bgcolor= { index%2 == 0 ? "secondary.light"  : "white" } alignItems={"center"} >
                  <Grid item md={4} textAlign={"start"} >
                    <Typography  >{findRecruiter(task.recruiterId)}</Typography>
                  </Grid>
                  <Grid item md={4} textAlign={"center"} >
                    <Typography  >{task.assignedTask}</Typography>
                  </Grid>
                  <Grid item md={4} textAlign={'end'} >
                    <IconButton onClick={()=>removeRecruiter(task.recruiterId)} >
                      <CloseIcon  />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              {assignedTask.length === 0 && <Box textAlign={"center"} >
                <img src={cat}  />
                <Typography color={"primary.main"} fontWeight={700}  >Come On!</Typography>
                <Typography color={"primary.main"} fontWeight={700} >Assign Task to Atleast One Recruiter !</Typography>
              </Box> }
            </Grid>
            <Grid item md={12} display={"flex"} direction={"column"} justifyContent={"end"} >
              <Stack display={"flex"}  direction={"row"} justifyContent={"end"} mb={3} alignItems={"flex-end"}  >
                <Button onClick={()=>navigate("/")} sx={{
                        width: "240px",
                        height: "60px",
                        borderRadius: 2,
                        marginRight: 3,
                      }} variant={"outlined"} >Cancel</Button>
                <Button  sx={{
                        width: "240px",
                        height: "60px",
                        borderRadius: 2,
                        marginRight: 3,
                      }} 
                      onClick={validateTask}
                      variant={"contained"} >Next</Button>
              </Stack>
            </Grid>
            </Grid>       
          </Grid>
          <Grid
            md={2.5}
            item
            container
            bgcolor={"secondary.main"}
            height={"100vh"}
          >
            <Grid item container position={"fixed"}>
              <Grid item container>
                <Grid item>
                  <Box display={"flex"} my={3} mx={2} alignItems={"center"}>
                    <HistoryIcon
                      color="primary"
                      sx={{ fontSize: "40px", mr: 1 }}
                    />
                    <Typography sx={{ fontWeight: 700 }} variant="h5">
                      Recruiter Activity
                    </Typography>
                  </Box>
                </Grid>
                <Grid item rowSpacing={3} container>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"primary.main"}
                      sx={{
                        width: "360px",
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
                          Jagadish
                        </Typography>
                        <Box
                          component={Paper}
                          eleveation={10}
                          sx={{
                            bgcolor: "secondary.dark",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            position: "relative",
                            top: "-35px",
                            boxShadow: "0px 6px 17px 0px #00000040",
                          }}
                        >
                          <img
                            src={person1}
                            style={{
                              height: "39px",
                              width: "39px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              top: 2.5,
                              left: 2.5,
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
                          Technical Recruiter
                        </Typography>
                        <Box>
                          <Typography color={"white"} fontSize={".8rem"}>
                            Assigned Task : 32
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"primary.light"}
                      sx={{
                        width: "360px",
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
                          Joseph Kuruvilla
                        </Typography>
                        <Box
                          component={Paper}
                          eleveation={10}
                          sx={{
                            bgcolor: "secondary.dark",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            position: "relative",
                            top: "-35px",
                            boxShadow: "0px 6px 17px 0px #00000040",
                          }}
                        >
                          <img
                            src={person2}
                            style={{
                              height: "39px",
                              width: "39px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              top: 2.5,
                              left: 2.5,
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
                          Technical Recruiter
                        </Typography>
                        <Box>
                          <Typography color={"white"} fontSize={".8rem"}>
                            Assigned Task : 32
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"secondary.dark"}
                      sx={{
                        width: "360px",
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
                          Sachin
                        </Typography>
                        <Box
                          component={Paper}
                          eleveation={10}
                          sx={{
                            bgcolor: "secondary.dark",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            position: "relative",
                            top: "-35px",
                            boxShadow: "0px 6px 17px 0px #00000040",
                          }}
                        >
                          <img
                            src={person3}
                            style={{
                              height: "39px",
                              width: "39px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              top: 2.5,
                              left: 2.5,
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
                          Technical Recruiter
                        </Typography>
                        <Box>
                          <Typography color={"white"} fontSize={".8rem"}>
                            Assigned Task : 32
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item md={12} m={2}>
                    <Box
                      bgcolor={"primary.dark"}
                      sx={{
                        width: "360px",
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
                          Jeevanantham
                        </Typography>
                        <Box
                          component={Paper}
                          eleveation={10}
                          sx={{
                            bgcolor: "secondary.dark",
                            height: "45px",
                            width: "45px",
                            borderRadius: "50%",
                            position: "relative",
                            top: "-35px",
                            boxShadow: "0px 6px 17px 0px #00000040",
                          }}
                        >
                          <img
                            src={person1}
                            style={{
                              height: "39px",
                              width: "39px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "absolute",
                              top: 2.5,
                              left: 2.5,
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
                          Technical Recruiter
                        </Typography>
                        <Box>
                          <Typography color={"white"} fontSize={".8rem"}>
                            Assigned Task : 32
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default AssignJobPost;