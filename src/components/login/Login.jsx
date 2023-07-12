import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    TextField,
    Typography,
    Link,
} from "@mui/material";
import bgimg from "../../images/bgimg.svg";
import { useForm } from "react-hook-form";
import { Routes, Route, useNavigate, } from "react-router-dom";
import Appbar from "../dashboard/Appbar"

function Login({onLogin}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(" ")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginData = [
        {
            id: 13,
            userName: "recruiter",
            password: "recruiter@123",
            role: "recruiter",
            branchid: 1,
            tenentid: 13,
        },
        {
            id: 1,
            userName: "hr",
            password: "hr@123",
            role: "hr_manager",
            branchid: 1,
            tenentid: 1,
        },
    ];
  
    const onSubmit = (data) => {
        console.log(data, "dataaaaaaa");
        let userdetails = loginData.find(
            (user) => user.userName === username && user.password === password
        );
        console.log(userdetails, "userdeeeeee");
        setUser(userdetails);
        if (userdetails) {
            // alert("success");
            onLogin();
        }
        else{
         
        }
       
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#1a237e",
            }}
        >
            <Card sx={{ p: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Grid
                            item
                            display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
                        >
                            <CardMedia
                                component={"img"}
                                image={bgimg}
                                sx={{ width: { lg: "70vh", md: "46vh" } }}
                            />
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                display={"flex"}
                                flexDirection={"column"}
                                alignContent={"flex-start"}
                            >
                                <Grid item>
                                    <Typography
                                        color={"#1a237e"}
                                        fontWeight={"bold"}
                                        fontSize={{
                                            lg: "40px",
                                            md: "35px",
                                            sm: "30px",
                                            xs: "25px",
                                        }}
                                    >
                                        User Login
                                    </Typography>
                                </Grid>
                                <Grid item mt={3}>
                                    <Typography color={"#1a237e"} pb={1}>
                                        Username
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        placeholder="Enter Your Username"
                                        size="normal"
                                        fullWidth
                                        {...register("userName", { required: true })}
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item mt={3}>
                                    <Typography color={"#1a237e"} pb={1}>
                                        Password
                                    </Typography>
                                    <TextField
                                        variant="filled"
                                        placeholder="Enter Your Password"
                                        size="medium"
                                        fullWidth
                                        {...register("password", { required: true })}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item mt={1}>
                                    <Link component="button" underline="none" color="#1a237e">
                                        Forgot Password?
                                    </Link>
                                </Grid>
                                <Grid item mt={5}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "#1a237e",
                                            width: "350px",
                                            height: "50px",
                                            borderRadius: "25px",
                                        }}
                                        type="submit"
                                        // onClick={handleLoginSubmit}
                                        onClick={(onSubmit) => {
                                            handleSubmit(onSubmit);
                                           
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                <Grid item mt={1}>
                                    <Link component="button" underline="none" color="#1a237e">
                                        New User? Create An Account
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
}

export default Login;
