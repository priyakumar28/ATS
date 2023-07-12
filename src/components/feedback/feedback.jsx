import React from 'react';
import {
    Box,
    FormControl,
    Grid,
    Tab,
    Tabs,
    TextField,
    Typography,
    Stack,
    Chip,
    ButtonGroup,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';
import ViewFeedback from './viewFeedback';
import AddFeedbackForm from './addFeedback';


const Feedback = () => {
    function TabPanel(props) {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{ p: 5 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    return (
        <Box sx={{ paddingTop: 9, paddingLeft: 35, paddingRight: '50px', width: 700, height: 300, borderColor: 'black' }}>
            <Grid component={'form'}>
                <Grid
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ backgroundColor: "blue", p: 2, mb: 2 }}>
                    <Typography variant='h5' color={"white"}>INTERVIEW EVALUATION FORM</Typography>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={4} >
                        <FormControl>
                            <TextField
                                fullWidth
                                label='Applicant Name'
                                disabled
                                variant='outlined'
                                color='secondary' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label='Postion'
                                disabled
                                variant='outlined'
                                color='secondary' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl>
                            <TextField
                                fullWidth
                                label='Recruiter Name'
                                disabled
                                variant='outlined'
                                color='secondary' />
                        </FormControl>
                    </Grid>
                </Grid>
                <ButtonGroup>
                    <Button>5 = Excellent</Button>
                    <Button>4 = Good</Button>
                    <Button>3 = Average</Button>
                    <Button>2 = Need To Improve</Button>
                    <Button>1 = Poor</Button>
                </ButtonGroup>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label='Round1' />
                            <Tab label='Round2' />
                            <Tab label='Round3' />
                            <Tab label='Round4' />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ViewFeedback />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ViewFeedback />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ViewFeedback />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <AddFeedbackForm />
                    </TabPanel>
                </Box>
            </Grid >
        </Box >
    )
}

export default Feedback