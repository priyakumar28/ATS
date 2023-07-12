import { Box, Paper, Button, Select, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, TextField, Grid, FormControl, InputLabel, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React, { useEffect } from 'react';
import ViewDesc from './feedback';
import { useState } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
    function createData(Category, Rating) {
        return { Category, Rating };
    }

    const rows = [
        createData('Communication Skills', 5),
        createData('Problem Solving Skills', 5),
        createData('Analytical Skills', 4),
        createData('Technical Knowledge', 4),
        createData('Prior/ Final Project Explanation', 4),
        createData('Work Experience', 3),
        createData('Conceptual Knowledge', 4),
        createData('Presenting Style', 5),
    ]

    function viewDesc(feedback) {
        return (
            <div>
                <p>{feedback}</p>
            </div>
        );
    }

    const [feedback, setFeedback] = useState([]);
    const [status, setStatus] = useState('Pass');
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
        axios.get('').then(response => {
            const mappedData = response.feedback.map(item => ({
                Category: item.Category,
                Rating: item.Rating
            }));
        })
    });

    const ffDesc = {
        feedback: ("The Candidate is Selected")
    };

    const interviewerName = {
        feedback: ("Ram")
    };

    const interviewerType = {
        feedback: ("F2F")
    };

    const interviewRound = {
        feedback: (3)
    };

    return (
        <Box sx={{ width: "80vh", height: "80vh", borderColor: 'black', backgroundColor: "white", overflowY: "auto", position: "relative" }}>
            <Grid component={'form'}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} size="small" aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell align='right'>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* mapping */}
                            { feedback.map(item => (
                                <TableRow
                                key={item.Category}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component='th' scope='row'>
                                    {item.Category}
                                </TableCell>
                                <TableCell align='right'>
                                    {item.Rating}
                                </TableCell>
                            </TableRow>
                            ))

                            }
                            {/* static data */}
                            {/* {rows.map((row) => (
                                <TableRow
                                    key={row.Category}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {row.Category}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.Rating}
                                    </TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <TextField
                fullWidth
                label={ffDesc.feedback}
                disabled
                variant="outlined"
                color="secondary"
                multiline rows={8}
                sx={{ marginTop: 2 }}
            />
            <Grid container spacing={2} sx={{ marginTop: 2, width: "100%" }}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label={interviewerName.feedback}
                            disabled
                            variant="outlined"
                            color="secondary" />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label={interviewerType.feedback}
                            disabled
                            variant="outlined"
                            color="secondary" />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            label={interviewRound.feedback}
                            disabled
                            variant="outlined"
                            color="secondary" />
                    </FormControl>
                </Grid>
                    <FormControl sx={{ marginTop: 2, marginLeft: 2, width: "20%" }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="status"
                            onChange={handleChange}
                            disabled
                            
                        >
                            <MenuItem value={"Pass"}>Pass</MenuItem>
                            <MenuItem value={"Fail"}>Fail</MenuItem>
                            <MenuItem value={"OnHold"}>OnHold</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
        </Box >
    )
}

export default ViewFeedback