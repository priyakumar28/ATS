import Login from "./components/login/Login";
import React, { useState } from "react";
import Appbar from "./components/dashboard/Appbar";
import ViewInterviewsByInterviewer from "./components/InterviewsScheduled/viewInterviewsScheduled";
import AlertContext from "./components/contextProvider/AlertContext";
import RecruiterDB from "./components/Recruiter/RecruiterDB";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const [alert, setAlert] = useState({
    message: "",
    open: false,
  });

  return (
    <AlertContext.Provider value={{alert,setAlert}}>
      {isLoggedIn ? <Appbar /> : <Login onLogin={handleLogin} />}
      {/* <Datanotfound /> */}
    </AlertContext.Provider>
    // <RecruiterDB/>
  );
}

export default App;
