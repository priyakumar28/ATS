// import { ThemeProvider } from '@emotion/react'
// import { React, useState } from 'react'
// import { Grid, Menu, createTheme, Typography, Stack, Box, TextField, Button, FormControl, MenuItem, TableContainer, Table, TableHead, TableRow, Select, TableBody } from '@mui/material';
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { alpha, styled } from "@mui/material/styles";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import CircleIcon from "@mui/icons-material/Circle";
// import Paper from "@mui/material/Paper";
// import { useEffect } from 'react';
// import { viewScheduledInterviews } from '../../services/interviewScheduleService';



// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#FAFAFA",
//     color: theme.palette.common.black,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     position: "relative",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(even)": {
//     backgroundColor: "#FAFAFA",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function stringToColor(string) {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = "#";

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.slice(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// }

// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 158,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));


// const theme = createTheme({
//   components: {
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           color: "white",
//         },
//       },
//     },
//   },
//   typography: {
//     fontFamily: "lato",
//   },
//   palette: {
//     primary: {
//       main: "#4b0082",
//     },
//   },
// });

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//       fontSize: "15px",
//       width: 24,
//       height: 24,
//     },
//     children: `${name.split(" ")[0][0]}`,
//   };
// }

// function getStatusColor(status) {
//   const str2 = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
//   switch (str2) {
//     case "Open":
//       return "#4B0082";
//     case "Inprogress":
//       return "#820078";
//     case "Close":
//       return "#FCC400";
//   }
// }

// const ViewInterviewsByInterviewer = () => {
//   const [status, setStatus] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("");
//   // const [interviewSchedule, setInterviewSchedule] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const open = Boolean(anchorEl);
//   const handleOptionChange = (key) => {
//     setSelectedOption(key);
//     // getData();
//     //to get datas from backend
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   function createRecord(ApplicantName, Position, RecruiterName, LevelsCompleted, ScheduledAt, Join) {
//     return { ApplicantName, Position, RecruiterName, LevelsCompleted, ScheduledAt, Join };
//   }
  
//   const rows = [
//     createRecord('Nithila', 'Java Developer', 'Aravind', 3, '23-06-2023 11:15:00 am'),
//     createRecord('Mohana', 'Python Developer', 'Anand', 3, '23-06-2023 01:15:00 pm'),
//     createRecord('priya', 'React Developer', 'Aravind', 3, '23-06-2023 03:45:00 pm'),
//     createRecord('Logesh', 'Node Developer', 'Ganesh', 3, '24-06-2023 11:15:00 am'),
//     createRecord('Mahesh', 'Java Developer', 'Siva', 3, '24-06-2023 03:45:00 pm'),
//     createRecord('Naren', 'Design Engineer', 'Kavin', 3, '25-06-2023 11:15:00 am'),
//     createRecord('Zara', 'UI/UX Developer', 'Nivetha', 3, '25-06-2023 04:30:00 pm'),
//     createRecord('venba', 'Technical Recruiter', 'Yogesh', 3, '26-06-2023 11:15:00 am'),
//   ]

//   // const getData = () => {
//   //   viewScheduledInterviews(1).then((data) => {
//   //     setInterviewSchedule(data);
//   //   });
//   // };

//   // useEffect(() => {
//   //   getData();

//   // }, []);




//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container rowSpacing={5} px={5}>
//         <Grid item xs={12} sx={{ marginTop: 5, pr: "5%" }}>
//           <Grid container alignItems="center" justifyContent="space-between">
//             <Grid item xs={12} md={3}>
//               <Typography variant="h5">Scheduled Interviews</Typography>
//             </Grid>
//             <Grid item xl={9} md={12} sx={{ mt: { md: "20px" } }}>
//               <Stack
//                 direction={{ xs: "column", sm: "row" }}
//                 spacing={2}
//                 alignItems={{ xs: "flex-start", sm: "center" }}
//                 justifyContent="flex-end"
//               >
//                 <Box width={"350px"}>
//                   <TextField
//                     placeholder="Search"
//                     id="Search"
//                     InputProps={{
//                       style: {
//                         padding: "10px",
//                         height: "40px",
//                         borderTopLeftRadius: "8px",
//                         borderTopRightRadius: "0px",
//                         borderBottomRightRadius: "0px",
//                         borderBottomLeftRadius: "8px",
//                       },
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     sx={{
//                       height: "40px",
//                       fontSize: "14px",
//                       borderTopLeftRadius: "0px",
//                       borderTopRightRadius: "8px",
//                       borderBottomRightRadius: "8px",
//                       borderBottomLeftRadius: "0px",
//                     }}
//                   >
//                     Search
//                   </Button>
//                 </Box>
//                 <FormControl>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       height: "40px",
//                       backgroundColor: "#4B0082",
//                       fontSize: "14px",
//                       borderRadius: "8px",
//                     }}
//                     // endIcon={
//                     //   <FilterAltIcon
//                     //     sx={{ paddingLeft: "60px", color: "white" }}
//                     //   />
//                     // }
//                     onClick={handleClick}
//                   >
//                     Status
//                   </Button>
//                   <StyledMenu
//                     id="demo-customized-menu"
//                     MenuListProps={{
//                       "aria-labelledby": "demo-customized-button",
//                     }}
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                   >
//                     <MenuItem
//                       onClick={() => (handleClose())}
//                       disableRipple
//                     >
//                       <CircleIcon
//                         sx={{
//                           mr: 1,
//                           color: "#820078",
//                           width: "15px",
//                           height: "15px",
//                         }}
//                       />
//                       Inprocess
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => (handleClose())}
//                       disableRipple
//                     >
//                       <CircleIcon
//                         sx={{
//                           mr: 1,
//                           color: "#4B0082",
//                           width: "15px",
//                           height: "15px",
//                         }}
//                       />
//                       Open
//                     </MenuItem>
//                     <MenuItem
//                       onClick={() => (handleClose())}
//                       disableRipple
//                     >
//                       <CircleIcon
//                         sx={{
//                           mr: 1,
//                           color: "#FCC400",
//                           width: "15px",
//                           height: "15px",
//                         }}
//                       />
//                       Close
//                     </MenuItem>
//                   </StyledMenu>
//                 </FormControl>
//                 {/* <TextField
//                   id="outlined-basic"
//                   InputProps={{
//                     style: {
//                       fontSize: "14px",
//                       padding: "10px",
//                       height: "40px",
//                       color: "white",
//                     },
//                   }}
//                   sx={{ backgroundColor: "#4B0082", borderRadius: "8px" }}
//                   type="date"
//                   variant="outlined"
//                 />
//                 <Typography>To</Typography>
//                 <TextField
//                   id="outlined-basic"
//                   InputProps={{
//                     style: {
//                       fontSize: "14px",
//                       padding: "10px",
//                       height: "40px",
//                       color: "white",
//                     },
//                   }}
//                   sx={{ backgroundColor: "#4B0082", borderRadius: "8px" }}
//                   type="date"
//                   variant="outlined"
//                 /> */}
//               </Stack>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Applicant Name
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Position
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Recruiter Name
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Levels Completed
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Scheduled At
//                   </StyledTableCell>
//                   <StyledTableCell
//                     align="left"
//                     sx={{ fontSize: "14px", fontWeight: "700" }}
//                   >
//                     Join
//                   </StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow
//                     key={row.ApplicantName}
//                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                     <TableCell component='th' scope='row'>
//                       {row.ApplicantName}
//                     </TableCell>
//                     <TableCell component='th' scope='row'>
//                       {row.Position}
//                     </TableCell>
//                     <TableCell component='th' scope='row'>
//                       {row.RecruiterName}
//                     </TableCell>
//                     <TableCell component='th' scope='row'>
//                       {row.LevelsCompleted}
//                     </TableCell>
//                     <TableCell component='th' scope='row'>
//                       {row.ScheduledAt}
//                     </TableCell>
//                     <TableCell component='th' scope='row'>
//                       {/* {row.Category} */}
//                       <Button
//                         variant="contained"
//                         sx={{
//                           height: "40px",
//                           fontSize: "14px",
//                           borderTopLeftRadius: "0px",
//                           borderTopRightRadius: "8px",
//                           borderBottomRightRadius: "8px",
//                           borderBottomLeftRadius: "0px",
//                         }}>
//                         Join
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   )
// }

// export default ViewInterviewsByInterviewer