import {
  Autocomplete,
  Box,
  Button,
  Chip,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Controller, useForm } from "react-hook-form";
import "../Createjobpost/Createjobpost.css";
import * as yup from "yup";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useContext, useEffect, useState } from "react";
import { getDrafts } from "../../../services/jobPostService";
import ViewPost from "../../ViewPost/ViewPost";
import OngoingRecuirements from "../../OnoingRecuiremments/OngoingRecuirements";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AlertContext from "../../contextProvider/AlertContext";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  // Increase the font size and padding
  "& .MuiTooltip-tooltip": {
    fontSize: "13px",
    padding: theme.spacing(1),
  },
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.secondary.main, // Modify the color for the unchecked state
  "&.Mui-checked": {
    color: theme.palette.primary.main, // Modify the color for the checked state
  },
}));

const schema = yup.object().shape({
  title: yup
    .mixed()
    .test("is-title-valid", "Title must be a string or an object", (value) => {
      return typeof value === "string" || typeof value === "object";
    })
    .required("Title is required"),
  noOfVaccancies: yup
    .number()
    .integer()
    .positive("value must be in positive")
    .nullable()
    .required("No of vacancies is required"),
  experience: yup.string().required("experience is required"),
  // matches(/^[a-zA-Z0-]*$/, "experience contains only alpha characters"),
  type: yup.string().required("Please select a work type"),

  location: yup
    .string()
    .required("Location is required")
    .matches(/^[a-zA-Z ]*$/, "matches contains only alpha characters"),
  openDate: yup
    .date()
    .test("futureDate", "Opening Date must be in the future", function (value) {
      const currentDate = new Date();

      if (value <= currentDate) {
        return this.createError({ message: "Date must be in the future" });
      }

      return true;
    })
    .test(
      "withinOneMonth",
      "Opening Date must be within one month from the current date",
      (value) => {
        const currentDate = new Date();
        const oneMonthFromNow = new Date().setMonth(currentDate.getMonth() + 1);
        return value >= currentDate && value <= oneMonthFromNow;
      }
    )
    .required("openingDate is required"),
  closeDate: yup
    .date()
    .test(
      "validCloseDate",
      "Close Date must be within one month from Open Date",
      function (value) {
        const { openDate } = this.parent; // Get the value of the openDate field

        if (!openDate || !value) {
          // If either field is not set, skip the validation
          return true;
        }

        const oneMonthFromOpenDate = new Date(openDate);
        oneMonthFromOpenDate.setMonth(oneMonthFromOpenDate.getMonth() + 1);

        return value >= openDate && value <= oneMonthFromOpenDate;
      }
    )
    .required("closingDate is required"),
  skillIds: yup
    .array()
    .of(yup.number().required("skill is mandatory"))
    .min(1, "Please select at least one option")
    .required("skill is mandatory"),
  // description: yup.string().required("description is required"),
  // requirements: yup.string().required("requirements is required"),
  // descriotion: yup.mixed().required(),
  //   // .mixed()
  //   // .test("is-string", "Editor content is required", function (value) {
  //   //   const convertedContent = convertEditorStateToString(value);
  //   //   return typeof convertedContent === "string";
  //   // }),

  //   requirements: yup.mixed().required()
  // .mixed()
  // .test("is-string", "Editor content is required", function (value) {
  //   const convertedContent = convertEditorStateToString(value);
  //   return typeof convertedContent === "string";
  // }),
});

const pako = require("pako");
const filter = createFilterOptions();

const sidebarWidth = 21.6;

