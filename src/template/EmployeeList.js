import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RegisterModal from './RegisterModal';
import EmployeeModal from './EmployeeModal';

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
            <TableRow key={emp.username}>
              <TableCell>{emp.username}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.privilege}</TableCell>
              <TableCell>
                  <EmployeeModal id={emp.username} workingJobs={props.workingJobs} completedJobs={props.completedJobs}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}