/* eslint-disable no-script-url */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RegisterModal from './RegisterModal';
import EmployeeModal from './EmployeeModal';

const createJob = (type, date, time) => {
  return {
    type:type,
    date:date,
    time:time
  }
}

const jobs = [
  createJob('Housekeeping', '11/11/11', '2 Hours'),
  createJob('Valet', '12/11/12', '3 hours')
]

export default function EmployeeList(props) {
  return (
    <React.Fragment>
      <div>
        <RegisterModal/>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Job Records</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.staff.map(emp => (
            <TableRow key={emp.idNum}>
              <TableCell>{emp.idNum}</TableCell>
              <TableCell>{emp.password}</TableCell>
              <TableCell>{emp.privilege}</TableCell>
              <TableCell>
                  <EmployeeModal id={emp.id} jobs={jobs}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}