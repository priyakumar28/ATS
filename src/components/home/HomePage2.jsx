import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, Icon, IconButton, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import React,{useState,  useEffect} from "react";
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import job from '../../images/job.png'
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import { Circle, DateRange, RemoveRedEye } from '@mui/icons-material';
import { Delete } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import calendaricon from '../../images/calandericon.png'
import {BusinessCenter} from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import girl from '../../images/girl.jpg';
import boy from '../../images/boy.jpg';
import view from "../../images/view.svg";
import hired from '../../images/hired.png';
import Interviewed from '../../images/interviewed.png';
import Rejected from "../../images/rejected.png";
import Elipse1 from '../../images/Ellipse 47.png';
import Elipse2 from '../../images/Ellipse 48.png';
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import {
  getAllJobPosting,
  getJobREcruiterStatistics,
  getJobStatistics,
  getRecruitersByBranchId,
} from "../../services/jobPostService";
import Loader from "../Loader/Loader";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CircleIcon from "@mui/icons-material/Circle";
import { ThemeProvider,createTheme,} from '@mui/material'


const tableData = [
    { "name": "Dhanalakshmi", "openings": "57", "positions": "26", "category": "java", "status": "In-progress", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> },
    { "name": "Aani Agusta", "openings": "7", "positions": "63", "category": "Python", "status": "New", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> },
    { "name": "Mythili", "openings": "4", "positions": "2", "category": "SQL", "status": "In-progress", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> },
    { "name": "Ambritha", "openings": "29", "positions": "6", "category": "React", "status": "New", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> },
    { "name": "Keerthivasan", "openings": "66", "positions": "62", "category": "Node", "status": "New", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> },
    { "name": "Rufus", "openings": "8", "positions": "1", "category": "java", "status": "In-progress", "icon": <RemoveRedEye style={{ color: "gray" }} />, "view": <Delete style={{ color: "gray" }} /> }
]
// const cardData =[
//     {"position":"Intern Java Developer", "vacancy":"39", "Expiry":"31/05/2023"},
//     {"position":"Intern Python Developer", "vacancy":"09", "Expiry":"03/07/2023"},
//     {"position":"Intern NodeJs Developer", "vacancy":"50", "Expiry":"01/06/2023"}
// ]


