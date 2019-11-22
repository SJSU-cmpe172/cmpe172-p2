import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { getTime, getDate, getTimeToComplete } from './Time.js';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EmployeeModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleOpen}>
            View
        </Button>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div style={modalStyle} className={classes.paper}>
              <h3>Jobs In-Progress</h3>
              <hr/>
              <Table size="small">
                  <TableHead>
                      <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Time Started</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Room #</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.workingJobs.map(job => {
                      if(props.id===job.staff)
                        return (
                          <TableRow key={props.id}>
                              <TableCell>{getDate(job.dtCreated)}</TableCell>
                              <TableCell>{getTime(job.dtCreated)}</TableCell>
                              <TableCell>{job.type}</TableCell>
                              <TableCell>{job.room}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
              </Table>
              <br/>
              <h3>Jobs Completed</h3>
              <hr/>
              <Table size="small">
                  <TableHead>
                      <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Room #</TableCell>
                          <TableCell>Time To Complete</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {props.completedJobs.map(job => {
                        if(props.id===job.staff)
                          return (
                            <TableRow key={props.id}>
                                <TableCell>{getDate(job.dtCreated)}</TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>{job.room}</TableCell>
                                <TableCell>{getTimeToComplete(job.dtCreated, job.dtCompleted)}</TableCell>
                            </TableRow>
                          );
                      })}
                  </TableBody>
              </Table> 
            </div>
        </Modal>
    </div>
  );
}