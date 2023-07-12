import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Alert,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useFileUpload } from "../../hooks/FileUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import {
  addCandidate,
  getCandidate,
  getCan,
  deleteApplicant,
} from "../../services/CandidateService";
import { useNavigate } from "react-router-dom";
import { Alarm } from "@mui/icons-material";
import AlertContext from "../contextProvider/AlertContext";
import Loader from "../Loader/Loader";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required").min(1).max(25),
    lastName: yup.string().required("last name is required").min(1).max(25),
    dateOfBirth: yup.string().required("DOB is required"),
    gender: yup.string().required("Gender is required"),
    maritalStatus: yup.string().required("marital status is required"),
    contactNo: yup.string().min(10).required(),
    email: yup.string().required("Email id is Required"),
    // currentCtc: yup.string().required("current ctc is required"),
    expectedCtc: yup.string().required("Expected ctc is required"),
    // reasonForChange: yup.string().required("reason is required"),
    doorNo: yup.string().required("Door Number is Required"),
    pinCode: yup.string().required("Pin code is Required"),
    street: yup.string().required("Street Name is Mandatory"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City Name is Required"),
    country: yup.string().required("Country is Required"),
    // contactNumber1: yup
    //   .string()
    //   .required("contact  number is mandatory")
    //   .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter a valid mobile number")
    //   .min(13)
    //   .trim(),
    // instituteOrSchoolName: yup.string().required("Institute name is Required"),
    // degree: yup.string().required("degree is required"),
    // currentCompany: yup.string().required("degree is required"),
    // department: yup.string().required("department is required"),
    // yearOfPassing: yup.string().required("Door Number is Required"),
    // occupationName: yup.string().required("position is req"),
    // companyName: yup.string().required("company is req"),
    // summary: yup.string().required("summary is req"),
    yearOfExperience1: yup.number().required("year of passing is required"),
    // yearOfExperience: yup.number().required("year of passing is required"),
    // source: yup.string().required("summary is req"),
    // skill : yup.number()
  })

  .required();

