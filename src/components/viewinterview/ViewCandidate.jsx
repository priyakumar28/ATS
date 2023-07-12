import {
  Button,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Avatar,
  Divider,
  Stack,
  Modal,
  createTheme,
  ThemeProvider,
  tooltipClasses,
  Tooltip,
  Pagination,
  TablePagination,
  Autocomplete,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { viewAllInterviewStatus } from "../../services/ViewProfileServices";
import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircleIcon from "@mui/icons-material/Circle";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import { Route, Routes, useNavigate } from "react-router-dom";
import ViewInterviewerStatus from "./ViewInterviewerStatus";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { viewFile } from "../../services/platformFileUploadService";
import { South } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import dayjs, { Dayjs } from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function createData(
  JobTitle,
  Status,
  JobPostDate,
  ExpiryDate,
  Recruiters,
  NumberOfOpenings,
  PositionFilled,
  CandidateDetails
) {
  return {
    JobTitle,
    Status,
    JobPostDate,
    ExpiryDate,
    Recruiters,
    NumberOfOpenings,
    PositionFilled,
    CandidateDetails,
  };
}

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

const rows = [
  createData(
    "System Admin",
    "In-Progress",
    "06/05/2023",
    "23/06/2023",
    ["Albin", "Gowtham", "Deva"],
    42,
    10,
    "view"
  ),
  createData(
    "System Engineer",
    "In-Progress",
    "06/05/2023",
    "23/06/2023",
    ["Deva", "Albin", "Gowtham"],
    42,
    10,
    "view"
  ),
];
const style = {
  position: "absolute",
  left: "50%",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "100vh",
};

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

const countPerPage = [10, 20, 30];

const ViewCandidate = () => {
  const [candidate, setcandidate] = useState([]);
  const [candidateLimit, setcandidateLimit] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openRender, setOpenRender] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);
  const [openResume, setOpenResume] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [countLimit, setCountLimit] = useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [applicant, setApplicant] = useState({});
  const [render, setRender] = useState(true);
  const [search, setSearch] = useState("");
  const [searchCon, setSearchCon] = useState(false);
  const [localrefresh, setLocalrefresh] = useState(false);
  let [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const navigate = useNavigate();
  const [checkSearch, setCheckSearch] = useState(false);
  const [commonMessage, setCommonMessage] = useState("");
  const [openCommon, setOpenCommon] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [refresh]);

  useEffect(() => {
    console.log(start + " " + end);
    setcandidate(candidate);
  }, [localrefresh]);

  const getData = () => {
    // if (user.role == "hr_manager") {
    let formData = new FormData();
    if (status != "") {
      formData.append("status", status);
    }
    if (startDate != "") {
      formData.append("openDate", startDate);
    }
    setcandidate([]);
    setOpenRender(false);
    setCheckSearch(false);
    setSearch("");
    setOpenCommon(false);
    setCommonMessage("");
    viewAllInterviewStatus(1, formData).then((data) => {
      if (data.statusCode === "2200") {
        setcandidate(data.value);
        setOpenRender(true);
        handleFirstDivide(data.value);
        setcandidateLimit(data.value);
      } else if (data.statusCode === "2152") {
        console.log(data);
        setCommonMessage(data.errors.message);
        setOpenCommon(true);
      }
    });
    // } else {
    //   viewInterviewStatusByRecuriter(id).then(
    //     (data) => (setcandidate(data.value), console.log(data))
    //   );
    // }
  };

  const [localR, setLocalR] = useState(false);
  useEffect(() => {
    handleFirstDivide(candidate);
  }, [localR]);

  const handleSetLimitCandidate = (value) => {
    setCountLimit(value);
    // setRefresh(!refresh);
    setLocalR(!localR);
  };

  const handleSetPage = (value) => {
    setPage(value);
    setLocalR(!localR);
    // setRefresh(!refresh);
  };

  const handleFirstDivide = (candidate) => {
    let count = 1;
    let totalRows = candidate.length;
    console.log(totalRows);
    for (let i = 0; i < totalRows; i++) {
      if (totalRows > countLimit) {
        totalRows = totalRows - countLimit;
        count++;
      }
    }
    setTotalPages(count);
    const end =
      candidate.length > countLimit
        ? page * countLimit - 1
        : candidate.length - 1;
    const start = candidate.length > countLimit ? end - countLimit + 1 : 0;
    setStart(start);
    setEnd(end);

    console.log(count + " " + end + " " + start);
  };
  // let start1 = 0;
  // let end1 = 0;

  // const handleDivide = async () => {
  //   let count = 1;
  //   let totalRows = candidate.length;
  //   for (let i = 0; i < totalRows; i++) {
  //     if (totalRows > countLimit) {
  //       totalRows = totalRows - countLimit;
  //       count++;
  //     }
  //   }
  //   setTotalPages(count);
  //   console.log(countLimit);
  //   // const end1 =
  //   //   candidate.length > countLimit
  //   //     ? page * countLimit - 1
  //   //     : candidate.length - 1;
  //   // const start1 = candidate.length > countLimit ? end - countLimit + 1 : 0;

  //   await setVariable(count).then(
  //     setStart(start1),
  //     setTotalPages(count),
  //     setEnd(end1),
  //     setLocalrefresh(!localrefresh)
  //   );
  //   console.log(count + "count... " + end + "end... " + start + "start...");
  // };

  // const setVariable = (count) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       start1 = (page - 1) * countLimit;
  //       end1 = start + countLimit - 1;
  //       console.log(start + " - " + end);
  //       resolve();
  //     }, 1000);
  //   });
  // };

  const handleStatus = (data) => {
    setStatus(data);
    setRefresh(!refresh);
  };

  const hendleStartDate = (data) => {
    setStartDate(data);
    setRefresh(!refresh);
  };
  const [resumeStatus, setResumeStatus] = useState(false);

  const handleOpenResume = (resume) => {
    console.log(resume);
    setOpenResume("");
    viewFile(resume).then((resp) => {
      if (resp.code == "1300") {
        setResumeStatus(true);
        setOpenResume(resp.value);
        console.log(resp);
      }
    });
    handleOpenModel();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDate = (timeStamp) => {
    // return timeStamp.split("T")[0];
    let date = new Date(timeStamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getTime = (timeStamp) => {
    // return timeStamp.split("T")[0];
    let date = new Date(timeStamp);
    let options = { hour: "numeric", minute: "numeric", hour12: true };
    const formatted = date.toLocaleString("en-IN", options);
    return formatted;
  };

  const handleViewProfile = (applicant) => {
    parseInt(applicant);
    navigate("/applicant-interviews/" + applicant);
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

  const interviewStatus = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "Scheduled";
        break;
      case "CANCELLED":
        return "Cancelled";
        break;
      case "COMPLETED":
        return "Completed";
        break;
      case "RESCHEDULED":
        return "Rescheduled";
        break;
      default:
        return "Not Disclosed";
    }
  };

  const handleSearch = () => {
    if (search != "") {
      let filterTitle = [];
      let filterName = [];
      filterName = candidate.filter((item) =>
        item?.firstName.toLowerCase().includes(search.toLowerCase())
      );
      filterTitle = candidate.filter((item) =>
        item?.jobTitle.toLowerCase().includes(search.toLowerCase())
      );
      let filtered = [...filterName, ...filterTitle];
      setCheckSearch(true);
      setcandidateLimit(filtered);
    }
  };

  const handleTitle = (e) => {
    if (e.target.value == "") {
      setcandidateLimit(candidate);
    }
    setSearch(e.target.value);
  };

  const previousDate = () => {
    console.log(startDate);
    if (startDate != "") {
      let previous = new Date(startDate);
      previous.setDate(previous.getDate() - 1);
      setStartDate(
        `${previous.getFullYear()}-${
          previous.getMonth() + 1
        }-${previous.getDate()}`
      );
      setEndDate(start);
      setRefresh(!refresh);
    }
  };

  const nextDate = () => {
    if (startDate != "") {
      let next = new Date(startDate);
      next.setDate(next.getDate() + 1);
      setEnd(next);
      setStartDate(
        `${next.getFullYear()}-${next.getMonth() + 1}-${next.getDate()}`
      );
      setRefresh(!refresh);
    }
  };

  const showFilter = () => {
    if (status != "" || startDate != "" || (searchCon && search != "")) {
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
            {search != "" && searchCon && (
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
                <Typography color={"white"}>{search}</Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (
                    setSearch(""),
                    setSearchCon(false),
                    setcandidateLimit(candidate)
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
            {startDate != "" && (
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
                <Typography color={"white"}>{startDate}</Typography>
                <CloseIcon
                  fontSize="small"
                  sx={{ color: "white" }}
                  onClick={() => (setStartDate(""), setRefresh(!refresh))}
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
      <Grid container rowSpacing={2} px={5}>
        <Grid item container>
          <Grid
            container
            spacing={2}
            sx={{ mt: 0.3 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
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
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: { sm: "center", md: "start", xs: "center" },
                  }}
                >
                  <Typography variant="h4" fontWeight={700}>
                    Scheduled Interviews
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              sm={12}
              sx={{
                display: "flex",
              }}
            >
              <Grid
                item
                container
                sx={{
                  display: "flex",
                  justifyContent: { md: "flex-end", sm: "center" },
                  alignItems: "center",
                }}
              >
                <CustomTooltip
                  title="Schedule Interview"
                  placement="bottom"
                  arrow
                  disableInteractive
                >
                  <IconButton
                    sx={{ color: "#4b0082" }}
                    onClick={() => navigate("/candidate")}
                  >
                    <AddCircleOutlineIcon fontSize="large" />
                  </IconButton>
                </CustomTooltip>
                <Grid>
                  <TextField
                    placeholder="search"
                    id="search"
                    value={search}
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
                </Grid>
                <FormControl>
                  <Button
                    variant="contained"
                    sx={{
                      height: "40px",
                      backgroundColor: "#4B0082",
                      fontSize: "14px",
                      borderRadius: "8px",
                      width: "110px",
                      ml: 1,
                    }}
                    endIcon={<FilterAltIcon sx={{ color: "white", mx: 1 }} />}
                    onClick={(e) => (
                      setSearch(""), setSearchCon(false), handleClick(e)
                    )}
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
                      onClick={() => (handleClose(), handleStatus("SCHEDULED"))}
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
                      SCHEDULED
                    </MenuItem>
                    <MenuItem
                      onClick={() => (handleClose(), handleStatus("COMPLETED"))}
                      disableRipple
                    >
                      <CircleIcon
                        sx={{
                          mr: 1,
                          color: "green",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      COMPLETED
                    </MenuItem>
                    <MenuItem
                      onClick={() => (handleClose(), handleStatus("CANCELLED"))}
                      disableRipple
                    >
                      <CircleIcon
                        sx={{
                          mr: 1,
                          color: "#E83E09",
                          width: "15px",
                          height: "15px",
                        }}
                      />
                      CANCELLED
                    </MenuItem>
                    <MenuItem
                      onClick={() => (
                        handleClose(), handleStatus("RESCHEDULED")
                      )}
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
                      RESCHEDULED
                    </MenuItem>
                  </StyledMenu>
                </FormControl>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mx: 1,
                    alignItems: "center",
                  }}
                >
                  {startDate != "" && (
                    <Tooltip
                      title={<Typography color="inherit">Previous</Typography>}
                      followCursor
                    >
                      <ArrowBackIosNewIcon
                        color="primary"
                        sx={{ fontSize: 25, mx: 1 }}
                        onClick={() => previousDate()}
                      />
                    </Tooltip>
                  )}
<LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(startDate)}
                    onChange={(e) =>  (console.log(e,"date......"),hendleStartDate(e.$d.getDate))}
                    renderInput={(props) => {
                      <TextField
                      {...props}
                        id="outlined-basic"
                        InputProps={{
                          style: {
                            fontSize: "14px",
                            padding: "10px",
                            height: "40px",
                            color: "white",
                            border: "1px solid white",
                          },
                        }}
                        value={dayjs(startDate)}
                        onChange={(e) => hendleStartDate(e.target.value)}
                        sx={{
                          backgroundColor: "#4B0082",
                          borderRadius: "7px",
                          mx: 1,
                        }}
                        type="date"
                        variant="outlined"
                      />;
                    }}
                  />
                  </LocalizationProvider>
                  {startDate != "" && (
                    <Tooltip
                      title={<Typography color="inherit">Next</Typography>}
                      followCursor
                    >
                      <ArrowForwardIosIcon
                        color="primary"
                        sx={{ m: 0, fontSize: 25, mx: 1 }}
                        onClick={() => nextDate()}
                      />
                    </Tooltip>
                  )}
                  {/* <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>To</Typography>
                  </Grid>
                  <TextField
                    id="outlined-basic"
                    InputProps={{
                      style: {
                        fontSize: "14px",
                        padding: "10px",
                        height: "40px",
                        color: "white",
                        border: "1px solid white",
                      },
                    }}
                    onChange={(e) => (
                      hendleEndDate(e.target.value),
                      setSearch(""),
                      setSearchCon(false)
                    )}
                    sx={{
                      backgroundColor: "#4B0082",
                      borderRadius: "8px",
                      mx: 1,
                    }}
                    type="date"
                    variant="outlined"
                  /> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            height: "75vh",
            my: 1,
          }}
        >
          <Grid item container xs={12} sx={{ pr: "5%" }}>
            {showFilter()}
          </Grid>

          <Grid
            item
            container
            sx={{
              height: "58vh",
              overflow: "auto",
              mt: "5px",
            }}
          >
            {openRender ? (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Appliacant Name
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Job title
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Round Name
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Interview Date
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Interview Time
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
                        Owner
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Interviewers
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Resume
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{ fontSize: "14px", fontWeight: "700" }}
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {candidateLimit
                      ?.filter(
                        (c, i) => (i >= start && i <= end) || checkSearch
                      )
                      .map((row) => (
                        <StyledTableRow key={row?.interviewId}>
                          <StyledTableCell
                            onClick={() =>
                              handleViewProfile(parseInt(row.applicantId))
                            }
                            component="th"
                            scope="row"
                          >
                            {row?.firstName} {row?.lastName}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Typography>{row?.jobTitle}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.roundName}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {getDate(row?.interviewDate)}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {getTime(row?.interviewDate)}
                          </StyledTableCell>
                          <StyledTableCell align="left">
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
                                    row?.interviewStatus
                                  ),
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                              <Typography>
                                {interviewStatus(row?.interviewStatus)}
                              </Typography>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Grid sx={{ display: "flex", ml: 1 }}>
                              <HtmlTooltip
                                title={
                                  <Typography color="inherit">
                                    {row?.recuriterId?.firstName}{" "}
                                    {row?.recuriterId?.lastName}
                                  </Typography>
                                }
                                followCursor
                              >
                                <Avatar
                                  {...stringAvatar(row?.recuriterId?.firstName)}
                                />
                              </HtmlTooltip>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Stack
                              sx={{ display: "flex", ml: 2 }}
                              direction="row"
                              spacing={-1}
                            >
                              {row?.panel?.map((recruiter) => (
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
                          <StyledTableCell align="left">
                            <Box
                              display={"flex"}
                              onClick={() => handleOpenResume(row.resumePath)}
                              alignItems={"center"}
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
                          <StyledTableCell align="center">
                            <Grid
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                sx={{ mx: 1 }}
                              >
                                <EditIcon
                                  sx={{
                                    mr: 1,
                                    color: "#4B0082",
                                    height: "17px",
                                    fontSize: 20,
                                  }}
                                />
                                Edit
                              </Box>
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                sx={{ mx: 1 }}
                              >
                                <DeleteForeverIcon
                                  sx={{
                                    mr: 1,
                                    color: "#4B0082",
                                    height: "17px",
                                  }}
                                />
                                Delete
                              </Box>
                            </Grid>
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
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {candidate.length <= 0 && (
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h1>{commonMessage}</h1>
                  </Grid>
                )}
                {!openCommon && <CircularProgress />}
              </Grid>
            )}
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              my: 2,
              alignItems: "center",
              position: "fixed",
              bottom: 3,
              right: 35,
              backgroundColor: "white",
              height: "27px",
            }}
          >
            <Grid
              sx={{
                width: "130px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mx: 1,
              }}
            >
              <Autocomplete
                disablePortal
                options={countPerPage}
                value={countLimit}
                getOptionLabel={(option) => String(option) || ""}
                onChange={(e, value) => handleSetLimitCandidate(value)}
                sx={{ width: 50 }}
                size="small"
                label=""
                renderInput={(params) => <TextField {...params} />}
                clearIcon={<Grid sx={{ display: "none" }} />}
              />
              <Typography sx={{ pl: 2 }}>Pages</Typography>
            </Grid>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => handleSetPage(value)}
              color="primary"
            />
          </Grid>
        </Grid>

        <Modal
          open={openModel}
          onClose={() => (handleCloseModel(), setResumeStatus(false))}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {resumeStatus ? (
            <Box sx={style}>
              <iframe src={openResume} height={"100%"} width={"100%"}></iframe>
            </Box>
          ) : (
            <Grid sx={style}>
              <Typography>Resume Not Found</Typography>
            </Grid>
          )}
        </Modal>

        <Routes>
          <Route
            path="/candidate-details"
            element={<ViewInterviewerStatus interview={applicant} />}
          />
        </Routes>
      </Grid>
    </ThemeProvider>
  );
};

export default ViewCandidate;
