import { Box, Button, Checkbox, FormControlLabel, FormGroup, FormControl, Grid, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const AddFeedbackForm = () => {

    // const theme = createTheme({
    //     palette: {
    //       primary: {
    //         color: 'green', // Set your primary color here
    //       },
    //       secondary: {
    //         color: 'red', // Set your secondary color here
    //       },
    //       // You can define additional custom colors as well
    //       customColor: {
    //         colou: 'yellow', // Set your custom color here
    //       },
    //     },
    //   });

    const [status, setStatus] = useState('');
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    function createData(Category) {
        return { Category };
    }

    const rows = [
        createData('Communication Skill'),
        createData('Problem Solving skill'),
        createData('Analytical Skill'),
        createData('Technical Knowledge'),
        createData('Prior/ Final Project Explanation'),
        createData('Work Experience'),
        createData('Conceptual Knowledge'),
        createData('Presenting Style'),
    ]
    return (
        <div className='App'>
            <Box sx={{ padding: 1 }}>
                <Grid component={"form"} container display={"flex"} justifyContent={"space-around"}  >
                    <Grid item
                        display={"flex"}
                        justifyContent={"space-between"}
                        sx={{ width: '100%', backgroundColor: "blue", p: 1, mb: 2 }}>
                        <Typography variant='h5' color={"white"}>INTERVIEW EVALUATION FORM</Typography>
                    </Grid>
                    <Grid item container justifyContent={"space-around"} spacing={2}>
                        <Grid item xs={7.2} my={2} >
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Level Of Interview"
                                    variant='outlined'
                                    color='secondary' />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ width: "100%" }} >
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead sx={{ bgcolor: "blue" }} >
                                    <TableRow sx={{ height: "30px" }} >
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }} >Category</TableCell>
                                        <TableCell sx={{ color: "white", fontWeight: "bold" }} align='right'>Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.Category}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: "20px" }}>
                                            <TableCell component="th" scope="row">
                                                {row.Category}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Select sx={{ width: "150px" }} placeholder='rate here' >
                                                    <MenuItem value={1}>1</MenuItem>
                                                    <MenuItem value={2}>2</MenuItem>
                                                    <MenuItem value={3}>3</MenuItem>
                                                    <MenuItem value={4}>4</MenuItem>
                                                    <MenuItem value={5}>5</MenuItem>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TextField sx={{ marginTop: 2 }} fullWidth id="outlined-multiline-static" label="Description" multiline rows={8} />
                        <FormControl sx={{ marginTop: 2, width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="status"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Pass"}>Pass</MenuItem>
                                <MenuItem value={"Fail"}>Fail</MenuItem>
                                <MenuItem value={"OnHold"}>OnHold</MenuItem>
                            </Select>
                        </FormControl>
                        <Grid item display={"flex"} sx={{marginTop: 2}}>
                            <Grid item px={1}>
                                <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                                >
                                    Submit Feedback
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Box>
        </div>

    )
}


export default AddFeedbackForm;