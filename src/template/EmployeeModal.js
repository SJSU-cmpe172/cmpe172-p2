import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

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
                <h3>Jobs Completed</h3>
                <hr/>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Room #</TableCell>
                            <TableCell>Time To Complete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.jobs.map(job => (
                            <TableRow key={props.id}>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>{job.date}</TableCell>
                                <TableCell>{job.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <br/>
                <h3>Jobs In-Progress</h3>
                <hr/>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Room #</TableCell>
                            <TableCell>Time Started</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.jobs.map(job => (
                            <TableRow key={props.id}>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>{job.date}</TableCell>
                                <TableCell>{job.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Modal>
    </div>
  );
}