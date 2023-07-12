import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Container } from "@mui/system";
// import { addTenantemployee, getTenant } from "../services/tenantEmployeeOnboardingService";
// import { useFileUpload } from "../hooks/FileUpload";
// import FileUploadIcon from "@mui/icons-material/FileUpload";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("last name is required"),
    gender: yup.string().required("Gender is required"),
    maritalStatus: yup.string().required("marital status is required"),
    contactNumber: yup.string().required("contact  number is mandatory"),
    email: yup.string().required("Email id is Required"),
    bloodGroup: yup.string().required("bloodgroup is required"),
    dateOfBirth: yup.string().required("DOB is required"),
    religion: yup.string().required(),
    nationality: yup.string().required(),
    dateOfJoining: yup.string().required(),
    role: yup.array().required(),
    adhaarNo: yup.string().required("Aadhar number is required"),
    panNo: yup.string().required("Pan number is required"),
    doorNo: yup.string().required("Door Number is Required"),
    postalCode: yup.string().required("Pin code is Required"),
    streetName: yup.string().required("Street Name is Mandatory"),
    state: yup.string().required("State is Required"),
    city: yup.string().required("City Name is Required"),
    country: yup.string().required("Country is Required"),
    doorNumber: yup.string().required("Door Number is Required"),
    postalCode1: yup.string().required("Pin code is Required"),
    streetName1: yup.string().required("Street Name is Mandatory"),
    state1: yup.string().required("State is Required"),
    city1: yup.string().required("City Name is Required"),
    country1: yup.string().required("Country is Required"),
  })
  .required();

