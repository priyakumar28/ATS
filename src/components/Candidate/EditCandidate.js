import React, { useEffect, useState,useContext } from "react";
import {
  Alert,
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
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";
// import {
//   addTenantemployee,
//   getTenant,
// } from "../services/TenantEmployeeOnboardingService";
// import { useFileUpload } from "../hooks/FileUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  addCandidate,
  getCandidate,
  updateCandidate,
  updateCandidateBasic,
} from "../../services/CandidateService";
import { useNavigate } from "react-router-dom";
import { useFileUpdate } from "../../hooks/FileUpload";
import AlertContext from "../contextProvider/AlertContext";


const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required").min(1).max(25),
    // middleName: yup.string().required("middlename is req"),
    lastName: yup.string().required("last name is required").min(1).max(25),
    dateOfBirth: yup.string().required("DOB is required"),
    gender: yup.string().required("Gender is required"),
    maritalStatus: yup.string().required("marital status is required"),
    contactNo: yup
    .string()
    .required("contact  number is mandatory")
    // .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter a valid mobile number")
    .min(10)
    .trim(),
    email: yup.string().required("Email id is Required"),
    // currentCtc: yup.string().required("current ctc is required"),
    expectedCtc: yup.string().required("Expected ctc is required"),
    // reasonForChange: yup.string().required("reason is required"),
    // doorNo: yup.string().required("Door Number is Required"),
    // pinCode: yup.string().required("Pin code is Required"),
    // street: yup.string().required("Street Name is Mandatory"),
    // state: yup.string().required("State is Required"),
    // city: yup.string().required("City Name is Required"),
    // country: yup.string().required("Country is Required"),
    // contactNumber1: yup
    //   .string()
    //   .required("contact  number is mandatory")
    //   .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter a valid mobile number")
    //   .min(13)
    //   .trim(),
    // instituteOrSchoolName: yup.string().required("Institute name is Required"),
    // degree: yup.string().required("degree is required"),
    // department: yup.string().required("department is required"),
    // yearOfPassing: yup.string().required("Door Number is Required"),
    // occupationName: yup.string().required("position is req"),
    // companyName: yup.string().required("company is req"),
    // summary: yup.string().required("summary is req"),
    // yearOfExperience1: yup.string().required("year of passing is required"),
    // yearOfExperience: yup.number().required("year of passing is required"),
    // source: yup.string().required("summary is req"),
  })

  .required();

