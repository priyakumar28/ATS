import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Tab,
  TextField,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import avimg from "../../images/avatar.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { getProfile } from "../../services/profileService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  mobilenumber: yup.number().min(10).required(),
  email: yup.string().email().required(),
  dateOfBirth: yup.string().required(),
  dateOfJoining: yup.string().required(),
  maritalStatus: yup.string().required(),
});

function Profile({ profile }) {
  const [loader, setLoader] = useState(false);
  const [value, setValue] = React.useState("1");

const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      dateOfBirth: "",
      dateOfJoining: "",
      maritalStatus: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (profile.firstName !== "") setLoader(true);
  }, []);

  return (
    <>
      {/* {loader && ( */}
      <div>
        <Grid
          container
          display={"flex"}
          flexDirection={"row"}
          spacing={10}
          p={5}
          lg={12}
        >
          <Grid item lg={3}>
            <Grid
              container
              display={"flex"}
              flexDirection={"column"}
              spacing={3}
            >
              <Grid item>
                <Typography
                  fontSize={{ lg: "30px", md: "30px", sm: "25px", xs: "20px" }}
                  fontWeight={"bold"}
                >
                  Profile
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={avimg}
                    sx={{
                      height: { lg: "12em", md: "10em", sm: "8em", xs: "7em" },
                      width: {
                        lg: "250px",
                        md: "220px",
                        sm: "150px",
                        xs: "150px",
                      },
                    }}
                  />
                  <IconButton
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      position: "absolute",
                      top: {
                        lg: "190px",
                        md: "160px",
                        sm: "120px",
                        xs: "110px",
                      },
                      left: {
                        lg: "190px",
                        md: "160px",
                        sm: "100px",
                        xs: "100px",
                      },
                      background: "white",
                    }}
                  >
                    <input hidden accept="image/*" type="file" />
                    <AddAPhotoIcon
                      sx={{
                        color: "#4B0082",
                        fontSize: { lg: "35px", md: "35px", sm: "25px" },
                      }}
                    />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={8}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Profile" value="1" />
                    <Tab label="Preference" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                      container
                      display={"flex"}
                      flexDirection={"column"}
                      spacing={5}
                    >
                      <Grid item>
                        <Grid
                          container
                          display={"flex"}
                          flexDirection={"row"}
                          spacing={{ lg: 5, md: 5, sm: 5, xs: 3 }}
                          lg={12}
                        >
                          <Grid item lg={6}>
                            <Typography>First Name*</Typography>
                            <TextField
                              type="text"
                              fullWidth
                              {...register("firstname")}
                              error={!!errors.firstname}
                              helperText={errors.firstname?.message}
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <Typography>Last Name*</Typography>
                            <TextField
                              type="text"
                              fullWidth
                              {...register("lastname")}
                              error={!!errors.lastname}
                              helperText={errors.lastname?.message}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          display={"flex"}
                          flexDirection={"row"}
                          spacing={{ lg: 5, md: 5, sm: 5, xs: 3 }}
                          lg={12}
                        >
                          <Grid item lg={6}>
                            <Typography>Mobile Number*</Typography>
                            <TextField
                              type="tel"
                              fullWidth
                              {...register("mobilenumber")}
                              error={!!errors.mobilenumber}
                              helperText={
                                errors.mobilenumber && (
                                  <Typography fontSize={"12px"}>
                                    mobile is required field
                                  </Typography>
                                )
                              }
                            />
                          </Grid>
                          <Grid item lg={6}>
                            <Typography>Email*</Typography>
                            <TextField
                              type="email"
                              fullWidth
                              {...register("email")}
                              error={!!errors.email}
                              helperText={errors.email?.message}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          display={"flex"}
                          flexDirection={"row"}
                          spacing={{ lg: 5, md: 5, sm: 5, xs: 3 }}
                          lg={12}
                        >
                          <Grid item lg={6} sm={6} xs={9.2}>
                            <Typography>Date Of Birth*</Typography>
                            <TextField
                              type="date"
                              fullWidth
                              {...register("dateOfBirth")}
                              error={!!errors.dateOfBirth}
                              helperText={errors.dateOfBirth?.message}
                            />
                          </Grid>
                          <Grid item lg={6} sm={6} xs={9.2}>
                            <Typography>Date of Joining*</Typography>
                            <TextField
                              type="date"
                              fullWidth
                              {...register("dateOfJoining")}
                              error={!!errors.dateOfJoining}
                              helperText={errors.dateOfJoining?.message}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          display={"flex"}
                          flexDirection={"row"}
                          spacing={{ lg: 5, md: 5, sm: 5, xs: 3 }}
                        >
                          <Grid item lg={5.8} sm={6} xs={9.2}>
                            {/* <Typography>Marital Status*</Typography>
                                                <TextField type='password' fullWidth {...register("maritalStatus")} error={!!errors.maritalStatus}
                                                helperText={errors.maritalStatus?.message}/> */}
                            <Typography>Marital Status*</Typography>
                            <FormControl
                              error={!!errors.maritalStatus}
                              fullWidth  >
                              <Select>
                                <MenuItem value="option1">UnMarried</MenuItem>
                                <MenuItem value="option2">Married</MenuItem>
                              </Select>
                              <FormHelperText>
                                {errors.maritalStatus && (
                                  <Typography fontSize={"12px"}>
                                    Select your marital status
                                  </Typography>
                                )}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={{
                            lg: "flex-end",
                            md: "flex-end",
                            sm: "flex-end",
                            xs: "flex-start",
                          }}
                          spacing={3}
                        >
                          <Grid item>
                            <Button
                              variant="outlined"
                              type="reset"
                              onClick={() => navigate(-1)}
                              sx={{
                                borderColor: "#4B0082",
                                color: "#4B0082",
                                textTransform: "none",
                                width: { lg: "160px", xs: "100px" },
                                height: "40px",
                              }}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              type="submit"
                              sx={{
                                background: "#4B0082",
                                textTransform: "none",
                                width: { lg: "160px", xs: "100px" },
                                height: "40px",
                              }}
                              onClick={handleSubmit(onSubmit)}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </TabPanel>
                <TabPanel value="2">Preference</TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </div>
      {/* )} */}
    </>
  );
}

export default Profile;