const AddCandidate = (props) => {
  // const useHistory=useHistory();

  const {setAlert} = useContext(AlertContext);
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);
  const [data, setData] = useState(false);
  const [education, setEducation] = useState([{
      applicantEducationalDetailsId: 0,
      instituteOrSchoolName: "",
      department: "",
      degree: "",
      yearOfPassing: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      applicantExpDetailsId: 0,
      occupationName: "",
      companyName: "",
      summary: "",
      yearOfExperience: "",
    },
  ]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: props.basicDetail.firstName,
      middleName: props.basicDetail.middleName,
      lastName: props.basicDetail.lastName,
      contactNo: props.basicDetail.contactNo,
      email: props.basicDetail.email,
    },
  });

  const {
    handleFileUpload,
    ifUploadingFailed,
    setFileName,
    uploadMessage,
    uploadedFilePath,
    filename,
  } = useFileUpload();
  const [resume, setResume] = useState("");
  // const[exists,setExist] = useState();
  const onSubmit = async (data) => {
    setLoader(true);
    let candidates = {
      // firstName: data.firstName,
      // middleName: data.middleName,
      // lastName: data.lastName,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      contactNo: data.contactNo,
      contactNo1: data.contactNumber1,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      source: data.source,
      currentCtc: data.currentCtc,
      expectedCtc: data.expectedCtc,
      reasonForChange: data.reasonForChange,
      currentCompany: data.currentCompany,
      yearOfExperience: data.yearOfExperience1,
      holdingOffer: data.holdingOffer,
      // applicantStatus: "ACCEPTED",
      currentAddress: {
        addressId: 0,
        doorNo: data.doorNo,
        pinCode: data.pinCode,
        street: data.street,
        state: data.state,
        city: data.city,
        country: data.country,
      },
      applicantExperienceDetailses: experience,
      // [
      //   {
      //     applicantExpDetailsId: 0,
      //     occupationName: data.occupationName,
      //     companyName: data.companyName,
      //     summary: data.summary,
      //     yearOfExperience: data.yearOfExperience,
      //   },
      // ],
      applicantEducationalDetailses: education,
      //  [
      // {
      //   applicantEducationalDetailsId: 0,
      //   instituteOrSchoolName: data.instituteOrSchoolName,
      //   department: data.department,
      //   degree: data.degree,
      //   yearOfPassing: data.yearOfPassing,
      // },
      // ],
      resumePath: resume,
      addedBy: 1,
      skill: data.skill,
      jobRecruiterId: 100,
    };
    addCandidate(candidates)
      .then((data) => {
        setAlert({
          message : "Applicant added successfully",
          open : true
        })
        setLoader(false);
        navigate("/candidate");
        return getCandidate();
      })
      .then((data) => {
        props.setCandidate(data);
      });
  };
  const [openMessage, setOpenMessage] = useState(false);

  const [verify, setVerify] = useState();
  const handleFunction = () => {
    // deleteApplicant(props.basicDetail.contactNo);
    navigate("/candidate");
  };
  const [message, setMessage] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [open, setOpen] = useState(false);
  const [checkResume, setCheckResume] = useState(false);

  useEffect(() => {
    console.log(uploadedFilePath.fileName);
    setResume(uploadedFilePath.fileName);
    setResumePath(uploadedFilePath.filePath);
    console.log(uploadedFilePath.filePath);
    console.log(resumePath);
    console.log(resume);
  }, [uploadedFilePath]);

  useEffect(() => {
    if (uploadMessage.length > 0) {
      setMessage(uploadMessage);
      setAlert({
        message : "Resume Uploaded Successfully",
        open : true
      })
      setOpen(true);
      setCheckResume(true);
      // window.alert(uploadMessage);
    }
  }, [uploadMessage]);

  const handleFileUploadSubmit = (e) => {
    handleFileUpload(e);
  };

  const addRow = () => {
    setEducation([
      ...education,
      {
        applicantEducationalDetailsId: 0,
        instituteOrSchoolName: "",
        department: "",
        degree: "",
        yearOfPassing: "",
      },
    ]);
  };

  const openFileRef = useRef(null);

  const deleteRow = (index) => {
    const rows = [...education];
    rows.splice(index, 1);
    setEducation(rows);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...education];
    list[index][name] = value;
    setEducation(list);
  };

  const addRow1 = () => {
    console.log("hello");
    setExperience([
      ...experience,
      {
        applicantExpDetailsId: 0,
        occupationName: "",
        companyName: "",
        summary: "",
        yearOfExperience: "",
      },
    ]);
  };

  const deleteRow1 = (index) => {
    const rows = [...experience];
    rows.splice(index, 1);
    setExperience(rows);
  };

  const handleChange12 = (e, index) => {
    const { name, value } = e.target;
    const list = [...experience];
    list[index][name] = value;
    setExperience(list);
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)} mt={4}>
      {loader && <Loader />}
      <Grid Container>
        <Grid item display={"flex"} justifyContent={"center"}></Grid>
        <Grid item mx={2}>
          <Typography fontSize={{ lg: "1.8rem", xs: 20 }} fontWeight="bold">
            Add Applicant
          </Typography>
        </Grid>
        <Grid item mt={3}>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.firstName)}
                variant="outlined"
                label="First Name"
                name="firstName"
                {...register("firstName")}
                onChange={(e) => setFileName(`${e.target.value}`)}
                helperText={errors.firstName?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.code)}
                variant="outlined"
                label="Middle Name"
                name="middleName"
                {...register("middleName")}
                helperText={errors.middleName?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                variant="outlined"
                error={Boolean(errors.lastName)}
                label="Last Name"
                name="lastName"
                {...register("lastName", { required: true })}
                helperText={errors.lastName?.message}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
            mt={2}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  {...register("gender")}
                  onChange={(e) => setValue("gender", e.target.value)}
                  name="gender"
                  helperText={errors.gender?.message}
                  error={Boolean(errors.gender)}
                  required
                >
                  <MenuItem value={"MALE"}>Male</MenuItem>
                  <MenuItem value={"FEMALE"}>Female</MenuItem>
                  <MenuItem value={"OTHERS"}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl fullWidth>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // sx={{ width: "235px" }}
                  label="Date Of Birth"
                  type={"date"}
                  name="dateOfBirth"
                  error={Boolean(errors.dateOfBirth)}
                  {...register("dateOfBirth")}
                  helperText={errors.dateOfBirth?.message}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl fullWidth>
                <InputLabel>Martial Status</InputLabel>
                <Select
                  {...register("maritalStatus")}
                  onChange={(e) => setValue("maritalStatus", e.target.value)}
                  name="maritalStatus"
                  helperText={errors.maritalStatus?.message}
                  error={Boolean(errors.maritalStatus)}
                  required
                >
                  <MenuItem value={"MARRIED"}>Married</MenuItem>
                  <MenuItem value={"UNMARRIED"}>UnMarried</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
            mt={2}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.email)}
                variant="outlined"
                label="email"
                name="email"
                {...register("email")}
                helperText={errors.email?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.contactNo)}
                variant="outlined"
                label="Contact Number"
                name="contactNo"
                {...register("contactNo")}
                helperText={errors.contactNo?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.source)}
                variant="outlined"
                label="Source"
                name="source"
                {...register("source")}
                helperText={errors.source?.message}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
            mt={2}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.currentCompany)}
                variant="outlined"
                label="Previous company"
                name="currentCompany"
                {...register("currentCompany")}
                helperText={errors.currentCompany?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                // error={Boolean(errors.expectedCtc)}
                variant="outlined"
                label="Current ctc"
                name="currentCtc"
                {...register("currentCtc")}
                // helperText={errors.currentCtc?.message}
                fullWidth
              />
            </Grid>

            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.expectedCtc)}
                variant="outlined"
                label="Expected ctc"
                name="expectedCtc"
                {...register("expectedCtc")}
                helperText={errors.expectedCtc?.message}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
            mt={2}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                // error={Boolean(errors.reasonForChange)}
                variant="outlined"
                label="Reference person name"
                name="reasonForChange"
                {...register("reasonForChange")}
                // helperText={errors.reasonForChange?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.contactNumber1)}
                variant="outlined"
                label="Reference Person Contact Number"
                name="contactNumber1"
                {...register("contactNumber1")}
                helperText={errors.contactNumber1?.message}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                // error={Boolean(errors.reasonForChange)}
                variant="outlined"
                label="Reason for change"
                name="reasonForChange"
                {...register("reasonForChange")}
                // helperText={errors.reasonForChange?.message}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"row"}
            spacing={2}
            lg={12}
            md={9}
            sm={12}
            xs={12}
            mt={2}
          >
            <Grid item lg={3} md={3} sm={10} xs={10}>
              {/* <FormControl fullWidth>
                <InputLabel>Experience</InputLabel>
                <Select
                  {...register("yearOfExperience1")}
                  onChange={(e) =>
                    setValue("yearOfExperience1", e.target.value)
                  }
                  name="yearOfExperience1"
                  helperText={errors.yearOfExperience1?.message}
                  error={Boolean(errors.yearOfExperience1)}
                >
                  <MenuItem value={"ZERO"}>Fresher</MenuItem>
                  <MenuItem value={"ONE"}>1 year</MenuItem>
                  <MenuItem value={"TWO"}>2 years</MenuItem>
                  <MenuItem value={"THREE"}>3 years</MenuItem>
                  <MenuItem value={"ABOVETHREE"}>Above 3 Years</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl sx={{ rowGap: 3 }} fullWidth>
                <TextField
                  error={Boolean(errors.yearOfExperience1)}
                  variant="outlined"
                  label="No of years worked"
                  type={"number"}
                  name="yearOfExperience1"
                  {...register("yearOfExperience1")}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                id=""
                label="Upload Resume"
                type="file"
                name="resumePath"
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.resumePath)}
                helperText={errors.resumePath?.message}
                fullWidth
                onChange={(e) => handleFileUploadSubmit(e)}
                required
              />
              {checkResume && (
                <Button onClick={() => openFileRef.current.click()}>
                  preview
                </Button>
              )}

              <a href={resumePath} hidden target="_blank" ref={openFileRef} />
              {/* {resume} */}
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              {/* <FormControl fullWidth>
                <InputLabel>Select Options</InputLabel>
                <Select
                  multiple
                  inputProps={register("skill")}
                  renderValue={(selected) => selected.join(", ")}
                  defaultValue={[]}
                >
                  <MenuItem value={1}>Option 1</MenuItem>
                  <MenuItem value={2}>Option 2</MenuItem>
                  <MenuItem value={3}>Option 3</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl fullWidth>
                <InputLabel>Skill</InputLabel>
                <Select
                  {...register("skill")}
                  onChange={(e) => setValue("skill", e.target.value)}
                  name="skill"
                  // helperText={errors.gender?.message}
                  // error={Boolean(errors.gender)}
                  multiple
                  defaultValue={[]}
                  required
                >
                  <MenuItem value={1}>JAVA</MenuItem>
                  <MenuItem value={2}>Java Script</MenuItem>
                  <MenuItem value={3}>Python</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={8} md={3} sm={10} xs={10}>
              <FormControl required>
                <FormLabel>Currently Holding any offer</FormLabel>
                <RadioGroup
                  onChange={(e) => setValue("holdingOffer", e.target.value)}
                  name="holdingOffer"
                  helperText={errors.holdingOffer?.message}
                  error={Boolean(errors.holdingOffer)}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="NO"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container display={"flex"}>
        <Grid item>
          <Typography variant="h6" fontWeight={"bold"} px={2} py={0.3}>
            Education Details
          </Typography>
        </Grid>
        {education.length <= 2 && (
          <Grid item>
            <IconButton onClick={addRow}>
              <AddIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {education.map((data, index) => (
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          columnGap={3}
          rowGap={3}
          mt={2}
        >
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                required
                variant="outlined"
                label="Institute/School"
                name="instituteOrSchoolName"
                value={data.instituteOrSchoolName}
                onChange={(e) => handleChange(e, index)}
              />
            </FormControl>
          </Grid>

          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                required
                variant="outlined"
                label="Degree"
                name="degree"
                value={data.degree}
                onChange={(e) => handleChange(e, index)}
              />
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                required
                value={data.department}
                variant="outlined"
                label="Department"
                name="department"
                onChange={(e) => {
                  handleChange(e, index);
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            justifyContent={"flex-start"}
            columnGap={2}
            rowGap={2}
            lg={9.4}
          >
            <Grid item lg={3.8} mx={1} display={"flex"} flexDirection={"row"}>
              <FormControl fullWidth required>
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // sx={{ width: "235px" }}
                  label="Year of passing"
                  type={"date"}
                  name="yearOfPassing"
                  value={data.yearOfPassing}
                  onChange={(e) => {
                    handleChange(e, index);
                  }}
                />
              </FormControl>
            </Grid>

            {education.length > 1 && (
              <Grid item>
                {" "}
                <IconButton onClick={() => deleteRow(index)}>
                  <CloseIcon />
                </IconButton>{" "}
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}

      <Grid item container display={"flex"}>
        <Grid item>
          <Typography variant="h6" fontWeight={"bold"} px={2} py={0.3}>
            Experience Details
          </Typography>
        </Grid>
        {experience.length <= 2 && (
          <Grid item>
            <IconButton onClick={addRow1}>
              <AddIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
      {experience.map((data, index) => (
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          columnGap={2}
          rowGap={3}
          mt={2}
        >
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                variant="outlined"
                label="occupationName"
                name="occupationName"
                value={data.occupationName}
                onChange={(e) => {
                  handleChange12(e, index);
                }}
              />
            </FormControl>
          </Grid>

          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                error={Boolean(errors.company)}
                variant="outlined"
                label="Company"
                name="companyName"
                value={data.companyName}
                onChange={(e) => {
                  handleChange12(e, index);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                error={Boolean(errors.summary)}
                variant="outlined"
                label="Summary"
                name="summary"
                value={data.summary}
                onChange={(e) => {
                  handleChange12(e, index);
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            container
            justifyContent={"flex-start"}
            columnGap={2}
            rowGap={3}
            lg={9.3}
          >
            <Grid item lg={3.9} mx={1} display={"flex"} flexDirection={"row"}>
              <FormControl sx={{ rowGap: 3 }} fullWidth>
                <TextField
                  // error={Boolean(errors.yearOfExperience)}
                  variant="outlined"
                  label="No of years worked"
                  type={"number"}
                  name="yearOfExperience"
                  // helperText={errors.yearOfExperience?.message}

                  value={data.yearOfExperience}
                  onChange={(e) => {
                    handleChange12(e, index);
                  }}
                />
              </FormControl>
            </Grid>
            {experience.length > 1 && (
              <Grid item>
                {" "}
                <IconButton onClick={() => deleteRow1(index)}>
                  <CloseIcon />
                </IconButton>{" "}
              </Grid>
            )}
          </Grid>
        </Grid>
      ))}

      <Typography fontWeight={"bold"} variant="h6" mt={5} mb={2} mx={2}>
        Address
      </Typography>
      <Grid container>
        <Grid
          item
          container
          display={"flex"}
          justifyContent={"center"}
          columnGap={4}
          rowSpacing={2}
        >
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth required>
              <TextField
                variant="outlined"
                size="small"
                label="door no"
                name="doorNo"
                error={Boolean(errors.doorNo)}
                {...register("doorNo")}
                helperText={errors.doorNo?.message}
                required
              />
              <TextField
                variant="outlined"
                size="small"
                label="street"
                {...register("street")}
                name="street"
                error={Boolean(errors.street)}
                helperText={errors.street?.message}
                required
              />
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                variant="outlined"
                size="small"
                label="city"
                {...register("city")}
                name="city"
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                size="small"
                label="state"
                {...register("state")}
                name="state"
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
                fullWidth
                required
              />
            </FormControl>
          </Grid>
          <Grid item lg={3}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                variant="outlined"
                size="small"
                label="country"
                {...register("country")}
                name="country"
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                size="small"
                {...register("pinCode")}
                name="pinCode"
                label="pinCode"
                error={Boolean(errors.pinCode)}
                helperText={errors.pinCode?.message}
                fullWidth
                required
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Grid sx={{ mt: 3, mb: 4, marginRight: "20px" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!checkResume}
            sx={{ backgroundColor: "green", textTransform: "none" }}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid sx={{ mt: 3, mb: 4 }}>
          <Button variant="outlined" color="error" onClick={handleFunction}>
            CANCEL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddCandidate;
