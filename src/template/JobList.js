import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const jobs = [{id:1, type:'Housekeeping', date:'11/19/19', time:'2:00'}, {id:2, type:'Valet', date:'11/19/19', time:'2:00'},
  {id:3, type:'Kitchen', date:'11/19/19', time:'2:00'}]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                background="blue"
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Available" {...a11yProps(0)} />
                <Tab label="In Progress" {...a11yProps(1)} />
                <Tab label="Completed" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time Created</TableCell>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Job Type</TableCell>
                        <TableCell>Room Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map(job => (
                        <TableRow key={job.id}>
                            <TableCell>{job.date}</TableCell>
                            <TableCell>{job.id}</TableCell>
                            <TableCell>{job.type}</TableCell>
                            <TableCell>{job.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time Started</TableCell>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Job Type</TableCell>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Employee ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map(job => (
                        <TableRow key={job.id}>
                            <TableCell>{job.date}</TableCell>
                            <TableCell>{job.type}</TableCell>
                            <TableCell>{job.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time Completed</TableCell>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Job Type</TableCell>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Employee ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map(job => (
                        <TableRow key={job.id}>
                            <TableCell>{job.date}</TableCell>
                            <TableCell>{job.type}</TableCell>
                            <TableCell>{job.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TabPanel>
    </div>
  );
}