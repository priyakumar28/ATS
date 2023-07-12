import React, { useContext } from "react";
import { getCandidate } from "../../services/CandidateService";
import ViewCandidate from "./ViewCandidate";
import AddCandidate from "./AddCandidate";
import EditCandidate from "./EditCandidate";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import RecruitingForm from "../interviewScheduling/RecruitingForm";
// import { statusCount } from "../../services/statusService";
import Basicdetails from "./Basicdetails";
// import CurrentUserContext from "../context/CurrentUserContext";
import ViewsingleApplicant from "./ViewsingleApplicant";
function OnboardCandidates() {
  const [candidate, setCandidate] = useState([]);
  const [basicDetail, setBasicDetail] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    email: "",
  });

  const [statusCounts, setStatusCounts] = useState({
    acceptedCount: "",
  });

  // const { user } = useContext(CurrentUserContext);
  const [trigger, setTrigger] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCandidate().then((resp) => {
      setCandidate(resp);
    }).then(()=>{setLoader(false)});
    setTrigger(0);
  }, [trigger]);
  const [id, setId] = useState(0);
  // useEffect(() => {
  //   statusCount(user.id).then((resp) => {
  //     if (resp === null) {
  //       statusCounts.acceptedCount = 0;
  //     } else {
  //       statusCounts.acceptedCount = resp.accepted;
  //     }
  //   });
  // }, []);

  // const {mail} = useContext(CurrentUserContext)

  const [updateCan, setUpdateCan] = useState({
    applicantId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    contactNo: "",
    email: "",
    dateOfBirth: "",
    source: "",
    currentCtc: "",
    expectedCtc: "",
    reasonForChange: "",
    currentCompany: "",
    yearOfExperience: "",
    holdingOffer: "",
    applicantStatus: "",
    addressId: "",
    doorNo: "",
    pinCode: "",
    street: "",
    state: "",
    city: "",
    country: "",
    skill: [""],
    resumePath: "",
    addedAt: "",
    applicantDetailsId: "",
    // jobRecruiterId: "",
    applicantResponseId: "",
    // jobPostingId: "",
    // interested: "",
  });
  return (
    <Routes>
      <Route
        path="/Basicdetails"
        element={
          <Basicdetails
            basicDetail={basicDetail}
            setBasicDetail={setBasicDetail}
            serCandidate={setCandidate}
          />
        }
      ></Route>
      <Route
        path="/"
        element={
          <ViewCandidate
            candidate={candidate}
            setCandidate={setCandidate}
            setUpdateCan={setUpdateCan}
            statusCounts={statusCounts}
            setTrigger={setTrigger}
            setId={setId}
            loader={loader}
            setLoader={setLoader}
            setBasicDetail={setBasicDetail}
          />
        }
      ></Route>
      <Route
        path="/Addcanditate"
        element={
          <AddCandidate setCandidate={setCandidate} basicDetail={basicDetail} />
        }
      ></Route>
      {/* <Route path="/Recruitingform/:id" element={<RecruitingForm />} /> */}
      <Route
        path="/EditCanditate"
        element={
          <EditCandidate
            canditateData={updateCan}
            setCandidate={setCandidate}
          />
        }
      ></Route>
      <Route
        path="/viewsinglecandidate"
        element={<ViewsingleApplicant id={id} />}
      ></Route>
    </Routes>
    // <ViewCandidate/>
  );
}

export default OnboardCandidates;