export default function HomePage({ onGoingRequirements }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);  
    const [jobList, setJobList] = useState([]);
    const [filteredJob, setFilteredJob] = useState({ completed: "",scheduled: "",   rescheduled: "",  cancelled: "", });
  
    const [selectedJob, SetSelectedJob] = useState();
    const [recruiterStatics, setRecruiterStatics] = useState([]);
    const [recruiters, setRecruiters] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

 
    const findRecruiter = (id) => {
    let x = recruiters.find((recruiter) => recruiter.employeeId === id);
    return x.firstName + " " + x.lastName;
   };
   
  useEffect(() => {
    getAllJobPosting(1)
      .then((data) => setJobList(data))
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
      .then((data) => {console.log(data); setFilteredJob(data);})
      .then(() => getJobREcruiterStatistics(id, 1))
      .then((data) => {
        console.log(data);
        setRecruiterStatics(data);
        setLoader(false);
      });
  }; 
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return (
        <Box >
            {/* main container */}
            {/* {loader && <Loader />} */}
            <ThemeProvider theme={theme}>
            <Grid container pt={2} pl={2} >
                {/* main content item */}
                <Grid item lg={9} md={8} sm={12} xs={12} >
                    {/* for main content container */}
                    <Grid container spacing={3} lg={12}  >
                        {/* graph grid */}
                        <Grid item lg={9} md={12} sm={12} xs={12}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2, pb:3 }}>
                                <Grid container display={'flex'} flexDirection={'row'} justifyContent={"space-between"}>
                                    <Grid item>
                                    <Typography pl={2} fontSize={'25px'} fontWeight={'bold'}>Recruitment Progress</Typography>
                                    </Grid>
                                    <Grid item mt={1}pr={2}>
                                    <FormControl sx={{ width: '200px' }} size='small'>
                                        <Select  displayEmpty
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
                               
                                <Grid container columnGap={1} rowGap={1} p={1.5} mt={2} display={'flex'} flexDirection={'row'} justifyContent={"space-between"} alignItems={'center'}>
                                <Grid item  lg={2.5} md={4} sm={4.5} xs={4.5}  >
                                   <Card  sx={{boxShadow:2, borderRadius:3, backgroundColor:'#820078'}}>
                                        <Grid item p={1} display={'flex'} justifyContent={'flex-end'}>
                                            <IconButton sx={{backgroundColor:'#ffffff'}}>
                                              <img src={hired} alt="" /> 
                                            </IconButton>
                                    </Grid>
                                    <Grid item p={1} position='relative'>
                                        
                                        <Typography fontSize='20px' color='#ffffff' fontWeight='bold' >Openings</Typography>
                                        <Typography fontSize='25px' color='#ffffff' fontWeight='bold'>23</Typography>
                                    
                                        
                                    </Grid>
                                   </Card>
                                   </Grid>
                                   <Grid item  lg={2.5} md={4} sm={4.5} xs={4.5}>
                                   <Card  sx={{boxShadow:2, borderRadius:3, backgroundColor:'#4a148c'}}>
                                        <Grid item p={1} display={'flex'} justifyContent={'flex-end'}>
                                            <IconButton sx={{backgroundColor:'#ffffff'}}>
                                              <img src={hired} alt="" /> 
                                            </IconButton>
                                    </Grid>
                                    <Grid item p={1}>
                                        <Typography fontSize='20px' color='#ffffff' fontWeight='bold'>Interviewed</Typography>
                                        <Typography fontSize='25px' color='#ffffff' fontWeight='bold'>13</Typography>
                                    </Grid>
                                   </Card>
                                   </Grid>
                                   <Grid item  lg={2.5} md={4} sm={4.5} xs={4.5} >
                                   <Card  sx={{boxShadow:2, borderRadius:3, backgroundColor:'#003D62'}}>
                                        <Grid item p={1} display={'flex'} justifyContent={'flex-end'}>
                                            <IconButton sx={{backgroundColor:'#ffffff'}}>
                                              <img src={Interviewed} alt="" height='45px' width='45px'/> 
                                            </IconButton>
                                    </Grid>
                                    <Grid item p={1}>
                                        <Typography fontSize='20px' color='#ffffff' fontWeight='bold'>Hired</Typography>
                                        <Typography fontSize='25px' color='#ffffff' fontWeight='bold'>03</Typography>
                                    </Grid>
                                   </Card>
                                   </Grid>
                                   <Grid item  lg={2.5} md={4} sm={4.5} xs={4.5} >
                                   <Card  sx={{boxShadow:2, borderRadius:3, backgroundColor:'#004d40'}}>
                                        <Grid item p={1} display={'flex'} justifyContent={'flex-end'}>
                                            <IconButton sx={{backgroundColor:'#ffffff'}}>
                                              <img src={Rejected} alt="" /> 
                                            </IconButton>
                                    </Grid>
                                    <Grid item p={1}>
                                        <Typography fontSize='20px' color='#ffffff' fontWeight='bold'>Rejected</Typography>
                                        <Typography fontSize='25px' color='#ffffff' fontWeight='bold'>23</Typography>
                                    </Grid>
                                   </Card>
                                   </Grid>
                                </Grid>
                              
                            </Card>
                        </Grid>
                        {/* add job grid */}
                        <Grid item lg={3} md={12} sm={12} xs={12}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2, pb:2}} >
                                <Grid container display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Grid item>
                                        <img src={job} alt='' />
                                    </Grid>
                                    <Grid item pb={1} >
                                        <Button size="medium" variant="contained" onClick={() => navigate("/Jobpost")} sx={{  borderRadius: 5, backgroundColor:'#4B0082' }} >Add Job Post</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        {/* recruiter progress grid */}
                        <Grid item lg={12}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                                <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Grid item>
                                        <Typography fontWeight={'bold'} pl={3} fontSize={'25px'}>Recruiter's Progress</Typography>
                                    </Grid>
                                    <Grid item pr={2}>
                                        <Link href="#">See All</Link>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <TableContainer>
                                    
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{fontWeight:'bold'}} align="center" >Recruiter</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Openings Assigned</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Positions Filled</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Category</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Status</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">View Recruiter Profile</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {recruiterStatics.map((row) => (
                                                <TableRow key={row[0]}>
                                                <TableCell>{findRecruiter(row[1])}</TableCell>
                                                <TableCell>{row[4]}</TableCell>
                                                <TableCell>{row[0]}</TableCell>
                                                <TableCell>{row[3]}</TableCell>
                                                <TableCell>
                              <IconButton disabled>
                                <img src={view} alt="" />
                              </IconButton>
                              View
                            </TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[1]}
                                        component="div"     
                                        count={tableData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Card>

                        </Grid>
                    </Grid>
                </Grid>
                {/* side content item */}
                <Grid item lg={3} md={4}  display={{sm:'none', xs:'none', lg:'block', md:'block'}}  sx={{ backgroundColor:"#e0e0e0",   }}   >
                    <Grid container item display={'flex'} flexDirection={'row'} >
                    <IconButton>
                        <BusinessCenter sx={{color:'#4B0082'}}  />
                    </IconButton>
                    <Typography fontWeight={'bold'}  fontSize={'25px'}>Ongoing Recruitments </Typography>
                    </Grid>
                   
                   
                    <Grid container   display={'flex'} flexDirection={'column'} >
                    {onGoingRequirements.map((recuirement,index) => { 
                          const cardColor = index ===0 ? '#820078' : index ===1 ? '#4a148c' : '#003D62' 
                        return(
                        <Grid item p={2} >
                        <Chip  size="small" sx={{backgroundColor:'#ffffff',boxShadow:2 , borderRadius:1}} icon={<Badge variant="dot" color="success" anchorOrigin={{ vertical: 'top',  horizontal: 'right', }} />} label={recuirement[0]} />
                            <Card sx={{  p:1, borderRadius:2, backgroundColor: cardColor}}>
                                <Grid container >
                                    <Grid container item mt={1} justifyContent={"space-around"}>
                                        <Typography color={'#ffffff'}>{recuirement[1]}</Typography>
                                        <Typography color={'#ffffff'} >Vacancy: {recuirement[2]}</Typography>
                                    </Grid>
                                    <Grid container item  justifyContent={"space-around"} alignContent={'center'}>
                                        <Typography fontSize={'10px'} mt={1 } color={'#ffffff'} pr={2}  >Expiry Date: {recuirement[3]}{" "}</Typography>
                                        <AvatarGroup max={3}>
                                            <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" src={girl} />
                                            <Avatar sx={{ width: 24, height: 24 }} alt="Travis Howard" src={boy} />
                                            <Avatar sx={{ width: 24, height: 24 }} alt="Cindy Baker" src={girl} />
                                        </AvatarGroup>
                                    </Grid>
                                </Grid>
                            </Card>

                        </Grid>
                       )
                     })}
                       
                        <Grid container item display={'flex'} flexDirection={'row'} alignItems={'center'} >
                    <IconButton>
                        <DateRange sx={{color:'#4B0082'}}  />
                    </IconButton>
                    <Typography fontWeight={'bold'}  fontSize={'25px'}>Interviwes</Typography>
                    </Grid>
                        <Grid item p={1} height={'80h'} >
                           
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
      
                           <DateCalendar sx={{backgroundColor:"#ffffff" , borderRadius:2, }}/>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>


                </Grid>

            </Grid>
            </ThemeProvider>
        </Box>
    )
}