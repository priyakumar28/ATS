import { BusinessCenter, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Badge, Box, Card, FormControl, Grid, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import women from '../../images/woman.png';
import hired from '../../images/hired.png';
import Interviewed from '../../images/interviewed.png';
import Rejected from "../../images/rejected.png";
import { ThemeProvider,createTheme,} from '@mui/material';
import {PieChart, Pie, Sector, Cell, Tooltip, BarChart, XAxis, YAxis, CartesianGrid, Bar, Legend} from 'recharts'
import React , {useState}from "react";


 function RecruiterDB() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      
    const DonutChart = [ 
    { name: 'interviewed', value: 20 , color: '#605BFF'},
    { name: 'Rejected', value: 10,color: '#FCC400' },
    { name: 'Pending', value: 10,color: '#dd2c00' },
    { name: 'Balance Position', value: 10,color: '#bdbdbd' },
]
const tableData =[{name:"Tamil", level: "Technical", Status : 'New', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> },
{name:"Haripriya", level: "HR Round", Status : 'Completed', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> },
{name:"Rizwan", level: "Technical", Status : 'Hired', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> },
{name:"Velsamy", level: "HR Round", Status : 'New', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> },
{name:"Vinothini", level: "Technical", Status : 'Hired', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> },
{name:"Tamil", level: "HR Round", Status : 'Completed', feedback:<RemoveRedEye style={{ color: "gray" }} />, Resume :<RemoveRedEye style={{ color: "gray" }} /> }]
    const cardData =[
        {"position":"Technical Trainer", "AssignedTask":"39", "CompletedTask":"32"},
        {"position":"System Admin", "AssignedTask":"09", "CompletedTask":"03"},
        {"position":"Intern NodeJs Developer", "AssignedTasks":"50", "CompletedTask":"45"}
    ]
    const data = [
        { name: 'jan', value: 30 },
        { name: 'feb', value: 20 },
        { name: 'mar', value: 10 },
        { name: 'apr', value: 50 },
        { name: 'may', value: 60 },
        { name: 'jun', value: 40 },
        { name: 'jul', value: 70 },
        { name: 'aug', value: 60 },
        { name: 'sep', value: 90 },
        { name: 'oct', value: 40 },
        { name: 'nov', value: 80 },
        { name: 'dec', value: 30 },
    ];
    return(
        <Box>
             {/* main container */}
             <Grid container pl={2} >
                 {/* main content item */}
                 <Grid item lg={9.5} md={8} sm={12} xs={12} pt={2}>
                        {/* for main content container */}
                        <Grid container spacing={3} lg={12}  >
                            {/* profile info */}
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Card sx={{ borderRadius: 2, boxShadow: 2, pb:3 }}>
                                <Grid container display={'flex'} flexDirection={'row'} justifyContent={"space-between"}>
                                    <Grid item>
                                    <Typography pl={2} fontSize={'25px'} fontWeight={'bold'}>Recruiter Analytics</Typography>
                                    </Grid>
                                    <Grid item mt={1}pr={2}>
                                    <FormControl sx={{ width: '200px' }} size='small'>
                                        <Select  displayEmpty>
                                        <MenuItem>Technical Trainer</MenuItem>
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
                            {/* recruiter analytics grid */}
                            {/* <Grid item lg={6} md={12} sm={12} xs={12} >
                            <Card sx={{boxShadow:3}}>
                                    <Grid item pt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
                                        <Typography fontSize={'20px'} pt={2} pr={18}>Recruiter Analytics</Typography>
                                        <FormControl sx={{ width: '200px' }} size='small'>
                                        <Select displayEmpty>
                                            <MenuItem>Java</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>  
                                    <Grid item>
                                        <Typography fontSize={'18px'} pr={8} pt={2}>Total Number of Vacancies: 440</Typography></Grid>    
                                    <Grid item>
                                        <PieChart width={500} height={300}>
                                          <Pie  data={DonutChart} cx={200} cy={110} innerRadius={80} outerRadius={100} fill={''} paddingAngle={0} dataKey={'value'}>
                                            {DonutChart.map((e,index) => <Cell key={`cell-${index}`} fill={e.color} /> )}
                                          </Pie>
                                            <Tooltip/>
                                            <Legend  verticalAlign="bottom"/>                                           
                                        </PieChart>
                                    </Grid>
                                        
                                    </Grid>
                                    </Card>
                            </Grid> */}
                        </Grid>
                        {/* candidates grid */}
                        <Grid item lg={11.8} pt={2}>
                        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                <Grid item container  pt={2} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                        <Typography  fontSize={'25px'} pt={'2px'} pl={2}>Candidates</Typography>
                                        <FormControl  sx={{ width: '200px',pr:2 }} size='small'>
                                        <Select displayEmpty>
                                            <MenuItem>System Admin</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <TableContainer>                              
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{fontWeight:'bold'}} align="center" >Candidate Name</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Level of Interview</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Status</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Feedback</TableCell>
                                                <TableCell sx={{fontWeight:'bold'}} align="center">Resume</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData
                                            // .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
                                            .map((e) => (
                                                <TableRow >
                                                    <TableCell align="center">{e.name}</TableCell>
                                                    <TableCell align="center">{e.level}</TableCell>
                                                    <TableCell align="center">{e.Status}</TableCell>
                                                    <TableCell align="center">{e.feedback}</TableCell>
                                                    <TableCell align="center">{e.Resume}</TableCell>                                               
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    {/* <TablePagination
        rowsPerPageOptions={[1]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
                                </Grid>
                            </Card>
                        </Grid>
                 </Grid>
                   {/* side content item */}
                 <Grid item lg={2.5} md={4}  display={{sm:'none', xs:'none', lg:'block', md:'block'}}  sx={{ backgroundColor:"#e0e0e0",  }}>
                 <Grid container item display={'flex'} flexDirection={'row'} >
                    <IconButton>  <BusinessCenter sx={{color:'#4B0082'}}  /> </IconButton>
                    <Typography fontWeight={'bold'}  fontSize={'25px'}>Ongoing Tasks </Typography>
                    </Grid>
                    <Grid container display={'flex'} flexDirection={'column'} >
                    {cardData.map((e,index) =>{
                        const cardColor = index ===0 ? '#4a148c' : index ===1 ? '#820078' : index === 2 ? '#003D62' : null
                        return(
                        <Grid item p={3} position='relative'>
                        <Avatar sx={{ width: 44, height: 44 , position:'absolute', left: { xs: 130, sm: 180, md: 230 , lg:200, xl:250},  top: 2, }} alt="Remy Sharp" src={women}  />
                            <Card sx={{  p:1, borderRadius:2, backgroundColor: cardColor}}>
                                <Grid container >
                                    <Grid container item mt={1} justifyContent={"flex-start"}>
                                        <Typography color={'#ffffff'}>{e.position}</Typography>                                     
                                    </Grid>
                                    <Grid container item  justifyContent={"space-between"} alignContent={'center'}>
                                        <Typography fontSize={'12px'} mt={1 } color={'#ffffff'} pr={2}  >Assigned Task: {e.AssignedTask}</Typography>
                                        <Typography color={'#ffffff'} fontSize={'12px'}  mt={1 }>Completed Task: {e.CompletedTask}</Typography>               
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                         )})}
                         </Grid>
                 </Grid>
             </Grid>
        </Box>
    )
    
}   


export default RecruiterDB