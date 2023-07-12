import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Divider,
  Grid,
  Menu,
  Stack,
  Typography,
  createTheme,
  IconButton,
  Autocomplete,
  Pagination,
  CircularProgress,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ThemeProvider } from "@emotion/react";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useContext, useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  getFilterAllJobPosting,
  getJobPosted,
  getRecruitersByBranchId,
} from "../../services/jobPostService";
import { useNavigate } from "react-router-dom";
import CandidateListByJob from "../viewinterview/CandidateListByJob";
import Loader from "../Loader/Loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 158,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: "15px",
      width: 24,
      height: 24,
      cursor: "pointer",
    },
    children: `${name.split(" ")[0][0].toUpperCase()}`,
    title: name,
  };
}

function getStatusColor(status) {
  const str2 = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  switch (str2) {
    case "Open":
      return "#4B0082";
    case "Inprocess":
      return "#820078";
    case "Close":
      return "#FCC400";
  }
}

const JobList = ({ setJobPostingData, updateJobPostingForm }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title, setTitle] = useState("");
  const [jobDetails, setJobDetails] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openRender, setOpenRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobLimit, setJobLimit] = useState([]);
  const [localRefresh, setLocalRefresh] = useState(false);
  const [openCommon, setOpenCommons] = useState(false);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  //pagnation
  const [page, setPage] = useState(1);
  const [countLimit, setCountLimit] = useState(10);

  const handleSetLimitJob = (event, value) => {
    console.log(value);
    setCountLimit(value);
  };
  const totalPages = Math.ceil(jobDetails.length / 10);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //filter

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hendleEndDate = (data) => {
    setEndDate(data);
    console.log(data);
    console.log(startDate);
    setRefresh(!refresh);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTitle = (event) => {
    if (event.target.value == "") {
      getData();
    }
    setTitle(event.target.value);
  };

  // const getData = () => {

  //   getFilterAllJobPosting(1).then((data) => {
  //     setJobDetails(data);
  //     // setSelectedOption("");
  //     // setSearchValue("");
  //   });
  // };
  const getData = () => {
    // if (user.role == "hr_manager") {
    let formData = new FormData();
    if (status != "") {
      formData.append("status", status);
    }
    if (startDate != "") {
      console.log(startDate);
      formData.append("startDate", startDate);
    }
    if (endDate != "") {
      console.log(endDate);
      formData.append("endDate", endDate);
    }
    setOpenRender(false);
    setIsLoading(true);
    setOpenCommons(false);
    getFilterAllJobPosting(1, formData).then((data) => {
      if (data.statusCode == 2200) {
        setJobDetails(data.value);
        console.log(data);
        setOpenRender(true);
        setIsLoading(false);
      } else {
        setJobDetails([]);
        showAert();
        setOpenCommons(true);
      }
    });
  };

  const handleSearch = () => {
    const filtered = jobDetails.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );

    setJobDetails(filtered);
  };

  const handleStatus = (data) => {
    setStatus(data);
    setRefresh(!refresh);
  };
  useEffect(() => {
    getData();
    getRecruitersByBranchId(1)
      .then((data) => {
        console.log(data);
        setRecruiters(data);
      })
      .catch((error) => alert(error.message));
  }, [refresh]);

  //finding recruiter
  const findRecruiter = (id) => {
    let rec = recruiters.find((recruiter) => recruiter.employeeId === id);
    return rec.firstName + " " + rec.lastName;
  };

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
  const updateJobPostingData = (data) => {
    setJobPostingData({
      id: data.id,
      title: data.title,
      experience: data.experience,
      noOfVaccancies: data.noOfVaccancies,
      jobRecruiters: data.jobRecruiters,
      skills: data.skills,
      type: data.type,
      location: data.location,
      openDate: data.openDate,
      closeDate: data.closeDate,
      description: data.description,
      requirement: data.requirement,
      status: data.status,
    });
    navigate("/view-job-post");
  };

  const showAert = () => {
    return <Typography>No Data found</Typography>;
  };

  const [serchCon, setSearchCon] = useState(false);

  const showFilter = () => {
    if ((serchCon && title != "") || status != "" || endDate != "") {
      return (
        <Grid
          container
          alignItems="center"
          sx={{ display: "flex", alignItems: "center", pb: 1 }}
        >
          <Grid item>
            <FilterListIcon sx={{ color: "#4B0082" }} fontSize="large" />
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            {" "}
            {serchCon && (
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
                <Typography color={"white"}>{title}</Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (
                    setTitle(""), setRefresh(!refresh), setSearchCon(false)
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
                  px: 2.5,
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
                  onClick={() => (setStatus(""), setRefresh(!refresh))}
                />
              </Box>
            )}
            {endDate != "" && (
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
                <Typography color={"white"}>
                  {startDate}
                  {" - "}
                  {endDate}
                </Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (
                    setStartDate(""), setEndDate(""), setRefresh(!refresh)
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      );
    }
  };

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    // Increase the font size and padding
    "& .MuiTooltip-tooltip": {
      fontSize: "16px",
      padding: theme.spacing(1),
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* {isLoading && <Loader />} */}
      <Grid container rowSpacing={2} px={5}>
        <Grid item xs={12} sx={{ pr: "5%" }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid
              container
              alignItems="center"
              item
              xs={12}
              md={3}
              direction="row"
            >
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
              <Typography variant="h4" fontWeight={700}>
                List of postings
              </Typography>
            </Grid>
            <Grid item xl={9} md={12} sx={{ mt: { md: "20px" } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="flex-end"
              >
                <CustomTooltip
                  title="Add Job post"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <IconButton
                    sx={{ color: "#4b0082" }}
                    onClick={() => navigate("/Jobpost")}
                  >
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </CustomTooltip>
                <Box width={"350px"}>
                  <TextField
                    placeholder="search by title"
                    id="search"
                    value={title}
                    onChange={(e) => handleTitle(e)}
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
                    variant="contained"
                    onClick={() => (handleSearch(), setSearchCon(true))}
                    sx={{
                      height: "40px",
                      fontSize: "14px",
                      borderTopLeftRadius: "0px",
                      borderTopRightRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderBottomLeftRadius: "0px",
                      backgroundColor: "#4B0082",
                    }}
                    disableRipple
                  >
                    search
                  </Button>
                </Box>
                <FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      height: "40px",
                      backgroundColor: "#4B0082",
                      fontSize: "14px",
                      borderRadius: "8px",
                    }}
                    endIcon={<FilterAltIcon sx={{ color: "white", mx: 1 }} />}
                    onClick={handleClick}
                  >
                    Status
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => (handleClose(), handleStatus("INPROCESS"))}
                      disableRipple
                    >
                      <CircleIcon
                        sx={{
                          mr: 1,
                          color: "#820078",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      Inprocess
                    </MenuItem>
                    <MenuItem
                      onClick={() => (handleClose(), handleStatus("OPEN"))}
                      disableRipple
                    >
                      <CircleIcon
                        sx={{
                          mr: 1,
                          color: "#4B0082",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      Open
                    </MenuItem>
                    <MenuItem
                      onClick={() => (handleClose(), handleStatus("CLOSE"))}
                      disableRipple
                    >
                      <CircleIcon
                        sx={{
                          mr: 1,
                          color: "#FCC400",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      Close
                    </MenuItem>
                  </StyledMenu>
                </FormControl>
             
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {showFilter()}

        <Grid
          item
          xs={12}
          direction={"column"}
          sx={{
            height: "78vh",
          }}
        >
          {" "}
          <Grid
            sx={{
              height: "70vh",
              // border: "1px solid black",
              overflowX: "auto",
            }}
          >
            {openRender ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        JobTitle
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Status
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        JobPostDate
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        EndDate
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Recruiters
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        NumberOfOpenings
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        PositionFilled
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        View Job
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        View Applicant
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobDetails
                      .slice(
                        (page - 1) * rowsPerPage,
                        (page - 1) * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row"  onClick={() => updateJobPostingData(row)}>
                            {row.title}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "center",
                            }}
                          >
                            <CircleIcon
                              sx={{
                                mr: 1,
                                color: getStatusColor(row.status),
                                width: "15px",
                                height: "15px",
                              }}
                            />
                            <Typography>
                              {row.status.charAt(0).toUpperCase() +
                                row.status.slice(1).toLowerCase()}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell>{row.openDate}</StyledTableCell>
                          <StyledTableCell>{row.closeDate}</StyledTableCell>
                          <StyledTableCell>
                            <Stack direction="row" spacing={-1}>
                              {row.jobRecruiters.map((recruiter) => {
                                const recruiterData = findRecruiter(
                                  recruiter.recruiterId
                                );
                                if (!recruiterData) {
                                  return null; // Skip rendering if recruiterData is undefined
                                }
                                return (
                                  <React.Fragment key={recruiter.recruiterId}>
                                    <Tooltip
                                      title={recruiterData}
                                      placement="bottom"
                                    >
                                      <Avatar
                                        {...stringAvatar(recruiterData)}
                                      />
                                    </Tooltip>
                                  </React.Fragment>
                                );
                              })}
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.noOfVaccancies}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.positionFilled}
                          </StyledTableCell>
                          {/* <StyledTableCell>{row.PositionFilled}</StyledTableCell> */}
                          <StyledTableCell
                            onClick={() => updateJobPostingData(row)}
                          >
                            <Box display={"flex"} alignItems={"center"}>
                              <LaunchIcon
                                sx={{
                                  mr: 2,
                                  color: "#4B0082",
                                  height: "17px",
                                }}
                              />
                              {row.CandidateDetails}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell
                            onClick={() =>
                              navigate("/Jobpost/candidates-job/" + row.id)
                            }
                          >
                            <Box display={"flex"} alignItems={"center"}>
                              <LaunchIcon
                                sx={{
                                  mr: 2,
                                  color: "#4B0082",
                                  height: "17px",
                                }}
                              />
                              {row.CandidateDetails}
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Grid
                container
                sx={{
                  height: "68vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {openCommon ? <h1>No Data Found.</h1> : <CircularProgress />}
              </Grid>
            )}
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              my: 1,
              alignItems: "center",
              position:"fixed",
              bottom:1,
              right:40
            }}
          >
            <Grid
              sx={{
                width: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: 1,
              }}
            >
              
              <Typography>Pages</Typography>
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default JobList;
