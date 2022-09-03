import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import mockHabitData from '../../mock/mockHabits.json';
import { getDaysOfTheWeekString, getImportanceLevelString } from '../../utils/constants';

export default function Habit() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Aspiration</TableCell>
              <TableCell align="center">Importance</TableCell>
              <TableCell align="center" colSpan={2}>Schedule</TableCell>
              <TableCell align="center" colSpan={2}>Modify</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="center" colSpan={3} />
                <TableCell align="center">Days of the Week</TableCell>
                <TableCell align="center">Minutes per day</TableCell>
                <TableCell align="center" colSpan={2} />
            </TableRow>
          </TableHead>
          <TableBody>
            {mockHabitData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.habit_id}>
                    <TableCell align="left">{row.habit_name}</TableCell>
                    <TableCell align="left">{row.aspiration}</TableCell>
                    <TableCell align="left">{getImportanceLevelString(row.importance)}</TableCell>
                    <TableCell align="left">{getDaysOfTheWeekString(row.schedule.days_of_week).join(", ")}</TableCell>
                    <TableCell align="left">{row.schedule.minutes}</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={mockHabitData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}