import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Schema } from "yup";
import {
  addbasicdetails,
  addbasicdetailsEmail,
  addCandidate,
} from "../../services/CandidateService";
import * as yup from "yup";
import { getAssignedJob } from "../../services/CandidateService";
import AlertContext from "../contextProvider/AlertContext";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First name is required").matches(/^[a-zA-Z]*$/,"matches contains only alpha characters").min(1).max(25),
    lastName: yup.string().required("last name is required").matches(/^[a-zA-Z]*$/,"matches contains only alpha characters").min(1).max(25),
    // middleName: yup.string().required("DOB is required"),
    // gender: yup.string().required("Gender is required"),
    // maritalStatus: yup.string().required("marital status is required"),
    contactNo: yup
      .string()
      .required("contact  number is mandatory")
      // .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter a valid mobile number")
      .min(10)
      .trim(),
    emailid: yup.string().required("Email id is Required"),

    // // currentCtc: yup.string().required("current ctc is required"),
    // expectedCtc: yup.string().required("Expected ctc is required"),
    // // reasonForChange: yup.string().required("reason is required"),
    // doorNo: yup.string().required("Door Number is Required"),
    // pinCode: yup.string().required("Pin code is Required"),
    // street: yup.string().required("Street Name is Mandatory"),
    // state: yup.string().required("State is Required"),
    // city: yup.string().required("City Name is Required"),
    // country: yup.string().required("Country is Required"),
    // contactNumber1: yup
    //   .string()
    //   .required("contact  number is mandatory")
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
    // yearOfExperience1: yup.string().required("year of passing is required"),
    // yearOfExperience: yup.number().required("year of passing is required"),
    // source: yup.string().required("summary is req"),
    // skill : yup.number()
  })
  .required();

const Basicdetails = ({ setBasicDetail }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [Interested, setInterested] = useState("");
  const {setAlert} = useContext(AlertContext);
  let mail = false;

  const savecontinue = (data) => {
    if (Interested.match("true")) {
      console.log(mail);
      let applicant = {
        applicantStatus: "NEW",
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        contactNo: data.contactNo,
        email: data.emailid,
        interested: data.interested,
        jobPostingId: data.jobPostingId,
        applicantFlag: "false",
      };
      // console.log(applicant, ">>>>>>>>>>>>>>");
      // addbasicdetails(applicant);
      // setBasicDetail(applicant);
      // navigate("/Dashboard/Candidates/AddCanditate");
      if (mail) {
        setAlert({
          message : "mail sent successfully" , 
          open : true
        });
     
        addbasicdetailsEmail(applicant);
        setBasicDetail(applicant);
        navigate("/candidate");
      } else {
        addbasicdetails(applicant).then((resp) => {
          if (resp === "2256") {
            setAlert({
              message : "Applicant already exist",
              open : true
            }); 
            navigate("/candidate");
          } else {
            setBasicDetail(applicant);
            setAlert({
              message : "Applicant Basic Details Added successfully.",
              open : true
            }); 
            navigate("/candidate/AddCanditate");
          }
        });
      }
    } else {
      let applicant = {
        applicantStatus: "DECLINED",
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        contactNo: data.contactNo,
        email: data.emailid,
        interested: data.interested,
        jobPostingId: data.jobPostingId,
        applicantFlag: "false",
      };
      addbasicdetails(applicant).then( data => {
        setAlert({
          message : "Applicant added Successfully",
          open : true
        }); 
      } );
      setBasicDetail(applicant);
      navigate("/candidate");
    }
  };
  const handleFunction = () => {
    navigate("/candidate");
  };
  const email = () => {
    mail = true;
    setTimeout(() => {
      handleSubmit(savecontinue)();
    }, 1000);
  };

  useEffect(() => {
    getAssignedJob(1).then((data) => setAssignedJobs(data));
  }, []);

  return (
    <>
      {/* ========================================= */}
      <Box component={"form"}>
        <Grid container display={"flex"} justifyContent="center" lg={12} mt={6}>
          <Grid
            item
            container
            spacing={3}
            lg={3}
            sx={{
              flexDirection: "column",
            }}
          >
            <Grid item>
              <Typography>First Name :</Typography>
              <TextField
                error={Boolean(errors.firstName)}
                variant="outlined"
                name="firstName"
                {...register("firstName")}
                helperText={errors.firstName?.message}
                sx={{ width: "80%" }}
                required
              />
            </Grid>
            <Grid item>
              {/* ============================ */}
              <Typography>Middle Name :</Typography>
              <TextField
                error={Boolean(errors.middleName)}
                variant="outlined"
                name="middleName"
                {...register("middleName")}
                helperText={errors.middleName?.message}
                sx={{ width: "80%" }}
              />
            </Grid>
            <Grid item>
              {/* ============================ */}
              <Typography>Last Name :</Typography>
              <TextField
                error={Boolean(errors.lastName)}
                variant="outlined"
                name="lastName"
                {...register("lastName")}
                helperText={errors.lastName?.message}
                sx={{ width: "80%" }}
                required
              />
            </Grid>
          </Grid>

          {/* =========================================== */}
          <Grid
            item
            container
            lg={5}
            spacing={4.5}
            sx={{
              flexDirection: "column",
            }}
          >
            <Grid item>
              <Typography>Mobile No :</Typography>
              <TextField
                variant="outlined"
                name="contactNo"
                {...register("contactNo")}
                sx={{ width: "50%" }}
                error={Boolean(errors.contactNo)}
                helperText={errors.contactNo?.message}
                required
              />
            </Grid>
            <Grid item>
              <Typography>Email Id :</Typography>
              <TextField
                error={Boolean(errors.emailid)}
                variant="outlined"
                name="emailid"
                label="email"
                {...register("emailid")}
                sx={{ width: "50%" }}
                helperText={errors.emailid?.message}
              />
            </Grid>
            <Grid item>
              <FormControl sx={{ width: "50%" }}>
                <InputLabel>Job</InputLabel>
                <Select
                  // error={Boolean(errors.jobRecruiterId)}
                  // helperText={errors.jobRecruiterId?.message}
                  variant="outlined"
                  required
                  color="secondary"
                  {...register("jobPostingId")}
                >
                  {assignedJobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item display="flex">
              <Typography mt={1} mr={2}>
                Are you Interested ?
              </Typography>
              <RadioGroup
                onChange={(e) => (
                  setInterested(e.target.value),
                  setValue("interested", e.target.value)
                )}
                name="interested"
              >
                <Grid display="flex">
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
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          flexDirection="row"
          sx={{ marginLeft: "780px" }}
          mt={11}
        >
          <Grid item display="flex">
            <Grid pr={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "green", textTransform: "none" }}
                onClick={handleSubmit(savecontinue)}
              >
                CONTINUE
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                color="error"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  mail = true;
                  setTimeout(() => {
                    handleSubmit(savecontinue)();
                  }, 2000);
                }}
              >
                SEND MAIL
              </Button>
            </Grid>
            <Grid item mx={3}>
              <Button variant="outlined" color="error" onClick={handleFunction}>
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ================================================================================= */}
    </>
  );
};
export default Basicdetails;