const EditCandidate = ({ canditateData, setCandidate }) => {
  const navigate = useNavigate();
  const {setAlert} = useContext(AlertContext);

  // ({
  //   setStep,
  //   employeeData,
  //   setEmployeeData,
  //   setAdd,
  //   add,
  //   handleClose,
  //   setTimeLoader,
  //   tenantData,
  //   branchData,
  //   tenantDetails,
  //   setbranchData,
  //   setTenantdata,
  //   setAlert,
  //   setTenant,
  // }) => {
  // const {
  //   handleFileUpload,
  //   ifUploadingFailed,
  //   setFileName,
  //   uploadMessage,
  //   uploadedFilePath,
  // } = useFileUpload();

  // useEffect(() => {
  //   if (uploadedFilePath !== "") {
  //     if (uploadSelect === "aadhar") {
  //       setAadhar(uploadedFilePath.filePath);
  //       setAdharFile(uploadedFilePath.filename);
  //       console.log(uploadedFilePath.filename);
  //     } else if (uploadSelect === "pan") {
  //       setPan(uploadedFilePath.filePath);
  //       setPanFile(uploadedFilePath.filename);
  //       console.log(uploadedFilePath.filename);
  //     }
  //   }
  // }, [uploadedFilePath]);
  const [data, setData] = useState(false);
  const {
    handleFileUpdate,
    ifUploadingFailed,
    setFilePath,
    updateMessage,
    updateProcess,
  } = useFileUpdate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: canditateData.firstName,
      middleName: canditateData.middleName,
      lastName: canditateData.lastName,
      gender: canditateData.gender,
      maritalStatus: canditateData.maritalStatus,
      contactNo: canditateData.contactNo,
      email: canditateData.email,
      dateOfBirth: canditateData.dateOfBirth,
      source: canditateData.source,
      currentCtc: canditateData.currentCtc,
      expectedCtc: canditateData.expectedCtc,
      reasonForChange: canditateData.reasonForChange,
      currentCompany: canditateData.currentCompany,
      yearOfExperience: canditateData.yearOfExperience,
      holdingOffer: canditateData.holdingOffer,
      applicantStatus: canditateData.applicantStatus,
      doorNo: canditateData.doorNo,
      pinCode: canditateData.pinCode,
      street: canditateData.street,
      state: canditateData.state,
      city: canditateData.city,
      country: canditateData.country,
      // occupationName: canditateData.applicantExperienceDetailses.occupationName,
      // companyName: canditateData.applicantExperienceDetailses.companyName,
      // summary: canditateData.applicantExperienceDetailses.summary,
      // yearOfExperience:
      //   canditateData.applicantExperienceDetailses.yearOfExperience,
      // instituteOrSchoolName: canditateData.instituteOrSchoolName,
      // department: canditateData.applicantEducationalDetailses.department,
      // degree: canditateData.applicantEducationalDetailses.degree,
      // yearOfPassing: canditateData.applicantEducationalDetailses.yearOfPassing,
      resumePath: canditateData.resumePath,
      skill: canditateData.skill,
    },
  });
  const [resume, setResume] = useState();
  const [loader,setLoader] = useState(false);

  const onSubmit = async (data) => {
    setLoader(true);
    let candidates = {
      applicantDetailsId: canditateData.applicantDetailsId,
      dateOfBirth: data.dateOfBirth,
      // addedBy: canditateDa,
      addedAt: canditateData.addedAt,
      currentCtc: data.currentCtc,
      expectedCtc: data.expectedCtc,
      reasonForChange: data.reasonForChange,
      holdingOffer: data.holdingOffer,
      currentCompany: data.currentCompany,
      maritalStatus: data.maritalStatus,
        addressId: canditateData.addressId,
        doorNo: data.doorNo,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pinCode: data.pinCode,
      resumePath: canditateData.resumePath,
      source: data.source,
      // referenceBy: ,
      gender: data.gender,
      yearOfExperience: data.yearOfExperience,
      // jobRecruiterId: canditateData.jobRecruiterId.id,
      skill: data.skill,
      applicantResponseId:
        canditateData.applicantResponseId,
    };
    let applicantBasic = {
      applicantId: canditateData.applicantId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      contactNo: data.contactNo,
      email: data.email,
      applicantStatus: data.applicantStatus,
      applicantFlag:"true"
      // applicantFlag:true
    };
    console.log(applicantBasic, ">>>>>>>>>>>>>>>>>");
    updateCandidateBasic(applicantBasic);
    console.log(candidates, "emppppppppppppppppppppp");
    updateCandidate(candidates)
      .then((data) => {
        setAlert({
          message : "Applicant updated successfully",
          open : true
        })
        setLoader(false);
        navigate("/candidate");
        return getCandidate();
      })
      .then((data) => {
        setCandidate(data);
      });

    // console.log(data, "before employee adding");

  };

  const handleFunction = () => {
    navigate("/Dashboard/Candidates");
  };

  useEffect(() => {
    if (canditateData.resumePath.length > 0) {
      setFilePath(canditateData.resumePath);
    }
  }, []);
  const [messeage, setMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  useEffect(() => {
    console.log(updateMessage);
    if (updateMessage != "Uploading...") {
      setMessage(updateMessage);
      setOpenMessage(true);
    }
  }, [updateMessage]);

  const updateResume = (e) => {
    handleFileUpdate(e);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)} mt={10}>
      {openMessage && (
        <Alert onClose={() => setOpenMessage(false)}>{messeage}</Alert>
      )}
      {loader && <Loader />}
      <Grid Container>
        <Grid item mx={2}>
          <Typography fontSize={{ lg: "1.8rem", xs: 20 }} fontWeight="bold">
            Update Canditate Details
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
                required
                variant="outlined"
                label="First Name"
                name="firstName"
                {...register("firstName")}
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
                // onChange={(e) => setFileName(`${e.target.value}`)}
                fullWidth
              />
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                variant="outlined"
                required
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
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  {...register("gender")}
                  onChange={(e) => setValue("gender", e.target.value)}
                  name="gender"
                  helperText={errors.gender?.message}
                  error={Boolean(errors.gender)}
                  defaultValue={canditateData.gender}
                >
                  <MenuItem value={"MALE"}>Male</MenuItem>
                  <MenuItem value={"FEMALE"}>Female</MenuItem>
                  <MenuItem value={"OTHERS"}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              {/* <FormControl fullWidth>
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
                />
              </FormControl> */}
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
                  defaultValue={canditateData.dateOfBirth}
                />
                {/* {canditateData.dateOfBirth} */}
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl fullWidth required>
                <InputLabel>Martial Status</InputLabel>
                <Select
                  {...register("maritalStatus")}
                  onChange={(e) => setValue("maritalStatus", e.target.value)}
                  name="maritalStatus"
                  helperText={errors.maritalStatus?.message}
                  error={Boolean(errors.maritalStatus)}
                  required
                  defaultValue={canditateData.maritalStatus}
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
                required
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
                required
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
                error={Boolean(errors.expectedCtc)}
                variant="outlined"
                label="Current ctc"
                name="currentCtc"
                {...register("currentCtc")}
                helperText={errors.currentCtc?.message}
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
                error={Boolean(errors.reasonForChange)}
                variant="outlined"
                label="Reason for change"
                name="reasonForChange"
                {...register("reasonForChange")}
                helperText={errors.reasonForChange?.message}
                fullWidth
              />
            </Grid>
            {/* <Grid item lg={3} md={3} sm={10} xs={10}>
              <TextField
                error={Boolean(errors.contactNumber1)}
                variant="outlined"
                label="Reference Person Contact Number"
                name="contactNumber1"
                {...register("contactNumber1")}
                helperText={errors.contactNumber1?.message}
                fullWidth
              />
            </Grid> */}
                <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl sx={{ rowGap: 3 }} fullWidth>
                <TextField
                  // error={Boolean(errors.yearOfExperience)}
                  variant="outlined"
                  label="No of years worked"
                  type={"text"}
                  name="yearOfExperience"
                  {...register("yearOfExperience")}
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
                onChange={(e) => updateResume(e)}
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
              <FormControl fullWidth required>
                <InputLabel>Skill</InputLabel>
                <Select
                  {...register("skill")}
                  onChange={(e) => setValue("skill", e.target.value)}
                  name="skill"
                  // helperText={errors.gender?.message}
                  // error={Boolean(errors.gender)}
                  multiple
                  defaultValue={canditateData.skill}
                >
                  <MenuItem value={1}>JAVA</MenuItem>
                  <MenuItem value={2}>Java Script</MenuItem>
                  <MenuItem value={3}>Python</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={10}>
              <FormControl required>
                <FormLabel>Currently Holding any offer</FormLabel>
                <RadioGroup
                  onChange={(e) => setValue("holdingOffer", e.target.value)}
                  name="holdingOffer"
                  helperText={errors.holdingOffer?.message}
                  error={Boolean(errors.holdingOffer)}
                  required
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
            <Grid item lg={3} md={3} sm={10} xs={10}>
