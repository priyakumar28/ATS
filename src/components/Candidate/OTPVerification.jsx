import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { otpservice } from "../../services/otpvalidation";
import AlertContext from "../contextProvider/AlertContext";

const OTPVerification = () => {

  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOTP] = useState("");
  // const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get("email"); 
    console.log(param); 
    setEmail(param);
  }, [location]);

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleVerifyClick = () => {
    console.log("Verifying OTP:", otp);
    otpservice(email, otp)
    .then((data) => (console.log(data,"data from response"),setMessage(data), data && navigate(`/candidate/Addcanditate?email=${email}`)))
    .catch((err) => {  setAlert({
      message : "Enter a valid otp ...! ", 
      open : true
    })
  })
  };

  return (
    <Grid>
      {/* {alert && <Alert onClose={setTimeout(() => {
        setAlert(false)
      },3000 )} severity="error">Enter a valid OTP</Alert>} */}
      
      <Box
        sx={{
          display: "flex",
          mt: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          "& > :not(style)": {
            width: "55vw",
            height: "80vh",
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
          }}
        >
          <Grid mb={7}>
            <Typography variant="h4" textAlign={"center"} sx={{ mb: 5 }}>
              OTP Verification
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <TextField
                label="OTP"
                variant="outlined"
                value={otp}
                onChange={handleOTPChange}
              />
              <Grid sx={{ mt: 2 }}>
                <Button
                  sx={{ marginRight: 2 }}
                  variant="contained"
                  onClick={handleVerifyClick}
                >
                  Verify
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
};

export default OTPVerification;