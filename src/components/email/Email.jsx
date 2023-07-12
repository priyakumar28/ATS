import {
  AttachFile,
  BoyRounded,
  Clear,
  Delete,
  FormatColorTextTwoTone,
  InsertDriveFile,
  InsertLink,
  InsertPhoto,
  LockClock,
  MoreVert,
  Search,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  TextField,
  ToggleButton,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postEmail } from "../../services/EmailService";
import { ThemeProvider } from "@emotion/react";

import AlertMsg from "../sweetalert/AlertMsg";
import AlertContext from "../contextProvider/AlertContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";

const schema = yup.object().shape({
  to: yup
    .string()
    .email()
    .required("Email is Required")
    .min(6, "Minimum 6 chars required ")
    .max(320, "maximum 320 chars required"),
  subject: yup.string().required("Enter the subject"),
  body: yup.string().required("Email body is required"),
});

function Email({ email, setOpenModel }) {
  const { setAlert } = useContext(AlertContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [link, setLink] = useState("");
  const [isopen, setIsOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [width, setWidth] = useState("100%");
  const [disableTo, setDisableTo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleOpenModal = (message) => {
    setModalOpen(true);
    setModalMessage(message);
  };

  const handleCloseModal = (message) => {
    setModalOpen(false);
    setModalMessage(message);
  };

  useEffect(() => {
    if (email.length > 0) {
      setValue("to", email, { shouldValidate: true });
      setWidth("100%");
      setDisableTo(true);
    }
  }, []);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const Close = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);

    Close();

    if (option !== "Welcome To Bassure Solution") {
      setValue("body", "", { shouldValidate: true });
    }

    if (option === "Option1") {
      const formattedText = `Dear             ,

  We take this opportunity to welcome you into the BAssure Solutions family and look forward to a very fruitful association with you.

  To ensure that your induction into BAssure Solutions is smooth and comfortable, please go through the following note and ensure that all the formalities are completed by you.

 Office Address: -

  Seshasaai Building,
  No.4/606, 2nd Floor,
  1st Main Road, Nehru Nagar,
  Kottivakkam-OMR, Chennai,
  Tamil Nadu. PIN-600041.

  Joining Date : 

  Timing : 

  Contact HR Person : 

  Direct No. # : 

 Document to be submitted on the joining day:

  1. Passport size photographs with White background - 2 copies

  2. Below mentioned original documents:

     · Mark-sheets (SSC, HSC, Bachelors & Masters – for all semesters/years) and Degree certificates (Educational & Professional).

     · Passport, Aadhar, Pan

     · Original Relieving letter of the previous employer.

     · All previous companies’ experience letters (From your 1st job till the latest one as mentioned in the Employee Application form filled by you).

     · Proof for your last drawn compensation (last 3 months Salary Slip)

     · All the subsequent compensation review letters, if any

  Please note the originals will be returned to you on the same day after Verification.

  Please confirm your joining on this mail.

 Should you have any questions, please feel free to contact us. Thanks!`;

      let val = getValues("body") + formattedText;

      setValue("body", val, { shouldValidate: true });
    } else if (option === "Option2") {
      const formattedText = `Dear                ,

   Thank you for showing interest in BAssure Solutions. We are a leading company in the field of _________ (mention the field) and are dedicated to providing top-notch services to our clients.

   We would like to invite you to explore our website and learn more about our solutions and offerings. You can find detailed information about our services, client testimonials, and success stories on our website.

   If you have any questions or would like to discuss how we can assist you, please feel free to contact us.

   Best regards,
   
  Your Name`;

      let val = getValues("body") + formattedText;

      setValue("body", val, { shouldValidate: true });
    } else if (option === "Option3") {
      const formattedText = `Dear     ,

    We are pleased to inform you that your interview has been scheduled as follows:
   
   Date: 
 
   Time:

   Venue: 

Office Address: -

  Seshasaai Building,
  No.4/606, 2nd Floor,
  1st Main Road, Nehru Nagar, 
  Kottivakkam-OMR, Chennai,
  Tamil Nadu. PIN-600041.

Please make sure to arrive on time and bring any required documents or materials.
 
If you have any questions or need any further information, please don't hesitate to contact us.

Best regards,

Your Name`;

      let val = getValues("body") + formattedText;

      setValue("body", val, { shouldValidate: true });
    }
  };

  const handleDeleteButtonClick = (event) => {
    reset();
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;

    const updatedFiles = Array.from(files);

    const updatedFileNames = Array.from(files).map((file) => file.name);

    setSelectedFiles([...selectedFiles, ...updatedFiles]);

    setFileNames([...fileNames, ...updatedFileNames]);
  };

  const handleButtonClick = () => {
    const inputLink = window.prompt("Enter the link:");
    if (inputLink) {
      setLink(<a href={inputLink}>{inputLink}</a>);
    }
    if (inputLink !== null) {
      let val = getValues("body") + inputLink;
      setValue("body", val, { shouldValidate: true });
    }
  };

  const [loader , setLoader] = useState(false);

  const theme = createTheme({
    typography: {
      fontSize: 15,
    },
  });

  // const handleClose = () => {
  //   // if (window.confirm("Conform To Close")) {
  //   //   setIsOpen(false);
  //   //   setOpenModel(false);
  //   // } else {
  //   //   setIsOpen(true);
  //   // }
  //   <AlertClose />;
  // };
  const handleClose = () => {
    setOpenModel(false);
  };

  const onSubmit = async (data) => {
    setLoader(true);
    const formData = new FormData();
    const recipients = data.to;
    formData.append("to", recipients);
    formData.append("subject", data.subject);
    formData.append("body", data.body);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("attachments", selectedFiles[i]);
    }

    if (data.subject === "Office Offer Letter") {
      formData.set("subject", "Office Offer Letter");
    }

    try {
      const response = await postEmail(formData).then((resp) => {
        if (resp.code == 2200) {
          setLoader(false);
          setAlert({
            message: "Email sent successfully! ",
            open: true,
          });
        } else {
          setLoader(false);
          setAlert({
            message: "Failed to send email ",
            open: true,
          });
        }
      });

      // setMessage("Email sent successfully!");

      // setAlertOpen(true);

      reset();

      setSelectedFiles([]);

      setFileNames([]);
    } catch (error) {
      // Handle error

      // setMessage("Failed to send email");

      // setAlertOpen(true);

      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid>
          {/* {alertOpen && (
              <Alert onClose={() => setAlertOpen(false)}>{message}</Alert>
            )} */}
            {loader && <Loader /> }
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
            marginTop={1}
          >
            <Paper
              elevation={4}
              sx={{ width: width, padding: "3%", borderRadius: 5 }}
            >
              <Grid item display={"flex"} justifyContent={"space-between"}>
                <Typography variant="h6">New Message</Typography>
                <IconButton>
                  <Clear onClick={handleClose} />
                </IconButton>
              </Grid>
              <TextField
                variant="standard"
                label="To:"
                disabled={disableTo}
                placeholder="To:"
                {...register("to")}
                sx={{ marginY: 4, width: "100%", backgroundColor: "white" }}
                helperText={errors.to?.message}
              />
              <TextField
                sx={{ marginY: 4, width: "100%", backgroundColor: "white" }}
                variant="standard"
                label="Subject:"
                placeholder="add Subject"
                {...register("subject")}
                helperText={errors.subject?.message}
              />
              <TextField
                sx={{ width: "100%", backgroundColor: "white" }}
                multiline
                variant="standard"
                rows={10}
                label="Body"
                {...register("body")}
                helperText={errors.body?.message}
              />
              <Input
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="upload-file"
                multiple
              />

              {fileNames.length > 0 &&
                fileNames.map((fileName, index) => (
                  <Grid key={index} sx={{ display: "flex" }}>
                    <Typography variant="h6">{fileName}</Typography>
                    <IconButton
                      onClick={() => {
                        const updatedFiles = [...selectedFiles];
                        updatedFiles.splice(index, 1);
                        setSelectedFiles(updatedFiles);
                        const updatedFileNames = [...fileNames];
                        updatedFileNames.splice(index, 1);
                        setFileNames(updatedFileNames);
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </Grid>
                ))}

              <Grid
                item
                display={"flex"}
                flexWrap={"wrap"}
                marginTop={5}
                md={5}
                justifyContent={"space-evenly"}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 50,
                    backgroundColor: "skyblue",
                    width: 100,
                  }}
                >
                  SEND
                </Button>

                <label htmlFor="upload-file">
                  <IconButton marginX={5} size={"large"} component="span">
                    <AttachFile />
                  </IconButton>
                </label>
                <IconButton
                  marginX={5}
                  size={"large"}
                  onClick={handleButtonClick}
                >
                  <InsertLink />
                </IconButton>

                <label htmlFor="photo-upload">
                  <IconButton marginX={5} size={"large"} component="span">
                    <input
                      type="file"
                      accept="image/png,imgae/jpeg"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      id="photo-upload"
                      multiple
                    />
                    <InsertPhoto />
                  </IconButton>
                </label>

                <IconButton
                  marginX={5}
                  onClick={handleClick}
                  aria-controls="email-options-menu"
                  aria-haspopup="true"
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="email-options-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={Close}
                >
                  <MenuItem onClick={() => handleOptionClick("Option1")}>
                    Welcome To Bassure Solution
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("Option2")}>
                    BAssure Solution
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("Option3")}>
                    Interview Schedule
                  </MenuItem>
                </Menu>
                <IconButton onClick={handleDeleteButtonClick}>
                  <Delete />
                </IconButton>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Email;