</Grid>
          </Grid>

          {/* resume upload */}
        </Grid>
      </Grid>

      {/* <Typography variant="h6" fontWeight={"bold"} mt={5} mb={2} mx={2}>
        Education Details
      </Typography>
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
              error={Boolean(errors.institute)}
              variant="outlined"
              label="Institute/School"
              name="instituteOrSchoolName"
              {...register("instituteOrSchoolName", { required: true })}
              helperText={errors.instituteOrSchoolName?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
            />
          </FormControl>
        </Grid>

        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              error={Boolean(errors.degree)}
              variant="outlined"
              label="Degree"
              name="degree"
              {...register("degree", { required: true })}
              helperText={errors.degree?.message}
            />
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              error={Boolean(errors.department)}
              variant="outlined"
              label="Department"
              name="department"
              {...register("department")}
              helperText={errors.department?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
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
          <Grid item lg={3.8} display={"flex"} flexDirection={"row"}>
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
                error={Boolean(errors.dateOfBirth)}
                {...register("yearOfPassing")}
                helperText={errors.yearOfPassing?.message}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid> */}

      {/* <Typography variant="h6" fontWeight={"bold"} mt={5} mb={2} mx={2}>
        Experience Details
      </Typography>
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
              error={Boolean(errors.position)}
              variant="outlined"
              label="occupationName"
              name="occupationName"
              {...register("occupationName")}
              helperText={errors.occupationName?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
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
              {...register("companyName")}
              helperText={errors.companyName?.message}
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
              {...register("summary")}
              helperText={errors.summary?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
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
          <Grid item lg={3.9} display={"flex"} flexDirection={"row"}>
            <FormControl sx={{ rowGap: 3 }} fullWidth>
              <TextField
                error={Boolean(errors.yearOfExperience)}
                variant="outlined"
                label="No of years worked"
                type={"number"}
                name="yearOfExperience"
                {...register("yearOfExperience1")}
                helperText={errors.yearOfExperience?.message}
                // onChange={(e) => setFileName(`${e.target.value}`)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid> */}

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
            sx={{ backgroundColor: "green", textTransform: "none" }}
          >
            Submit
          </Button>
        </Grid>
        <Grid sx={{ mt: 3, mb: 4 }}>
          <Button variant="outlined" color="error" onClick={handleFunction}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Box>
    // <Box component={"form"} onSubmit={handleSubmit(onSubmit)} mt={4}>
    //   <Grid Container>
    //     <Grid item mx={2}>
    //       <Typography fontSize={{ lg: 25, xs: 20 }}>Edit Canditate</Typography>
    //     </Grid>
    //     <Grid item mt={3}>
    //       <Grid
    //         container
    //         display={"flex"}
    //         justifyContent={"center"}
    //         flexDirection={"row"}
    //         spacing={2}
    //         lg={12}
    //         md={9}
    //         sm={12}
    //         xs={12}
    //       >
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.firstName)}
    //             required
    //             variant="outlined"
    //             label="First Name"
    //             name="firstName"
    //             {...register("firstName")}
    //             helperText={errors.firstName?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.code)}
    //             required
    //             variant="outlined"
    //             label="Middle Name"
    //             name="Middle Name"
    //             {...register("middleName")}
    //             helperText={errors.middleName?.message}
    //             // onChange={(e) => setFileName(`${e.target.value}`)}
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             error={Boolean(errors.lastName)}
    //             label="Last Name"
    //             name="lastName"
    //             {...register("lastName", { required: true })}
    //             helperText={errors.lastName?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //       </Grid>

    //       <Grid
    //         container
    //         display={"flex"}
    //         justifyContent={"center"}
    //         flexDirection={"row"}
    //         spacing={2}
    //         lg={12}
    //         md={9}
    //         sm={12}
    //         xs={12}
    //         mt={2}
    //       >
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <FormControl fullWidth>
    //             <InputLabel>Gender</InputLabel>
    //             <Select
    //               {...register("gender")}
    //               onChange={(e) => setValue("gender", e.target.value)}
    //               name="gender"
    //               helperText={errors.gender?.message}
    //               error={Boolean(errors.gender)}
    //             >
    //               <MenuItem value={"male"}>Male</MenuItem>
    //               <MenuItem value={"female"}>Female</MenuItem>
    //               <MenuItem value={"others"}>Others</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <FormControl fullWidth>
    //             <TextField
    //               variant="outlined"
    //               InputLabelProps={{
    //                 shrink: true,
    //               }}
    //               // sx={{ width: "235px" }}
    //               label="Date Of Birth"
    //               type={"date"}
    //               name="dateOfBirth"
    //               error={Boolean(errors.dateOfBirth)}
    //               {...register("dateOfBirth")}
    //               helperText={errors.dateOfBirth?.message}
    //             />
    //           </FormControl>
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <FormControl fullWidth>
    //             <InputLabel>BloodGroup</InputLabel>
    //             <Select
    //               {...register("bloodGroup")}
    //               onChange={(e) => setValue("bloodGroup", e.target.value)}
    //               name="bloodGroup"
    //               helperText={errors.bloodGroup?.message}
    //               error={Boolean(errors.bloodGroup)}
    //             >
    //               <MenuItem value={"A+"}>A+</MenuItem>
    //               <MenuItem value={"A-"}>A-</MenuItem>
    //               <MenuItem value={"B+"}>B+</MenuItem>
    //               <MenuItem value={"B-"}>B-</MenuItem>
    //               <MenuItem value={"AB+"}>AB+</MenuItem>
    //               <MenuItem value={"AB-"}>AB-</MenuItem>
    //               <MenuItem value={"O+"}>O+</MenuItem>
    //               <MenuItem value={"O-"}>O-</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //       </Grid>
    //       <Grid
    //         container
    //         display={"flex"}
    //         justifyContent={"center"}
    //         flexDirection={"row"}
    //         spacing={2}
    //         lg={12}
    //         md={9}
    //         sm={12}
    //         xs={12}
    //         mt={2}
    //       >
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <FormControl fullWidth>
    //             <InputLabel>Martial Status</InputLabel>
    //             <Select
    //               {...register("maritalStatus")}
    //               onChange={(e) => setValue("maritalStatus", e.target.value)}
    //               name="maritalStatus"
    //               helperText={errors.maritalStatus?.message}
    //               error={Boolean(errors.maritalStatus)}
    //             >
    //               <MenuItem value={"married"}>Married</MenuItem>
    //               <MenuItem value={"unmarried"}>UnMarried</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.email)}
    //             variant="outlined"
    //             label="email"
    //             name="email"
    //             {...register("email")}
    //             helperText={errors.email?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.contactNumber)}
    //             variant="outlined"
    //             label="Contact Number"
    //             name="contactNumber"
    //             {...register("contactNumber")}
    //             helperText={errors.contactNumber?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //       </Grid>

    //       <Grid
    //         container
    //         display={"flex"}
    //         justifyContent={"center"}
    //         flexDirection={"row"}
    //         spacing={2}
    //         lg={12}
    //         md={9}
    //         sm={12}
    //         xs={12}
    //         mt={2}
    //       >
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <FormControl fullWidth>
    //             <TextField
    //               variant="outlined"
    //               InputLabelProps={{
    //                 shrink: true,
    //               }}
    //               label="Current ctc"
    //               type={"number"}
    //               name="currentCtc"
    //               error={Boolean(errors.currentCtc)}
    //               {...register("currentCtc")}
    //               helperText={errors.currentCtc?.message}
    //             />
    //           </FormControl>
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.expectedCtc)}
    //             variant="outlined"
    //             type="number"
    //             label="Expected ctc"
    //             name="expectedCtc"
    //             {...register("expectedCtc")}
    //             helperText={errors.expectedCtc?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item lg={3} md={3} sm={10} xs={10}>
    //           <TextField
    //             error={Boolean(errors.reason)}
    //             variant="outlined"
    //             label="Reason for change"
    //             name="reason"
    //             {...register("reason")}
    //             helperText={errors.reason?.message}
    //             fullWidth
    //           />
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item mx={2}>
    //       <Grid
    //         container
    //         mt={4}
    //         display={"flex"}
    //         justifyContent={"space-around"}
    //         lg={12}
    //       >
    //         <Grid item>
    //           <Typography mb={2}></Typography>
    //           {/* <TextField
    //             error={Boolean(errors.adhaarPath)}
    //             variant="outlined"
    //             name="adhaarPath"
    //             type="file"
    //             helperText={errors.adhaarPath?.message}
    //             onChange={(e) => (handleFileUpload(e), setSelect("aadhar"))}
    //           /> */}
    //           {/* {updateEmp.adhaarPath} */}
    //         </Grid>
    //         {/* <Grid item>
    //           <Typography mb={2}>Pan Card</Typography>
    //           <TextField
    //             error={Boolean(errors.panPath)}
    //             variant="outlined"
    //             name="panPath"
    //             type="file"
    //             helperText={errors.panPath?.message}
    //             onChange={(e) => (handleFileUpload(e), setSelect("pan"))}
    //           />
    //           {/* {updateEmp.panPath} */}
    //         {/* </Grid> */}
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Typography variant="h6" mt={5}>
    //     Education Details
    //   </Typography>
    //   <Grid
    //     container
    //     display={"flex"}
    //     flexDirection={"row"}
    //     justifyContent={"center"}
    //     columnGap={3}
    //     mt={2}
    //   >
    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.institute)}
    //           variant="outlined"
    //           label="Institute/School"
    //           name="institute"
    //           {...register("institute", { required: true })}
    //           helperText={errors.institute?.message}
    //           // onChange={(e) => setFileName(`${e.target.value}`)}
    //         />
    //       </FormControl>
    //     </Grid>

    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.degree)}
    //           variant="outlined"
    //           label="Degree"
    //           name="degree"
    //           {...register("degree", { required: true })}
    //           helperText={errors.degree?.message}
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.department)}
    //           variant="outlined"
    //           label="Department"
    //           name="department"
    //           {...register("department")}
    //           helperText={errors.department?.message}
    //           // onChange={(e) => setFileName(`${e.target.value}`)}
    //         />
    //       </FormControl>
    //     </Grid>
    //   </Grid>

    //   <Typography variant="h6" mt={5}>
    //     Experience Details
    //   </Typography>
    //   <Grid
    //     container
    //     display={"flex"}
    //     flexDirection={"row"}
    //     justifyContent={"center"}
    //     columnGap={2}
    //     rowGap={3}
    //     mt={2}
    //   >
    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.position)}
    //           variant="outlined"
    //           label="Position"
    //           name="position"
    //           {...register("position")}
    //           helperText={errors.position?.message}
    //           // onChange={(e) => setFileName(`${e.target.value}`)}
    //         />
    //       </FormControl>
    //     </Grid>

    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.company)}
    //           variant="outlined"
    //           label="Company"
    //           name="company"
    //           {...register("company")}
    //           helperText={errors.company?.message}
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid item lg={3}>
    //       <FormControl sx={{ rowGap: 3 }} fullWidth>
    //         <TextField
    //           required
    //           error={Boolean(errors.summary)}
    //           variant="outlined"
    //           label="Summary"
    //           name="summary"
    //           {...register("summary")}
    //           helperText={errors.summary?.message}
    //           // onChange={(e) => setFileName(`${e.target.value}`)}
    //         />
    //       </FormControl>
    //     </Grid>
    //     <Grid
    //       container
    //       justifyContent={"flex-start"}
    //       columnGap={2}
    //       rowGap={3}
    //       lg={9.3}
    //     >
    //       <Grid item lg={3.9} display={"flex"} flexDirection={"row"}>
    //         <FormControl sx={{ rowGap: 3 }} fullWidth>
    //           <TextField
    //             required
    //             error={Boolean(errors.experience)}
    //             variant="outlined"
    //             label="Experience in year"
    //             name="experience"
    //             {...register("experience")}
    //             helperText={errors.experience?.message}
    //             // onChange={(e) => setFileName(`${e.target.value}`)}
    //           />
    //         </FormControl>
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Typography fontSize={{ lg: 25, xs: 20 }} mt={5} mb={2} mx={2}>
    //     Address
    //   </Typography>
    //   <Grid container>
    //     <Grid
    //       item
    //       container
    //       display={"flex"}
    //       justifyContent={"center"}
    //       columnGap={4}
    //       rowSpacing={2}
    //     >
    //       <Grid item lg={3}>
    //         <FormControl sx={{ rowGap: 3 }} fullWidth>
    //           <TextField
    //             variant="outlined"
    //             size="small"
    //             label="door no"
    //             name="doorNo"
    //             error={Boolean(errors.doorNo)}
    //             {...register("doorNo")}
    //             helperText={errors.doorNo?.message}
    //           />
    //           <TextField
    //             variant="outlined"
    //             size="small"
    //             label="street"
    //             {...register("streetName")}
    //             name="streetName"
    //             error={Boolean(errors.streetName)}
    //             helperText={errors.streetName?.message}
    //           />
    //         </FormControl>
    //       </Grid>
    //       <Grid item lg={3}>
    //         <FormControl sx={{ rowGap: 3 }} fullWidth>
    //           <TextField
    //             variant="outlined"
    //             size="small"
    //             label="city"
    //             {...register("city")}
    //             name="city"
    //             error={Boolean(errors.city)}
    //             helperText={errors.city?.message}
    //             fullWidth
    //           />
    //           <TextField
    //             variant="outlined"
    //             size="small"
    //             label="state"
    //             {...register("state")}
    //             name="state"
    //             error={Boolean(errors.state)}
    //             helperText={errors.state?.message}
    //             fullWidth
    //           />
    //         </FormControl>
    //       </Grid>
    //       <Grid item lg={3}>
    //         <FormControl sx={{ rowGap: 3 }} fullWidth>
    //           <TextField
    //             variant="outlined"
    //             size="medium"
    //             label="Country"
    //             {...register("country")}
    //             name="country"
    //             error={Boolean(errors.country)}
    //             helperText={errors.country?.message}
    //             fullWidth
    //           />
    //           <TextField
    //             variant="outlined"
    //             size="medium"
    //             {...register("postalCode")}
    //             name="postalCode"
    //             label="postalCode"
    //             error={Boolean(errors.postalCode)}
    //             helperText={errors.postalCode?.message}
    //             fullWidth
    //           />
    //         </FormControl>
    //       </Grid>
    //     </Grid>
    //   </Grid>

    //   <Grid sx={{ display: "flex", justifyContent: "center" }}>
    //     <Grid sx={{ mt: 3, mb: 4, marginRight: "20px" }}>
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         sx={{ backgroundColor: "green", textTransform: "none" }}
    //       >
    //         Submit
    //       </Button>
    //     </Grid>
    //     <Grid sx={{ mt: 3, mb: 4 }}>
    //       <Button variant="outlined" color="error">
    //         Back
    //       </Button>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};

export default EditCandidate;