const CreateJobPost = ({
  jobPostingData,
  onGoingRequirements,
  templates,
  skills,
  recruiters,
  drafts,
  setJobPostingData,
}) => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: jobPostingData.title,
      experience: jobPostingData.experience,
      noOfVaccancies: jobPostingData.noOfVaccancies,
      skillIds: jobPostingData.skillIds,
      type: jobPostingData.type,
      location: jobPostingData.location,
      openDate: jobPostingData.openDate,
      closeDate: jobPostingData.closeDate,
      description: jobPostingData.description,
      requirement: jobPostingData.requirement,
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const tem = watch("title");

  const customEditorStyle = {
    "max-height": "500px !important",
    padding: "5px 40px",
    "font-family": "lato",
  };

  const [submit, setSubmit] = useState(false);
  const [manualExp, setManualExp] = useState("");
  const { setAlert } = useContext(AlertContext);

  const onSubmit = (data) => {
    let newJobPostingData = { ...jobPostingData };
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        newJobPostingData[key] = data[key];
      }

      setJobPostingData(newJobPostingData);
      setSubmit(true);
    }
    navigate("/Jobpost/assign-job-post");
  };

  const deCompressContent = (data) => {
    const deCompressContent = pako.inflate(JSON.parse(data), {
      to: "string",
    });
    return deCompressContent;
  };

  const [focus, setFocus] = useState(false);
  const [autocompleteKey, setAutocompleteKey] = useState(0);

  const toolbarOptions = {
    options: ["inline", "list", "textAlign"],

    inline: {
      options: ["bold", "italic", "underline"],
    },
    // blockType: {
    //   options: ['Normal', 'H1', 'H2', 'H3']
    // },
    list: {
      options: ["unordered", "ordered"],
    },
    textAlign: {
      options: ["left", "center", "right"],
    },
    // Other toolbar options...
  };

  const editorValueTemplate = {
    blocks: [
      {
        type: "paragraph",
        data: {
          inlineStyleRanges: [],
          entityRanges: [],
          // Add necessary properties for inline styles based on toolbar options
          inlineStyles: {
            bold: false,
            italic: false,
            underline: false,
          },
        },
        text: "",
        depth: 0,
      },
    ],
    entityMap: {},
    // Add necessary properties for block types based on toolbar options
    // blockTypes: {
    //   Normal: 'paragraph',
    //   H1: 'header-one',
    //   H2: 'header-two',
    //   H3: 'header-three'
    // },
    // Add necessary properties for list types based on toolbar options
    listTypes: {
      unordered: "unordered-list-item",
      ordered: "ordered-list-item",
    },
    // Add necessary properties for text alignment based on toolbar options
    textAlignment: {
      left: "left",
      center: "center",
      right: "right",
    },
  };

  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (typeof tem === "object" && tem !== null) {
      setFocus(true);
      setValue(
        "skillIds",
        tem.skills.map((skill) => skill.id)
      );
      // setValue("experience", tem.experience);
      const parsedContentState = convertFromRaw(
        JSON.parse(deCompressContent(tem.description))
      );
      const desc = EditorState.createWithContent(parsedContentState);
      setValue("description", desc);
      // console.log(  JSON.parse(deCompressContent(tem.description)));
      setValue("title", tem.title);
      // setValue("type", tem.type);
      const parsedContentState1 = convertFromRaw(
        JSON.parse(deCompressContent(tem.requirement))
      );
      const desc1 = EditorState.createWithContent(parsedContentState);
      setValue("requirement", desc1);
      setAutocompleteKey((prevKey) => prevKey + 1);
    }
  }, [tem, setValue]);

  return (
    <>
      {!draft && (
        <Grid container>
          <Grid
            sx={{ width: `calc(100% - ${sidebarWidth}%)` }}
            item
            container
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              item
              md={12}
              display={"flex"}
              justifyContent={"space-between"}
              sx={{
                pt: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
                pb: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
                pr: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
              }}
            >
              <Box display={"flex"} alignItems={"center"}>
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
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      md: "1.4rem",
                      lg: "1.7rem",
                      xl: "2rem",
                    },
                  }}
                  fontWeight={700}
                >
                  Create Job Post
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={() => navigate("/Jobpost/create-template")}
              >
                Create Template
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                bgcolor={"secondary.light"}
                sx={{
                  py: { xs: 1, lg: 1.5, xl: 2 },
                  px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
                  fontSize: {
                    xs: ".8rem",
                    md: "1rem",
                    lg: "1.5rem",
                    xl: "1.5rem",
                  },
                }}
              >
                Job Title
              </Typography>
            </Grid>
            <Grid
              item
              display={"flex"}
              justifyContent={"space-between"}
              spacing={4}
              // bgcolor={"black"}
              container
              p={3}
            >
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* Title</Typography>
                  <FormControl fullWidth error={!!errors.title}>
                    <Autocomplete
                      fullWidth
                      error={Boolean(errors.title)}
                      value={getValues("title")}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setValue("title", newValue);
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input
                          setValue("title", newValue.inputValue);
                        } else {
                          setValue("title", newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some(
                          (option) => inputValue === option.title
                        );
                        if (inputValue !== "" && !isExisting) {
                          filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                          });
                        }
                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id="free-solo-with-text-demo"
                      options={templates}
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.title;
                      }}
                      renderOption={(props, option) => (
                        <li {...props}>{option.title}</li>
                      )}
                      freeSolo
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          placeholder="choose an title / add an new one"
                          {...params}
                          error={Boolean(errors.title)}
                        />
                      )}
                    />
                    <FormHelperText>{errors.title?.message}</FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* Number Of Openings</Typography>
                  <TextField
                    fullWidth
                    name="noOfVaccancies"
                    type="number"
                    {...register("noOfVaccancies")}
                    error={Boolean(errors.noOfVaccancies)}
                    helperText={errors.noOfVaccancies?.message}
                    disabled={submit}
                  />
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* Location</Typography>
                  <TextField
                    fullWidth
                    name="location"
                    {...register("location")}
                    error={Boolean(errors.location)}
                    helperText={errors.location?.message}
                  />
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* Experience</Typography>
                  <FormControl fullWidth error={Boolean(errors.experience)}>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="outlined"
                      name="experience"
                      {...register("experience")}
                      value={manualExp !== "" ? manualExp : watch("experience")}
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setValue("experience", selectedValue);
                        setManualExp(selectedValue);
                      }}
                    >
                      <MenuItem value={"0-1"}>0-1 years</MenuItem>
                      <MenuItem value={"1-2"}>1-2 years</MenuItem>
                      <MenuItem value={"2-3"}>2-3 years</MenuItem>
                      <MenuItem value={"5+"}>5+ years</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.experience?.message}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* From Date</Typography>
                  <TextField
                    fullWidth
                    type={"date"}
                    name="OpenDate"
                    {...register("openDate")}
                    error={Boolean(errors.openDate)}
                    helperText={errors.openDate?.message}
                  />
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* End Date</Typography>
                  <TextField
                    fullWidth
                    name="closeDate"
                    {...register("closeDate")}
                    error={Boolean(errors.closeDate)}
                    type={"date"}
                    helperText={errors.closeDate?.message}
                  />
                </Box>
              </Grid>
              <Grid item md={5.5} xs={12} sm={6}>
                <Box>
                  <Typography pb={0.7}>* Required Skills</Typography>
                  <FormControl fullWidth error={!!errors.skillIds}>
                    <Autocomplete
                      key={autocompleteKey}
                      defaultValue={skills.filter((option) => {
                        const selectedIds = getValues("skillIds");
                        return selectedIds.includes(option.id);
                      })}
                      // error={Boolean(errors.skillIds)}
                      multiple
                      options={skills}
                      getOptionLabel={(option) => option.name}
                      {...register("skillIds")}
                      onChange={(e, value) => {
                        let skillOf = value.map((option) => option.id);
                        setValue("skillIds", skillOf);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(errors.description)}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={option.id}
                            label={option.name}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      filterSelectedOptions
                    />
                    <FormHelperText>{errors.skillIds?.message}</FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={12} sm={12}>
                <Box>
                  <Typography pb={0.7}>* Work Type</Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      name="radio-buttons-group"
                      // {...register("type")}
                      onChange={(e) => (
                        setValue("type", e.target.value),
                        console.log(typeof e.target.value)
                      )}
                    >
                      <FormControlLabel
                        sx={{ mr: 20 }}
                        value="FULLTIME"
                        control={
                          <CustomRadio
                            icon={<Brightness1Icon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                        label="Full Time"
                      />
                      <FormControlLabel
                        sx={{ mr: 20 }}
                        value="PARTTIME"
                        control={
                          <CustomRadio
                            icon={<Brightness1Icon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                        label="Part Time"
                      />
                      <FormControlLabel
                        sx={{ mr: 20 }}
                        value="REMOTE"
                        control={
                          <CustomRadio
                            icon={<Brightness1Icon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                        label="Remote"
                      />
                      <FormControlLabel
                        value="HYBRID"
                        control={
                          <CustomRadio
                            icon={<Brightness1Icon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        }
                        label="Hybrid"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={12} sm={12}>
              <Grid item container md={12}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    bgcolor={"secondary.light"}
                    sx={{
                      py: { xs: 1, lg: 1.5, xl: 2 },
                      px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
                      fontSize: {
                        xs: ".8rem",
                        md: "1rem",
                        lg: "1.5rem",
                        xl: "1.5rem",
                      },
                    }}
                  >
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography my={3} px={8}>
                    * About Job
                  </Typography>
                  <Controller
                    sx={{ borderColor: "2px solid black" }}
                    name="editorContent"
                    control={control}
                    {...register("description")}
                    // defaultValue={EditorState.createEmpty()}
                    render={({ field }) => (
                      <Box
                        component={Paper}
                        elevation={7}
                        fullWidth
                        sx={{
                          mx: 8,
                          mb: 5,
                          maxWidth: "1400px",
                          minHeight: "500px",
                          borderRadius: "20px",
                        }}
                      >
                        <Editor
                          editorStyle={customEditorStyle}
                          editorClassName="demo-editor"
                          toolbar={toolbarOptions}
                          toolbarClassName="custom-toolbar"
                          editorState={field.value}
                          initialContentState={editorValueTemplate}
                          onEditorStateChange={(value) => field.onChange(value)}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container md={12}>
                <Grid item md={12}>
                  <Typography
                    variant="h6"
                    bgcolor={"secondary.light"}
                    sx={{
                      py: { xs: 1, lg: 1.5, xl: 2 },
                      px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
                      fontSize: {
                        xs: ".8rem",
                        md: "1rem",
                        lg: "1.5rem",
                        xl: "1.5rem",
                      },
                    }}
                  >
                    Requirement
                  </Typography>
                </Grid>
                <Grid item md={12} px={8}>
                  <Typography my={3}>* About Job Needs</Typography>
                  <Controller
                    name="editorContent"
                    control={control}
                    rules={{ required: true }}
                    {...register("requirement")}
                    // defaultValue={EditorState.createEmpty()}
                    render={({ field }) => (
                      <Box
                        component={Paper}
                        elevation={7}
                        fullWidth
                        sx={{
                          mb: 10,
                          width: "100%",
                          minHeight: "500px",
                          borderRadius: "20px",
                        }}
                      >
                        <Editor
                          editorStyle={customEditorStyle}
                          editorState={field.value}
                          toolbarClassName="custom-toolbar"
                          editorClassName="demo-editor"
                          toolbar={toolbarOptions}
                          initialContentState={editorValueTemplate}
                          onEditorStateChange={(value) => field.onChange(value)}
                        />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item md={12}>
                  <Stack
                    direction={"row"}
                    sx={{ mr: 8 }}
                    justifyContent={"end"}
                    my={3}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => navigate(-1)}
                      sx={{
                        width: "240px",
                        height: "60px",
                        borderRadius: 2,
                        marginRight: 3,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ width: "240px", height: "60px", borderRadius: 2 }}
                    >
                      Next
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{ width: sidebarWidth + "%" }}
            item
            container
            bgcolor={"secondary.main"}
            minHeight={"100vh"}
          >
            <Grid item container position={"fixed"}>
              <Grid item container>
                <Grid item>
                  <Box display={"flex"} m={2} mt={2} alignItems={"center"}>
                    <ArchitectureIcon
                      color="primary"
                      sx={{ fontSize: "40px", mr: 1 }}
                    />
                    <Typography variant="h5" fontWeight={700}>
                      Job Posts in Draft
                    </Typography>
                  </Box>
                </Grid>
                <Grid item container>
                  {drafts
                    .filter((draft, index) => index < 2)
                    .map((draft) => (
                      <Grid item md={12} mx={2} mb={2}>
                        <Box
                          bgcolor={"white"}
                          sx={{
                            width: "370px",
                            height: "120px",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            borderRadius: 3,
                          }}
                          component={Paper}
                        >
                          <Box
                            display={"flex"}
                            direction={"column"}
                            justifyContent={"space-between"}
                          >
                            <Box>
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: 700 }}
                                variant="h6"
                              >
                                {draft.title}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "12px" }}
                                color={"GrayText"}
                                variant="body2"
                              >
                                {draft.location}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: 700 }}
                                variant="h6"
                              >
                                Vaccancies : {draft.noOfVaccancies}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            direction={"column"}
                            justifyContent={"end"}
                          >
                            <Button
                              variant="outlined"
                              onClick={() => {
                                setDraft(draft);
                              }}
                              sx={{
                                width: "110px",
                                height: "30px",
                                fontSize: ".7rem",
                                mr: 2,
                                color: "black",
                              }}
                            >
                              view
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                width: "110px",
                                height: "30px",
                                fontSize: ".7rem",
                              }}
                              disabled
                            >
                              Post
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  {/* <Grid item md={12} mx={2} mb={1}>
                  <Box
                    bgcolor={"white"}
                    sx={{
                      width: "370px",
                      height: "120px",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                    }}
                    component={Paper}
                  >
                    <Box
                      display={"flex"}
                      direction={"column"}
                      justifyContent={"space-between"}
                    >
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: 700 }}
                          variant="h6"
                        >
                          Intern Java Developer
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px" }}
                          color={"GrayText"}
                          variant="body2"
                        >
                          Networking-Chennnai,India
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: 700 }}
                          variant="h6"
                        >
                          Vaccancies : 39
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      direction={"column"}
                      justifyContent={"end"}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          width: "110px",
                          height: "30px",
                          fontSize: ".7rem",
                          mr: 2,
                          color: "black",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ width: "110px", height: "30px", fontSize: ".7rem" }}
                      >
                        Post
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={12} m={2}>
                  <Box
                    bgcolor={"white"}
                    sx={{
                      width: "370px",
                      height: "120px",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                    }}
                    component={Paper}
                  >
                    <Box
                      display={"flex"}
                      direction={"column"}
                      justifyContent={"space-between"}
                    >
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: 700 }}
                          variant="h6"
                        >
                          Intern Java Developer
                        </Typography>
                        <Typography
                          sx={{ fontSize: "12px" }}
                          color={"GrayText"}
                          variant="body2"
                        >
                          Networking-Chennnai,India
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "15px", fontWeight: 700 }}
                          variant="h6"
                        >
                          Vaccancies : 39
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      direction={"column"}
                      justifyContent={"end"}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          width: "110px",
                          height: "30px",
                          fontSize: ".7rem",
                          mr: 2,
                          color: "black",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ width: "110px", height: "30px", fontSize: ".7rem" }}
                      >
                        Post
                      </Button>
                    </Box>
                  </Box>
                </Grid> */}
                </Grid>
              </Grid>
              <OngoingRecuirements onGoingRequirements={onGoingRequirements} />
            </Grid>
          </Grid>
        </Grid>
      )}
      {draft && (
        <ViewPost
          onGoingRequirements={onGoingRequirements}
          jobPostingData={draft}
          recruiters={recruiters}
          draft={true}
          setDraft={setDraft}
        />
      )}
    </>
  );
};

export default CreateJobPost;
