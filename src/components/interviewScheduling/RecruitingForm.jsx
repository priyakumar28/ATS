import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  FormHelperText,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Modal,
  Box,
} from "@mui/material";
import {
  findCandidate,
  findRoundForApplicant,
  getAssignedJobs,
  getInterviewRounds,
  getInterviewers,
  postInterview,
  postInterviewRound,
} from "../../services/interviewScheduleService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, interviewSchema } from "../validations/createInterview";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../contextProvider/AlertContext";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { addMinutes, format, parse } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTime } from "luxon";

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

const RecruitingForm = () => {
  // const initialTime = dayjs(currentDate);

  const [interviewRounds, setInteviewRounds] = useState([]);
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [roundsPresent, setroundsPresent] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const { setAlert } = useContext(AlertContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const {
    register: modalRegister,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors },
    reset: resetModalForm,
  } = useForm({
    resolver: yupResolver(interviewSchema),
    mode: "all",
  });

  const handleSelectChange = (event, value) => {
    console.log(value, "is the value");
    let values = [...value];
    setValue("interviewerId", values, { shouldValidate: true });
  };
  const [candidate, setcandidate] = useState({ id: 0, name: "", name2: "" });

  let { id } = useParams();

  useEffect(() => {
    findRoundForApplicant(id)
      .then((data) => setroundsPresent(data.value))
      .catch((err) => alert(err.message));
    findCandidate(id)
      .then((data) => {
        setcandidate({
          id: data.applicantDetailsId,
          name: data.firstName,
          name2: data.lastName,
        });
      })
      .catch((err) => alert(err.message));
  }, [id]);

  const [date, setDate] = useState("");

  const onSubmit = async (data) => {
    console.log("called");
    console.log(data, "called");
    const interview = {
      ...data,
      scheduledBy: 1,
      applicantId: candidate.id,
    };
    console.log(interview, "final data");
    setloader(true);
    await postInterview(interview)
      .then((data) =>
        setAlert({
          message: data,
          open: true,
        })
      )
      .then(navigate("/candidate"))
      .catch((err) =>
        setAlert({
          message: err.message,
          open: true,
        })
      );
    setloader(false);
  };

  const onInterviewSubmit = async (data) => {
    console.log("Round Info....", data);
    setloader(true);
    await postInterviewRound(data)
      .then(
        (data) =>
          data.statusCode != "2200" &&
          setAlert({ message: "Round Already Exists....", open: true })
      )
      .then(getInterviewRounds)
      .then((data) => setInteviewRounds(data))
      .then(handleClose);
    setloader(false);
    resetModalForm();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterviewers(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    getInterviewRounds().then((data) => {
      console.log(data, "rounds............!");
      setInteviewRounds(data);
    });
    getAssignedJobs(1).then((data) => {
      console.log(data);
      setAssignedJobs(data);
    });
    getInterviewers(1).then((data) => {
      console.log(data);
      setInterviewers(data);
    });
  }, []);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedStartTime, setSelectedStartTime] = useState(dayjs(new Date()));
  const [selectedEndTime, setSelectedEndTime] = useState(
    addMinutes(new Date(), 30)
  );
  const [initialTime, setInitialTime] = useState();

  const handleStartTime = (time) => {
    console.log(time, "start time .....");
    const formattedTime = dayjs(time);
    const date = new Date(selectedDate);
    date.setHours(formattedTime.hour());
    date.setMinutes(formattedTime.minute());
    setSelectedStartTime(formattedTime);
    setInitialTime(dayjs(formattedTime.add(30, "minute")));
    setValue("startedAt", date, { shouldValidate: true });
    handleEndTime(dayjs(formattedTime).add(30, "minutes").toDate());
    console.log(date);
  };
  const handleEndTime = (time) => {
    console.log(time, "start time .....");
    const formattedTime = dayjs(time);
    const date = new Date(selectedDate);
    date.setHours(formattedTime.hour());
    date.setMinutes(formattedTime.minute());
    setSelectedEndTime(date);
    setValue("endedAt", date, { shouldValidate: true });
    console.log(date);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getCurrentTime = () => {
    return dayjs().toDate();
  };

  const getDefaultEndTime = () => {
    return dayjs().add(30, "minute").toDate();
  };

  return (
    <ThemeProvider theme={theme}>
      {(loader || candidate.name == "") && <Loader />}
      <Grid
        component={"form"}
        p={3}
        borderRadius={15}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          sx={{
            fontSize: {
              xs: "1rem",
              md: "1.4rem",
              lg: "1.7rem",
              xl: "2rem",
            },
          }}
        >
          <Typography variant="h4" color={"black"} fontWeight={700} my={2}>
            Schedule Interview
          </Typography>
          <Grid item display={"flex"}>
            <Grid item px={2}>
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </Grid>

            <Grid item pl={1}>
              <Button
                variant="contained"
                type="submit"
                onClick={() => (
                  console.log("clicked..."), handleSubmit(onSubmit)
                )}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* <Typography variant="h5" sx={{ p: 2, mb: 2 }}>
          Interview information
        </Typography> */}
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Interview Name</InputLabel>
                <Select
                  error={Boolean(errors.interviewRound)}
                  label="Interview Name"
                  required
                  variant="outlined"
                  {...register("interviewRound")}
                >
                  {interviewRounds.map((round) => {
                    const disabledList = roundsPresent.includes(round.id);
                    return (
                      <MenuItem
                        disabled={disabledList}
                        key={round.id}
                        value={round.id}
                      >
                        {round.name}
                      </MenuItem>
                    );
                  })}

                  <Button fullWidth variant="contained" onClick={handleOpen}>
                    ADD ROUND
                  </Button>
                </Select>
                {loader ? (
                  <Loader />
                ) : (
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <form onSubmit={handleModalSubmit(onInterviewSubmit)}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Round Details
                        </Typography>
                        <TextField
                          fullWidth
                          label="Round Name"
                          required
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          helperText={modalErrors.name?.message}
                          error={Boolean(modalErrors.name)}
                          sx={{ my: 3 }}
                          {...modalRegister("name")}
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          required
                          helperText={modalErrors.description?.message}
                          InputLabelProps={{ shrink: true }}
                          variant="outlined"
                          error={Boolean(modalErrors.description)}
                          {...modalRegister("description")}
                        />
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 3 }}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    </Box>
                  </Modal>
                )}
                <FormHelperText>{errors.interviewName?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Candidate Name"
                disabled
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.applicantId)}
                helperText={errors.applicantId?.message}
                required
                defaultValue={candidate.name}
                value={candidate.name + " " + candidate.name2}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Posting Title</InputLabel>
                <Select
                  error={Boolean(errors.jobRecruiterId)}
                  helperText={errors.jobRecruiterId?.message}
                  variant="outlined"
                  label="Posting Title"
                  required
                  {...register("jobRecruiterId")}
                >
                  {assignedJobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="from"
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.from)}
                helperText={errors.from?.message}
                {...register("from")}
                variant="outlined"
                required
                onChange={(e) => setSelectedDate(e.target.value)}
                // {...register("startedAt")}
                fullWidth
                type="date"
                value={selectedDate}
              />
            </Grid>
            <Grid item container xs={6} spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={selectedStartTime}
                    label="Start Time"
                    sx={{ width: "100%" }}
                    onChange={handleStartTime}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        margin="normal"
                        error={Boolean(errors.startedAt)}
                        helperText={errors.startedAt?.message}
                        required
                        fullWidth
                        type="time"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    minTime={initialTime}
                    value={initialTime}
                    defaultValue={dayjs(new Date()).add("30", "minutes")}
                    onChange={handleEndTime}
                    sx={{ width: "100%" }}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        margin="normal"
                        error={Boolean(errors.endedAt)}
                        helperText={errors.endedAt?.message}
                        required
                        fullWidth
                        type="time"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth error={Boolean(errors.interviewers)}>
                <InputLabel id="demo-multiple-checkbox-label">
                  interviewers
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  name="interviewerId"
                  label="interviewers"
                  {...register("interviewerId")}
                  defaultValue={[]}
                >
                  {interviewers.length <= 0 ? (
                    <>
                      <CircularProgress
                        color="warning"
                        sx={{
                          fontSize: "10px",
                          ml: "430px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                    </>
                  ) : (
                    interviewers.map((values) => (
                      <MenuItem
                        key={values.employeeId}
                        value={values.employeeId}
                      >
                        {values.firstName}
                      </MenuItem>
                    ))
                  )}{" "}
                </Select>{" "}
                <FormHelperText>{errors.interviewers?.message}</FormHelperText>{" "}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Mode of interview</InputLabel>
                <Select
                  error={Boolean(errors.mode)}
                  label="Mode of interview"
                  helperText={errors.mode?.message}
                  variant="outlined"
                  required
                  {...register("mode")}
                >
                  <MenuItem value={"ONLINE"}>ONLINE</MenuItem>
                  <MenuItem value={"F2F"}>F2F</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={Boolean(errors.location)}
                helperText={errors.location?.message}
                variant="outlined"
                required
                {...register("location")}
                fullWidth
                label="Location"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.feedback)}
                helperText={errors.feedback?.message}
                variant="outlined"
                required
                {...register("feedback")}
                fullWidth
                label="Schedule Comments"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecruitingForm;