const Form2 = ({ setDisp2, setDisp1, setTenant }) => {
  //   const {
  //     handleFileUpload,
  //     ifUploadingFailed,
  //     setFileName,
  //     uploadMessage,
  //     uploadedFilePath,
  //   } = useFileUpload();

  //   const [uploadSelect, setSelect] = useState("");
  const [resume, setAResume] = useState("");

  //   useEffect(() => {
  //     if (uploadedFilePath !== "") {
  //       if (uploadSelect === "aadhar") {
  //         setAadhar(uploadedFilePath.filePath);
  //       } else if (uploadSelect === "pan") {
  //         setPan(uploadedFilePath.filePath);
  //         console.log(uploadedFilePath);
  //       }
  //     }
  //   }, [uploadedFilePath]);

  const [data, setData] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      maritalStatus: "",
      contactNumber: "",
      email: "",
      bloodGroup: "",
      dateOfBirth: "",
      religion: "",
      nationality: "",
      dateOfJoining: "",
      role: "",
      adhaarNo: "",
      panNo: "",
      doorNo: "",
      pincode: "",
      streetName: "",
      state: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = (data) => {
    // setDisp2(true), setDisp1(false);
    // if(getTenant.contactNumber===data.contactNumber){
    //     alert("The Mobile Number is already there so you are Not able to add the employee");
    // }
    let employee = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      contactNumber: data.contactNumber,
      email: data.email,
      bloodGroup: data.bloodGroup,
      dateOfBirth: data.dateOfBirth,
      religion: data.religion,
      nationality: data.nationality,
      dateOfJoining: data.dateOfJoining,
      roles: data.role,
      resumePath: resume,
      // panPath: pan,
      branchId: 1,
      statusId: 1,
      modifiedAt: "",
      presentAddressId: {
        addressId: 0,
        doorNo: data.doorNo,
        postalCode: data.postalCode,
        streetName: data.streetName,
        state: data.state,
        city: data.city,
        country: data.country,
      },
      designation: data.designation,
      createdBy: 1,
      modifiedBy: 1,
    };
    console.log(employee, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // addTenantemployee(employee)
    //   .then(getTenant)
    //   .then((data) => setTenant(data));
  };

  // const handleAddress = () => {
  //   const data = getValues([
  //     "doorNo",
  //     "streetName",
  //     "city",
  //     "state",
  //     "country",
  //     "postalCode",
  //   ]);
  //   setValue("doorNumber", data[0]);
  //   setValue("streetName1", data[1]);
  //   setValue("city1", data[2]);
  //   setValue("state1", data[3]);
  //   setValue("country1", data[4]);
  //   setValue("postalCode1", data[5]);
  //   setData(true);
  // };

  return (
    <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Candidate Details</Typography>
      <Grid container justifyContent={"center"} columnGap={2} mt={2}>
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              error={Boolean(errors.firstName)}
              variant="outlined"
              label="First Name"
              name="firstName"
              {...register("firstName")}
              helperText={errors.firstName?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
            />
            <TextField
              required
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "235px" }}
              label="Date Of Birth"
              type={"date"}
              name="dateOfBirth"
              error={Boolean(errors.dateOfBirth)}
              {...register("dateOfBirth")}
              helperText={errors.dateOfBirth?.message}
            />
            <TextField
              required
              error={Boolean(errors.contactNumber)}
              variant="outlined"
              label="Contact Number"
              name="contactNumber"
              {...register("contactNumber")}
              helperText={errors.contactNumber?.message}
            />
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select
                required
                {...register("experience")}
                onChange={(e) => setValue("experience", e.target.value)}
                name="experience"
                helperText={errors.experience?.message}
                error={Boolean(errors.experience)}
              >
                <MenuItem value={""}>0-1</MenuItem>
                <MenuItem value={""}>1-2</MenuItem>
                <MenuItem value={""}>2-3</MenuItem>
                <MenuItem value={""}>3-4</MenuItem>
                <MenuItem value={""}>4-5</MenuItem>
                <MenuItem value={""}>5+ years</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              variant="outlined"
              error={Boolean(errors.middlename)}
              label="Middle Name"
              name="middlename"
              {...register("middlename", { required: true })}
              helperText={errors.middlename?.message}
            />
            <FormControl>
              <InputLabel>BloodGroup</InputLabel>
              <Select
                required
                {...register("bloodGroup")}
                onChange={(e) => setValue("bloodGroup", e.target.value)}
                name="bloodGroup"
                helperText={errors.bloodGroup?.message}
                error={Boolean(errors.bloodGroup)}
              >
                <MenuItem value={"A+"}>A+</MenuItem>
                <MenuItem value={"A-"}>A-</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"B-"}>B-</MenuItem>
                <MenuItem value={"AB+"}>AB+</MenuItem>
                <MenuItem value={"AB-"}>AB-</MenuItem>
                <MenuItem value={"O+"}>O+</MenuItem>
                <MenuItem value={"O-"}>O-</MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              error={Boolean(errors.email)}
              variant="outlined"
              label="email"
              name="email"
              {...register("email")}
              helperText={errors.email?.message}
            />

            {/* <IconButton component="label">
                <FileUploadIcon />
                <input
                  hidden
                  type="file"
                  onChange={(e) => (handleFileUpload(e), setSelect("aadhar"))}
                />
              </IconButton>
              <Typography>{aadhar}</Typography> */}
          </FormControl>

          <Grid justifyContent={"space-evenly"} mt={3} lg={12}>
            <TextField
              id="outlined-controlled"
              label="Upload Resume"
              type="file"
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.resume)}
              helperText={errors.resume?.message}
              required
              // onChange={(e) => (handleFileUpload(e), setSelect("aadhar"))}
            />
            {resume}
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              variant="outlined"
              error={Boolean(errors.lastname)}
              label="Last Name"
              name="lastname"
              {...register("lastname", { required: true })}
              helperText={errors.lastname?.message}
            />

            <FormControl fullWidth>
              <InputLabel>Martial Status</InputLabel>
              <Select
                required
                {...register("maritalStatus")}
                onChange={(e) => setValue("maritalStatus", e.target.value)}
                name="maritalStatus"
                helperText={errors.maritalStatus?.message}
                error={Boolean(errors.maritalStatus)}
              >
                <MenuItem value={"married"}>Married</MenuItem>
                <MenuItem value={"unMarried"}>UnMarried</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                required
                {...register("status")}
                onChange={(e) => setValue("status", e.target.value)}
                name="status"
                helperText={errors.status?.message}
                error={Boolean(errors.status)}
              >
                <MenuItem value={"ACCEPTED"}>Accepted</MenuItem>
                <MenuItem value={"OFFER MADE "}>Offer made</MenuItem>
                <MenuItem value={"DECLINED"}>Declined</MenuItem>
                <MenuItem value={"HIRED"}>Hired</MenuItem>
                <MenuItem value={"JOINED"}>Joined</MenuItem>
                <MenuItem value={"NO SHOW"}>No show</MenuItem>
              </Select>
            </FormControl>

            {/* <IconButton component="label">
                <FileUploadIcon />
                <input
                  hidden
                  type="file"
                  onChange={(e) => (handleFileUpload(e), setSelect("pan"))}
                />
              </IconButton>
              <Typography>{pan}</Typography> */}
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" mt={5} mb={4}>
        Address Details
      </Typography>

      <Grid container justifyContent={"center"} columnGap={2} rowGap={3}>
        <Grid item lg={3}>
          <TextField
            variant="outlined"
            label="Door no"
            name="doorNo"
            fullWidth
            error={Boolean(errors.doorNo)}
            {...register("doorNo")}
            helperText={errors.doorNo?.message}
          />
        </Grid>
        <Grid item lg={3}>
          <TextField
            variant="outlined"
            fullWidth
            label="Street"
            {...register("streetName")}
            name="streetName"
            error={Boolean(errors.streetName)}
            helperText={errors.streetName?.message}
          />
        </Grid>
        <Grid item lg={3}>
          <TextField
            variant="outlined"
            fullWidth
            label="City"
            {...register("city")}
            name="city"
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
        </Grid>
        {/* =============================================== */}
        <Grid item lg={3}>
          <TextField
            variant="outlined"
            label="State"
            fullWidth
            {...register("state")}
            name="state"
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
          />
        </Grid>

        <Grid item lg={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Country"
            {...register("country")}
            name="country"
            error={Boolean(errors.country)}
            helperText={errors.country?.message}
          />
        </Grid>
        <Grid item lg={3}>
          <TextField
            fullWidth
            variant="outlined"
            {...register("postalCode")}
            name="postalCode"
            label="PostalCode"

            // error={Boolean(errors.pincode)}
            // helperText={errors.pincode?.message}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" mt={5}>
        Education Details
      </Typography>
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        columnGap={3}
        mt={2}
      >
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              error={Boolean(errors.institute)}
              variant="outlined"
              label="Institute/School"
              name="institute"
              {...register("institute")}
              helperText={errors.institute?.message}
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
              {...register("degree")}
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
      </Grid>

      <Typography variant="h6" mt={5}>
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
              required
              error={Boolean(errors.position)}
              variant="outlined"
              label="Position"
              name="position"
              {...register("position")}
              helperText={errors.position?.message}
              // onChange={(e) => setFileName(`${e.target.value}`)}
            />
          </FormControl>
        </Grid>

        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
              error={Boolean(errors.company)}
              variant="outlined"
              label="Company"
              name="company"
              {...register("company")}
              helperText={errors.company?.message}
            />
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl sx={{ rowGap: 3 }} fullWidth>
            <TextField
              required
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
                required
                error={Boolean(errors.experience)}
                variant="outlined"
                label="Experience in year"
                name="experience"
                {...register("experience")}
                helperText={errors.experience?.message}
                // onChange={(e) => setFileName(`${e.target.value}`)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Stack direction={"row"} spacing={3} justifyContent={"flex-end"} mt={3}>
        <Button
          variant="contained"
          sx={{ background: "#1a237e", height: "50px" }}
        >
          Submit
        </Button>

        <Button
          variant="contained"
          sx={{ background: "#1a237e", height: "50px" }}
        >
          Cancel
        </Button>
      </Stack>
    </Container>
  );
};

export default Form2;
