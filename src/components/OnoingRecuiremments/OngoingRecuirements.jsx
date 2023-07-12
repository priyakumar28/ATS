import {
    Badge,
    Button,
    Card,
    Grid,
    Typography,
    Chip,
    AvatarGroup,
    Avatar,
    Link,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Menu,
    Select,
    MenuItem,
    FormControl,
    Box,
    Paper,
    ThemeProvider,
    createTheme,
  } from "@mui/material";

  import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CircleIcon from "@mui/icons-material/Circle";
import person1 from "../../images/person1.jpg";
import person2 from "../../images/person2.jpg";
import person3 from "../../images/person3.jpg";


const OngoingRecuirements = ({onGoingRequirements}) => {
    return ( 
        <Grid item container>
                <Grid item>
                  <Box display={"flex"} my={2} mx={2} alignItems={"center"}>
                    <WorkHistoryIcon
                      color="primary"
                      sx={{ fontSize: "40px", mr: 1 }}
                    />
                    <Typography sx={{ fontWeight: 700 }} variant="h5">
                      Ongoing Recruitments
                    </Typography>
                  </Box>
                </Grid>
                <Grid item rowSpacing={1} container>
                  {onGoingRequirements.map((recuirement,index) => (
                    <Grid item md={12} m={2}>
                      <Box
                        bgcolor={ index % 2 === 0 ?  "secondary.dark" : "primary.main"  }
                        sx={{
                          width: "370px",
                          height: "90px",
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          borderRadius: 3,
                          position: "relative",
                        }}
                        component={Paper}
                        elevation={5}
                      >
                        <Box className={"bubble1"}></Box>
                        <Box className={"bubble2"}></Box>
                        <Box
                          component={Paper}
                          elevation={5}
                          sx={{
                            position: "absolute",
                            top: "-17px",
                            left: "25px",
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            bgcolor: "white",
                            width: "100px",
                            height: "25px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <CircleIcon
                            sx={{ fontSize: "12px", color: "green", mr: 1 }}
                          />
                          <Typography
                            sx={{ fontSize: ".8rem" }}
                            variant="body2"
                          >
                            In-progress
                          </Typography>
                        </Box>
                        <Box
                          display={"flex"}
                          direction={"column"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: "white",
                            }}
                            variant="h6"
                          >
                            {recuirement[1]}
                          </Typography>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontWeight: 700,
                                color: "white",
                              }}
                              variant="h6"
                            >
                              Vaccancies : {recuirement[4]}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          display={"flex"}
                          direction={"column"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Typography color={"white"} fontSize={".8rem"}>
                            End Date : {recuirement[2]}{" "}
                          </Typography>
                          <Box sx={{ position: "relative", top: -10 }}>
                            <img
                              src={person1}
                              style={{
                                width: "20px",
                                height: "20px",
                                zIndex: 1,
                                top: 0,
                                borderRadius: "50%",
                                objectFit: "cover",
                                position: "absolute",
                                right: 80,
                              }}
                            />
                            <img
                              src={person3}
                              style={{
                                width: "20px",
                                height: "20px",
                                zIndex: 2,
                                borderRadius: "50%",
                                objectFit: "cover",
                                position: "absolute",
                                right: 65,
                              }}
                            />
                            <img
                              src={person2}
                              style={{
                                width: "20px",
                                height: "20px",
                                zIndex: 3,
                                borderRadius: "50%",
                                objectFit: "cover",
                                position: "absolute",
                                right: 45,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
     );
}
 
export default OngoingRecuirements;