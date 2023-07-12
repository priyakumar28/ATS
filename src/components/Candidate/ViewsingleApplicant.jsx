import styled from "@emotion/styled";
import {
    Box,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSingleCandidate } from "../../services/CandidateService";
import Loader from "../Loader/Loader";
const ViewsingleApplicant = ({ id }) => {

  const [singlecandidate, setSinglecandidate] = useState(null);

  useEffect(() => {
    getSingleCandidate(id)
      .then((response) => {
        setSinglecandidate(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
    {singlecandidate==null   ? <Loader/>  :  <>  
      <Typography>View Single Applicant</Typography>
      <Grid container spacing={3}  marginTop={5}>
        <Grid item textAlign={'end'} lg={6}>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            First Name
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Middle Name 
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Last Name
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Applicant Status
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Contact No
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Email Id
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Gender
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Date Of Birth
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Source
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Current CTC
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Expected CTC
          </Typography>
          {/* <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Current Company
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Reason For Change
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Holding Offer
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Marital Status
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Current Address
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Resume path
          </Typography>
          <Typography variant="h6" fontSize={20} fontWeight="bold" >
            Year Of Experience
          </Typography>
         */}
        </Grid>
        <Grid item textAlign={'start'} lg={6}>
            <Box key={singlecandidate.applicantDetailsId}>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.firstName}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.middleName}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.lastName}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.applicantStatus}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.contactNo}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.applicantResponseId.applicantId.email}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.gender}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.dateOfBirth}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.source}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.currentCtc}</Typography>
              <Typography variant="h6" fontSize={20} fontWeight="normal" >: {singlecandidate.expectedCtc}</Typography>
              {/* <Typography fontSize={20} alignSelf="center">: {singlecandidate.currentCompany}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.reasonForChange}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.holdingOffer}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.maritalStatus}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.applicantResponseId.applicantId.currentAddress}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.applicantResponseId.applicantId.resumePath}</Typography>
              <Typography fontSize={20} alignSelf="center">: {singlecandidate.yearOfExperience}</Typography> */}
            </Box>
            </Grid>
      </Grid>

    </>
  }
  </>
  );
};

export default ViewsingleApplicant;
