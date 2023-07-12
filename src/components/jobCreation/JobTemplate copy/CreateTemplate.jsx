import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  createFilterOptions,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  styled,
  TextField,
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
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import {
  addJobTemplate,
  getJobTemplates,
} from "../../../services/jobPostService";
import OngoingRecuirements from "../../OnoingRecuiremments/OngoingRecuirements";

const Schema = yup.object({
  title: yup.string().required("Title is required"),
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
const sidebarWidth = 21.6;

const CreateTemplate = ({ onGoingRequirements, jobTemplate, skills, setTemplates }) => {
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
      title: jobTemplate.title,
      skillIds: jobTemplate.skillIds,
      description: jobTemplate.description,
      requirement: jobTemplate.requirement,
    },
    resolver: yupResolver(Schema),
  });
  const [open, setOpen] = useState(false);
  const [loader , setLoader] = useState(false);

  const navigate = useNavigate();

  const customEditorStyle = {
    "max-height": "500px !important",
    padding: "5px 40px",
    "font-family": "lato",
  };

  const [submit, setSubmit] = useState(false);

  const compressContent = (data) => {
    const compressedData = pako.deflate(data);
    return compressedData;
  };

  const onSubmit = (data) => {
    setLoader(true);
    let newJobPostingData = { ...jobTemplate };
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        newJobPostingData[key] = data[key];
      }
    }
      const compressedDescription = compressContent(
        JSON.stringify(convertToRaw(data.description.getCurrentContent()))
      );
      newJobPostingData.description = JSON.stringify(compressedDescription);

      const compressedRequirements = compressContent(
        JSON.stringify(convertToRaw(data.requirement.getCurrentContent()))
      );
      newJobPostingData.requirement = JSON.stringify(compressedRequirements);
      newJobPostingData.branchId = 1;
      newJobPostingData.createdBy = 1;
      newJobPostingData.modifiedBy = 1;
      addJobTemplate(newJobPostingData)
        .then((data) => {
          alert("Job template" + data);
          setLoader(false);
          return getJobTemplates(1);
        })
        .then((data) => {
          setOpen(false);
          setTemplates(data);
          
          navigate("/Jobpost");
        });
    };
  

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

  return (
    <Grid container>
      {loader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Grid
        sx={{ width: `calc(100% - ${sidebarWidth}%)` }}
        item
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item md={12}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1rem", md: "1.4rem", lg: "1.7rem", xl: "2rem" },
              p: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
            }}
            fontWeight={700}
          >
            Create Job Template
          </Typography>
          <Button variant="outlined" onClick={()=>navigate(-1)} >Back</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            bgcolor={"secondary.light"}
            sx={{
              py: { xs: 1, lg: 1.5, xl: 2 },
              px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
              fontSize: { xs: ".8rem", md: "1rem", lg: "1.5rem", xl: "1.5rem" },
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
          py={3}
          px={8}
        >
          <Grid item md={5.5} xs={12} sm={6}>
            <Box>
              <Typography pb={0.7}>* Title</Typography>
              <TextField
                fullWidth
                name="title"
                {...register("title")}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
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
        </Grid>
        <Grid item md={12} sm={12}>
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
                Description
              </Typography>
            </Grid>
            <Grid item md={12} px={8}>
              <Typography my={3}>* About Job</Typography>
              <Controller
                name="editorContent"
                control={control}
                rules={{ required: true }}
                {...register("description")}
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
                  onClick={() => navigate("/Jobpost")}
                  variant="outlined"
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
                  create
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
        <OngoingRecuirements onGoingRequirements={onGoingRequirements} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateTemplate;
